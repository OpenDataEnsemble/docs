---
sidebar_position: 4
---

# Choice lists

How to **use**, **add**, **update**, and **remove** dropdown options in ODE custom app forms. There are two mechanisms:

| Mechanism | When to use | Where you edit |
|-----------|-------------|----------------|
| **Shared choice lists** | Fixed study-wide options (yes/no, staff names, village codes) reused across forms | `forms/shared-choice-defs.schema.json` in your bundle + each form `schema.json` |
| **Dynamic choice lists** | Options loaded from **observations already on the device** (person picker, households in a village, etc.) | Form `schema.json` only (`x-dynamicEnum`) |

:::info Reference implementation
[AnthroCollect](https://github.com/OpenDataEnsemble/AnthroCollect) ships both patterns. In that repo, the same content lives in `forms/CHOICE_LISTS_GUIDE.md` next to the form schemas.
:::

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
    "yesno": {
      "oneOf": [
        { "const": "yes", "title": "Yes" },
        { "const": "no", "title": "No" }
      ]
    }
  }
}
```

Your app defines its own `$defs` keys. AnthroCollect currently includes lists such as `yesno`, `researcher_list`, `assistant_list`, `villages`, and `kopria_village` — open that file in your bundle for the full option list.

### Reference a list in a form

In the form’s `schema.json`, point the field at the shared definition:

```json
"p_hh_res_validation": {
  "type": "string",
  "title": "Household residential validation village",
  "$ref": "forms/shared-choice-defs.schema.json#/$defs/villages"
}
```

**URI (must match exactly):**

```
forms/shared-choice-defs.schema.json#/$defs/<list_name>
```

Keep `type`, `title`, and `description` on the property as needed. The `$ref` supplies the allowed values.

**“Other” options:** when the list includes `other`, add a companion free-text field:

```json
"p_hh_res_validation_other": {
  "type": "string",
  "title": "Other village (specify)",
  "maxLength": 200
}
```

### Add a new shared list

1. Edit **`forms/shared-choice-defs.schema.json`**.
2. Add a new `$defs` key (use **snake_case**), for example:

```json
"my_new_list": {
  "oneOf": [
    { "const": "option_a", "title": "Option A" },
    { "const": "option_b", "title": "Option B" }
  ]
}
```

3. Reference it from any form with `$ref` as above.
4. Validate the bundle (AnthroCollect example):

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

1. **One option:** remove its `oneOf` entry; search the repo for the old `const` in `forms/`.
2. **Whole list:** delete the `$defs` key and remove every `$ref` to `#/$defs/<list_name>`.
3. Re-run form validation.

### Deploy shared list changes

`shared-choice-defs.schema.json` is packaged with `forms/` in the app bundle. Upload a new bundle version and sync devices so Formulus loads the updated definitions.

---

## Dynamic choice lists

### What they are

Dynamic lists populate dropdowns from the **local observation database** at runtime (offline). Configure a field with **`x-dynamicEnum`** in `schema.json`. Formplayer uses the **`DynamicEnumControl`** renderer and calls **`getDynamicChoiceList`** (provided by your custom app extensions, e.g. AnthroCollect’s `queryHelpers.js`).

Use dynamic lists when choices depend on data already collected. Use **shared** lists when options are fixed by the protocol.

:::tip Performance
Filters run through **`getObservationsByQuery`** with a structured filter AST. Declare hot filter fields in **`app.config.json`** → `observationIndexes` so queries use the local index table instead of scanning JSON. See [Observation queries](./observation-queries).
:::

### Prerequisites

- Field type **`string`** (saved value is usually `observationId` or a `data.*` value).
- Custom app includes **`getDynamicChoiceList`** on `window.formulus.functions` (via extensions in the app WebView bundle).
- Observations exist on the device for the `query` form type.

### Configuration

```json
"my_field": {
  "type": "string",
  "title": "Select person",
  "x-dynamicEnum": {
    "function": "getDynamicChoiceList",
    "query": "hh_person",
    "params": {
      "sex": "male",
      "p_hh_res_validation": "{{data.section_1.test_village}}"
    },
    "valueField": "observationId",
    "labelField": "data.names",
    "distinct": false
  }
}
```

| Property | Required | Description |
|----------|----------|-------------|
| `function` | No (default `getDynamicChoiceList`) | Extension function name |
| `query` | **Yes** | Form type to query (folder name under `forms/`, e.g. `household`, `hh_person`) |
| `params` | No | Equality filters on observation `data.*` fields; optional `whereClause` |
| `valueField` | No (default `observationId`) | Saved value path (`observationId` or `data.field`) |
| `labelField` | No (default `data.names`) | Display label path |
| `distinct` | No (default `false`) | `true` = unique values of `valueField` only |

### Filter `params`

Keys in `params` are **field names on observation JSON** (without a `data.` prefix in the schema; the runtime adds `data.` when building the query).

**Cascading / dependent dropdowns** use template values from the current form:

```json
"hh_village_name": "{{data.section_1_cascading.test_village}}"
```

- Syntax: `{{data.<path>}}` with dots for nested objects.
- If the template resolves empty, that filter is **skipped** (broader result set).
- The control reloads when templated parent fields change.

**Indexed param keys** (fast when declared in `app.config.json` — AnthroCollect example):

