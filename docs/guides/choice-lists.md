---
sidebar_position: 4
---

# Choice lists

How to **use**, **add**, **update**, and **remove** dropdown options in ODE custom app forms. There are two mechanisms:

| Mechanism | When to use | Where you edit |
|-----------|-------------|----------------|
| **Shared choice lists** | Fixed options (yes/no, roles, regions) reused across many forms | `forms/shared-choice-defs.schema.json` in your bundle + each form `schema.json` |
| **Dynamic choice lists** | Options loaded from **observations already on the device** (sites, participants, visits, etc.) | Form `schema.json` only (`x-dynamicEnum`) |

**Related guides:** [Observation queries and local indexes](./observation-queries) (performance indexes for dynamic filters), [Form design](./form-design), [Custom extensions](./custom-extensions).

---

## Shared choice lists

### What they are

Reusable **static** dropdown definitions live in one JSON Schema file at the root of your bundle’s `forms/` folder:

**`forms/shared-choice-defs.schema.json`**

Each list is a `$defs` entry using `oneOf` with `const` (stored value) and `title` (label in the UI). Formulus and Formplayer **resolve** external `$ref` pointers into that file when a form loads.

### Catalog file shape

```json
{
  "$id": "forms/shared-choice-defs.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$defs": {
    "yes_no": {
      "oneOf": [
        { "const": "yes", "title": "Yes" },
        { "const": "no", "title": "No" }
      ]
    },
    "region_list": {
      "oneOf": [
        { "const": "north", "title": "North region" },
        { "const": "south", "title": "South region" },
        { "const": "other", "title": "Other" }
      ]
    }
  }
}
```

Name each list with **snake_case** keys (`yes_no`, `region_list`, `enumerator_list`, …). Open your bundle’s catalog file to see every list your project defines.

### Reference a list in a form

In the form’s `schema.json`, point the field at the shared definition:

```json
"assigned_region": {
  "type": "string",
  "title": "Assigned region",
  "$ref": "forms/shared-choice-defs.schema.json#/$defs/region_list"
}
```

**URI (must match exactly):**

```
forms/shared-choice-defs.schema.json#/$defs/<list_name>
```

Keep `type`, `title`, and `description` on the property as needed. The `$ref` supplies the allowed values.

**“Other” options:** when the list includes `other`, add a companion free-text field:

```json
"assigned_region_other": {
  "type": "string",
  "title": "Other region (specify)",
  "maxLength": 200
}
```

### Add a new shared list

1. Edit **`forms/shared-choice-defs.schema.json`**.
2. Add a new `$defs` key, for example:

```json
"priority_level": {
  "oneOf": [
    { "const": "low", "title": "Low" },
    { "const": "medium", "title": "Medium" },
    { "const": "high", "title": "High" }
  ]
}
```

3. Reference it from any form with `$ref` as above.
4. Validate the bundle (if your project provides a script):

```powershell
cd app
npm run validate:forms
```

Validation resolves shared `$ref` and fails if a form references a missing `$defs` name.

### Update options

| Change | Safe? | Notes |
|--------|-------|-------|
| Edit `title` only | Yes | Display label changes; stored `const` unchanged |
| Add a `oneOf` entry | Yes | New option appears in all forms using the list |
| Change `const` | Risky | Existing observations keep the old string; plan migration |

### Remove options or lists

1. **One option:** remove its `oneOf` entry; search your `forms/` tree for the old `const`.
2. **Whole list:** delete the `$defs` key and remove every `$ref` to `#/$defs/<list_name>`.
3. Re-run form validation.

### Deploy shared list changes

`shared-choice-defs.schema.json` is packaged with `forms/` in the app bundle. Upload a new bundle version and sync devices so Formulus loads the updated definitions.

---

## Dynamic choice lists

### What they are