| Param key | Typical `query` | Meaning |
|-----------|-----------------|---------|
| `hh_id` | any | Household ID |
| `p_id` | any | Person ID |
| `hh_village_name` | `household` | Household village |
| `village` | `hh_person` | Person `village` |
| `p_hh_res_validation` | `hh_person` | Person residential validation village |
| `sex` | `hh_person` | `male` / `female` |

**Aliases** (AnthroCollect registry):

- `household` + param `village` → same as `hh_village_name`
- `hh_person` + param `hh_village_name` → filters `p_hh_res_validation`

Other keys still work but may use slower `json_extract` until an index is added.

### `whereClause` in `params`

For extra conditions, add a SQL-style fragment:

```json
"params": {
  "sex": "female",
  "whereClause": "data.p_age_participant_estimate >= 18"
}
```

- Simple equalities like `data.field = 'value'` are parsed into the filter AST.
- **`age_from_dob(...)`** is evaluated in **JavaScript after** the query (not in SQL).
- Numeric comparisons (`>=`, `<=`) on arbitrary fields may fall back to post-query behavior depending on the parser — prefer indexed equality `params` when possible.

### `distinct: true`

Use for categorical values (e.g. all village names from households):

```json
"x-dynamicEnum": {
  "query": "household",
  "params": {},
  "valueField": "data.hh_village_name",
  "labelField": "data.hh_village_name",
  "distinct": true
}
```

### Examples

**Distinct villages from households**

```json
"test_village": {
  "type": "string",
  "title": "Select village",
  "x-dynamicEnum": {
    "query": "household",
    "params": {},
    "valueField": "data.hh_village_name",
    "labelField": "data.hh_village_name",
    "distinct": true
  }
}
```

**Subvillages filtered by selected village**

```json
"test_subvillage": {
  "type": "string",
  "title": "Select subvillage",
  "x-dynamicEnum": {
    "query": "household",
    "params": {
      "hh_village_name": "{{data.test_village}}"
    },
    "valueField": "data.hh_subvillage",
    "labelField": "data.hh_subvillage",
    "distinct": true
  }
}
```

**All persons**

```json
"test_person": {
  "type": "string",
  "title": "Select person",
  "x-dynamicEnum": {
    "query": "hh_person",
    "params": {},
    "valueField": "observationId",
    "labelField": "data.names",
    "distinct": false
  }
}
```

**Males in a village**

```json
"test_male_in_village": {
  "type": "string",
  "title": "Select male in village",
  "x-dynamicEnum": {
    "query": "hh_person",
    "params": {
      "sex": "male",
      "p_hh_res_validation": "{{data.test_village}}"
    },
    "valueField": "observationId",
    "labelField": "data.names",
    "distinct": false
  }
}
```

### UI schema (`ui.json`)

No special control type. Use a normal **Control** with the correct `scope`; the renderer is chosen automatically when `x-dynamicEnum` is present:

```json
{
  "type": "Control",
  "scope": "#/properties/my_field"
}
```

### Add, update, or remove a dynamic field

1. Add `x-dynamicEnum` on the property in `schema.json`.
2. Add a `Control` in `ui.json`.
3. Confirm `query` matches a form type in the bundle.
4. Validate JSON; test on device with real synced observations.
5. For a new heavily used filter key, add **`observationIndexes`** in `app.config.json` and re-sync the bundle.

### Troubleshooting

| Problem | What to check |
|---------|----------------|
| Empty dropdown | Observations for `query`? Filters too strict? Template path correct? |
| Dropdown does not update | Parent field in `{{data....}}` must be set first |
| Slow loading | Use indexed `params`; avoid unfiltered queries on large tables |
| `Function not found` | Rebuild custom app with extensions |
| Wrong labels | `labelField` path (`data.names` vs `data.hoh_male`, etc.) |

---

## Quick decision guide

| Need | Use |
|------|-----|
| Fixed options defined by the study | Shared list + `$ref` |
| Options from data on the tablet | `x-dynamicEnum` + `getDynamicChoiceList` |

---

## Checklist before release

- [ ] Form validation passes (`validate:forms` or equivalent)
- [ ] Shared: new `const` values coordinated with exports / analysis
- [ ] Dynamic: `query` form type exists; `params` keys match real observation fields
- [ ] Dynamic: hot filters covered by `observationIndexes` where needed
- [ ] Tested on device with representative observations (dynamic fields)

---

## ODK-X mapping

| ODK-X | ODE |
|-------|-----|
| Choice lists in CSV | Shared `$defs` or inline `oneOf` |
| Linked table / select person | `x-dynamicEnum` + `query` |
| Choice filters | `params` and/or `whereClause` |
| Cascading selects | `params` with `{{data.field}}` templates |

---

## Implementation (developers)

| Layer | Location |
|-------|----------|
| Shared `$ref` resolution | `formulus` → `sharedChoiceSchema.ts`; bundle validation → `shared-choice-schema.cjs` |
| Dynamic renderer | `formulus-formplayer` → `DynamicEnumControl` |
| Query + filters | Custom app → `getDynamicChoiceList` → `buildDynamicChoiceFilter` → `getObservationsByQuery` |
| Indexes | `app.config.json` → `observationIndexes` |

Legacy URL: [Dynamic choice lists](./dynamic-choice-lists) redirects here.