Dynamic lists populate dropdowns from the **local observation database** at runtime (offline). Configure a field with **`x-dynamicEnum`** in `schema.json`. Formplayer uses the **`DynamicEnumControl`** renderer and calls **`getDynamicChoiceList`** from your custom app extensions (typically implemented in `queryHelpers.js` in the app source).

Use dynamic lists when choices depend on data already collected. Use **shared** lists when options are fixed by the study protocol.

:::tip Performance
Filters run through **`getObservationsByQuery`** with a structured filter AST. Declare frequently filtered fields in **`app.config.json`** → `observationIndexes` so queries use the local index table instead of scanning JSON. See [Observation queries](./observation-queries).
:::

### Prerequisites

- Field type **`string`** (saved value is usually `observationId` or a `data.*` value).
- Custom app exposes **`getDynamicChoiceList`** on `window.formulus.functions`.
- Observations exist on the device for the `query` form type.

### Configuration

```json
"selected_participant": {
  "type": "string",
  "title": "Select participant",
  "x-dynamicEnum": {
    "function": "getDynamicChoiceList",
    "query": "participant",
    "params": {
      "status": "active",
      "site_name": "{{data.location.site_name}}"
    },
    "valueField": "observationId",
    "labelField": "data.display_name",
    "distinct": false
  }
}
```

| Property | Required | Description |
|----------|----------|-------------|
| `function` | No (default `getDynamicChoiceList`) | Extension function name |
| `query` | **Yes** | Form type to query — the folder name under `forms/` (e.g. `site`, `participant`, `visit`) |
| `params` | No | Equality filters on observation `data.*` fields; optional `whereClause` |
| `valueField` | No (default `observationId`) | Saved value path (`observationId` or `data.field`) |
| `labelField` | No (default varies by app) | Display label path |
| `distinct` | No (default `false`) | `true` = unique values of `valueField` only |

### Filter `params`

Keys in `params` are **field names on observation JSON** (without a `data.` prefix in the schema; the runtime adds `data.` when building the query).

**Cascading / dependent dropdowns** use template values from the current form:

```json
"site_name": "{{data.location.site_name}}"
```

- Syntax: `{{data.<path>}}` with dots for nested objects.
- If the template resolves empty, that filter is **skipped** (broader result set).
- The control reloads when templated parent fields change.

**Indexed params (recommended for performance):** declare matching keys in `app.config.json` → `observationIndexes`. Example pattern (your keys will match your form design):

| Example param key | Example `query` form | Typical meaning |
|-------------------|----------------------|-----------------|
| `parent_id` | any | Link to a parent record |
| `record_id` | any | Stable record identifier |
| `site_name` | `site` | Site or location name |
| `region` | `participant` | Region on a participant record |
| `status` | `participant` | Status flag (`active`, `inactive`, …) |

Any param key can work; undeclared keys fall back to slower `json_extract` queries until you add an index entry.

Some custom apps also map **aliases** (e.g. filtering `participant` records by a field name that differs from the param key). Check your app’s query registry or extension code if filters behave unexpectedly.

### `whereClause` in `params`

For extra conditions, add a SQL-style fragment:

```json
"params": {
  "status": "active",
  "whereClause": "data.age_years >= 18"
}
```

- Simple equalities like `data.field = 'value'` are parsed into the filter AST.
- **`age_from_dob(...)`** is evaluated in **JavaScript after** the query (not in SQL).
- Numeric comparisons (`>=`, `<=`) on arbitrary fields may not use the index table — prefer indexed equality `params` when possible.

### `distinct: true`

Use when you only need unique values of one field (e.g. every site name already registered):

```json
"x-dynamicEnum": {
  "query": "site",
  "params": {},
  "valueField": "data.site_name",
  "labelField": "data.site_name",
  "distinct": true
}
```

### Examples

The examples below use **fictional** form types and fields. Replace them with names from your own bundle.

**Example A — Distinct site names**

Form type `site` stores `data.site_name`. Show each name once in the dropdown.

```json
"site_name": {
  "type": "string",
  "title": "Site",
  "x-dynamicEnum": {
    "query": "site",
    "params": {},
    "valueField": "data.site_name",
    "labelField": "data.site_name",
    "distinct": true
  }
}
```

**Example B — Districts filtered by selected site (cascading)**

After the user picks a site, list districts only for that site.

```json
"district": {
  "type": "string",
  "title": "District",
  "x-dynamicEnum": {
    "query": "site",
    "params": {
      "site_name": "{{data.site_name}}"
    },
    "valueField": "data.district",
    "labelField": "data.district",
    "distinct": true
  }
}
```

**Example C — Pick any participant (no filter)**

```json
"participant_id": {
  "type": "string",
  "title": "Participant",
  "x-dynamicEnum": {
    "query": "participant",
    "params": {},
    "valueField": "observationId",
    "labelField": "data.display_name",
    "distinct": false
  }
}
```

**Example D — Active participants at one site**

```json
"participant_at_site": {
  "type": "string",
  "title": "Participant at this site",
  "x-dynamicEnum": {
    "query": "participant",
    "params": {
      "status": "active",
      "site_name": "{{data.site_name}}"
    },
    "valueField": "observationId",
    "labelField": "data.display_name",
    "distinct": false
  }
}
```

**Example E — Adults only (numeric filter in whereClause)**

```json
"adult_participant": {
  "type": "string",
  "title": "Adult participant (18+)",
  "x-dynamicEnum": {
    "query": "participant",
    "params": {
      "whereClause": "data.age_years >= 18"
    },
    "valueField": "observationId",
    "labelField": "data.display_name",
    "distinct": false
  }
}
```

### UI schema (`ui.json`)

No special control type. Use a normal **Control** with the correct `scope`; the renderer is chosen automatically when `x-dynamicEnum` is present:

```json
{
  "type": "Control",
  "scope": "#/properties/selected_participant"
}
```

### Add, update, or remove a dynamic field

1. Add `x-dynamicEnum` on the property in `schema.json`.
2. Add a `Control` in `ui.json`.
3. Confirm `query` matches a form type folder under `forms/`.
4. Validate JSON; test on device with synced observations.
5. For a new heavily used filter key, add **`observationIndexes`** in `app.config.json` and re-sync the bundle.

### Troubleshooting

| Problem | What to check |
|---------|----------------|
| Empty dropdown | Observations for `query`? Filters too strict? Template path correct? |
| Dropdown does not update | Parent field in `{{data....}}` must be set first |
| Slow loading | Add `observationIndexes` for hot param keys; avoid unfiltered queries on large tables |
| `Function not found` | Rebuild custom app with extensions |
| Wrong labels | `labelField` path matches your observation JSON (`data.display_name`, etc.) |

---

## Quick decision guide

| Need | Use |
|------|-----|
| Fixed options defined by the study | Shared list + `$ref` |
| Options from data on the tablet | `x-dynamicEnum` + `getDynamicChoiceList` |

---

## Checklist before release

- [ ] Form validation passes (`validate:forms` or your project’s equivalent)
- [ ] Shared: new `const` values coordinated with exports / analysis
- [ ] Dynamic: `query` form type exists; `params` keys match real observation fields
- [ ] Dynamic: hot filters covered by `observationIndexes` where needed
- [ ] Tested on device with representative observations (dynamic fields)

---

## Implementation (developers)

| Layer | Role |
|-------|------|
| Shared `$ref` resolution | Formulus `sharedChoiceSchema.ts`; bundle validation helpers |
| Dynamic renderer | Formplayer `DynamicEnumControl` |
| Query + filters | Custom app `getDynamicChoiceList` → `buildDynamicChoiceFilter` → `getObservationsByQuery` |
| Indexes | `app.config.json` → `observationIndexes` |

Legacy URL: [Dynamic choice lists](./dynamic-choice-lists) redirects here.
