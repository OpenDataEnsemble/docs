---
sidebar_position: 4
---

# Dynamic Choice Lists

Transform static dropdowns into dynamic, data-driven selections that automatically populate from existing observations.

:::info Production Ready
Dynamic Choice Lists are production-ready as of v1.0 and provide a complete alternative to the ODK-X "select person" and "linked tables" patterns.
:::

## Overview

Dynamic Choice Lists enable you to populate dropdown menus at runtime from observations stored in the local database, rather than hard-coding choices in the form schema.

**Benefits:**
- ✅ **Data-driven dropdowns** - Automatically updated from real observations
- ✅ **Filtered queries** - Show only relevant choices based on parameters
- ✅ **No schema redeployment** - Add new choices by creating observations
- ✅ **ODK-X compatible** - Replaces linked tables and select person patterns
- ✅ **Performance optimized** - Efficient filtering and caching
- ✅ **Complex logic** - Support for age calculations and advanced filters

## Quick Start

### Basic Example: Village Selection

Static approach (❌ outdated when new villages added):
```json
{
  "village": {
    "type": "string",
    "enum": ["kopria", "lorenkacho", "chare"]
  }
}
```

Dynamic approach (✅ automatically updated):
```json
{
  "village": {
    "type": "string",
    "title": "Select Village",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "household",
      "params": {},
      "valueField": "data.hh_village_name",
      "labelField": "data.hh_village_name",
      "distinct": true
    }
  }
}
```

**How it works:**
1. When the form loads, `getDynamicChoiceList` queries observations of type `household`
2. Extracts unique values from `data.hh_village_name` field
3. Displays them as dropdown options
4. Uses the same field for both value and label

### Understanding the Configuration

```json
{
  "x-dynamicEnum": {
    "function": "getDynamicChoiceList",    // Always this value
    "query": "formType",                    // Form type to query (e.g., "household")
    "params": {},                           // Filter parameters (see below)
    "valueField": "data.fieldName",         // Path to value in observations
    "labelField": "data.fieldName",         // Path to display label (optional)
    "distinct": true                        // true = unique values only
  }
}
```

## Field Path Syntax

### Form Data Fields

Reference observation data using dot notation with `data.` prefix:

```json
"valueField": "data.hh_village_name"  // Village name from village observations
"valueField": "data.names"             // Person name from person observations
"valueField": "data.sex"               // Sex/gender field
```

### Metadata Fields

Access observation metadata without the data prefix:

```json
"valueField": "observationId"  // Unique observation ID
"labelField": "formType"       // Form type
"valueField": "createdAt"      // Creation timestamp
"labelField": "isDraft"        // Draft status
```

## Configuration Reference

### Common Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `function` | string | ✅ Yes | Must be exactly `"getDynamicChoiceList"` | `"getDynamicChoiceList"` |
| `query` | string | ✅ Yes | Form type to query observations from | `"household"`, `"hh_person"` |
| `valueField` | string | ✅ Yes | Path to value field (use `data.` prefix for form fields) | `"data.hh_village_name"`, `"observationId"` |
| `labelField` | string | No | Path to label field (defaults to `valueField`) | `"data.names"` |
| `params` | object | No | Filter parameters (see below) | `{"sex": "male"}` |
| `distinct` | boolean | No | Return only unique values | `true`, `false` |

### Filtering with Parameters

Simple equality filters via `params`:

```json
{
  "male_person": {
    "type": "string",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {
        "sex": "male"
      },
      "valueField": "observationId",
      "labelField": "data.names"
    }
  }
}
```

**Automatic conversion:**
```
params: {"sex": "male"}
↓
Becomes: WHERE data.sex = 'male'
```

### WHERE Clause for Complex Logic

Use `whereClause` in params for complex filtering:

```json
{
  "adult_participant": {
    "type": "string",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {
        "whereClause": "age_from_dob(data.dob) >= 18"
      },
      "valueField": "observationId",
      "labelField": "data.names"
    }
  }
}
```

### WHERE Clause Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `data.sex = 'male'` |
| `!=` or `<>` | Not equals | `data.sex != 'female'` |
| `<` | Less than | `age_from_dob(data.dob) < 18` |
| `>` | Greater than | `age_from_dob(data.dob) > 65` |
| `<=` | Less than or equal | `age_from_dob(data.dob) <= 30` |
| `>=` | Greater than or equal | `data.p_age >= 18` |
| `AND` | Logical AND | `data.sex = 'female' AND age_from_dob(data.dob) >= 18` |
| `OR` | Logical OR | `data.village = 'A' OR data.village = 'B'` |
| `NOT` | Logical NOT | `NOT (data.archived = true)` |
| `()` | Grouping | `(age_from_dob(data.dob) >= 18 AND age_from_dob(data.dob) <= 30) OR age_from_dob(data.dob) >= 50` |

**Special Functions:**
- `age_from_dob(data.dob)` - Calculate age from date of birth field (calculated in JavaScript)

### Combining Filters

You can combine static parameters with WHERE clauses:

```json
{
  "adult_male": {
    "type": "string",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {
        "sex": "male",
        "whereClause": "age_from_dob(data.dob) >= 18"
      },
      "valueField": "observationId",
      "labelField": "data.names"
    }
  }
}
```

Equivalent to: `WHERE data.sex = 'male' AND age_from_dob(data.dob) >= 18`

## Real-World Examples

### Example 1: Location Selection

**Use Case:** Multi-level geographic selection (country → province → village)

```json
{
  "country": {
    "type": "string",
    "title": "Select Country",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "location",
      "params": {},
      "valueField": "data.country_code",
      "labelField": "data.country_name",
      "distinct": true
    }
  },
  "province": {
    "type": "string",
    "title": "Select Province",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "location",
      "params": {
        "country_code": "UG"
      },
      "valueField": "data.province_code",
      "labelField": "data.province_name",
      "distinct": true
    }
  },
  "village": {
    "type": "string",
    "title": "Select Village",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "location",
      "params": {
        "country_code": "UG",
        "province_code": "central"
      },
      "valueField": "data.village_name",
      "labelField": "data.village_name",
      "distinct": true
    }
  }
}
```

**Note:** Currently, cascading (template parameters like `{{data.field}}`) is not supported. Use static filter values only.

### Example 2: Household Member Selection (ODK-X "Select Person" Pattern)

```json
{
  "primary_respondent": {
    "type": "string",
    "title": "Select Primary Respondent",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {},
      "valueField": "observationId",
      "labelField": "data.names",
      "distinct": false
    }
  }
}
```

### Example 3: Filtered by Demographics

```json
{
  "adult_female_participant": {
    "type": "string",
    "title": "Select Adult Female (18+)",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {
        "sex": "female",
        "whereClause": "age_from_dob(data.dob) >= 18"
      },
      "valueField": "observationId",
      "labelField": "data.names",
      "distinct": false
    }
  }
}
```

### Example 4: Ranking Survey (ODK-X "Ranking" Pattern)

```json
{
  "rank_1": {
    "type": "string",
    "title": "Most Influential Person (Rank #1)",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {"sex": "male"},
      "valueField": "observationId",
      "labelField": "data.names",
      "distinct": false
    }
  },
  "rank_2": {
    "type": "string",
    "title": "Second Most Influential (Rank #2)",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {"sex": "male"},
      "valueField": "observationId",
      "labelField": "data.names",
      "distinct": false
    }
  }
}
```

### Example 5: Age-Based Filtering

```json
{
  "adult_participant": {
    "type": "string",
    "title": "Select Adult (18+)",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {
        "whereClause": "age_from_dob(data.dob) >= 18"
      },
      "valueField": "observationId",
      "labelField": "data.names",
      "distinct": false
    }
  },
  "working_age": {
    "type": "string",
    "title": "Select Working Age Adult (18-65)",
    "x-dynamicEnum": {
      "function": "getDynamicChoiceList",
      "query": "hh_person",
      "params": {
        "whereClause": "age_from_dob(data.dob) >= 18 AND age_from_dob(data.dob) <= 65"
      },
      "valueField": "observationId",
      "labelField": "data.names",
      "distinct": false
    }
  }
}
```

## Performance Optimization

### Use `distinct: true` for Categories

When showing unique values (e.g., all villages), use `distinct: true`:

```json
{
  "distinct": true  // Returns ["kopria", "lorenkacho"] instead of 100 duplicates
}
```

### Filter at Query Level

Move filtering to the query parameters instead of loading all records:

```json
// ✅ Good - filters at query time
{
  "params": {"village": "kopria"}
}

// ❌ Bad - loads all records, filters in UI
{
  "params": {}
}
```

### Combine Filters for Precision

Use multiple filters to reduce dataset size:

```json
{
  "params": {
    "village": "kopria",
    "sex": "female",
    "whereClause": "age_from_dob(data.dob) >= 18"
  }
}
```

## Troubleshooting

### Dropdown is Empty

**Check 1: Do observations exist?**
- Verify that observations of the queried type exist in the database
- Example: If querying "household", ensure at least one household observation is saved

**Check 2: Field path is correct?**
- Verify `valueField` and `labelField` match the actual field names in your observations
- Use exact field names with correct `data.` prefix
- Example: Use `data.hh_village_name`, not `data.village`

**Check 3: Values are populated?**
- Open an observation and verify the field contains data
- If the field is empty in observations, the dropdown will be too

**Check 4: Filter is too restrictive?**
- Temporarily remove filters to see if results appear
- Relax filters or add observations that match

**Debug:** Use Chrome DevTools to inspect the WebView and check console logs for errors.

### Filtered Dropdown Shows All Items

**Check 1: Filter field names**
- Verify parameter names match database field names
- Example: Using `village_name` but database has `hh_village_name`

**Check 2: Case sensitivity**
- Filter values are case-sensitive
- "Kopria" ≠ "kopria"

**Check 3: Filter value exists**
- Verify the filter value actually exists in at least one observation
- If no observations match, the dropdown appears empty

### Dropdown Shows IDs Instead of Names

**Solution:** Set `labelField` to a human-readable field:

```json
{
  "valueField": "observationId",
  "labelField": "data.names"  // Show names instead of IDs
}
```

### Slow Loading

**Solutions:**
1. Add filters to reduce dataset size
2. Use `distinct: true` for categorical fields
3. Simplify WHERE clauses
4. Target specific form types (don't query all forms)

## Production Checklist

Before deploying forms with dynamic choice lists:

- [ ] `function` is exactly `"getDynamicChoiceList"`
- [ ] `query` matches an existing form type
- [ ] `valueField` path exists in observations
- [ ] `labelField` is human-readable (for users)
- [ ] `distinct` set appropriately (true for categories, false for records)
- [ ] `params` filter fields exist in observations
- [ ] Tested with real data
- [ ] Dropdown populates with expected choices
- [ ] Performance is acceptable (< 1 second load time)
- [ ] Filters work correctly

## Implementation Details

### How It Works

```
1. Formplayer loads form with x-dynamicEnum config
   ↓
2. DynamicEnumControl renderer initializes
   ↓
3. Calls getDynamicChoiceList via JavaScript bridge
   ↓
4. WebView bridge routes to Formulus native code
   ↓
5. Formulus queries WatermelonDB for observations
   ↓
6. Applies filters (params + whereClause)
   ↓
7. Extracts valueField and labelField from results
   ↓
8. Returns choices to renderer
   ↓
9. Dropdown displays options
```

### Key Files

**Implementation:**
- `formulus-formplayer/src/DynamicEnumControl.tsx` - React renderer component
- `formulus-formplayer/src/builtinExtensions.ts` - Query logic and WHERE clause building
- `formulus/src/webview/FormulusMessageHandlers.ts` - Native message handler
- `formulus/src/services/FormService.ts` - Database query execution

**Documentation:**
- `DYNAMIC_CHOICE_LISTS.md` - Complete reference in GitHub repo

## ODK-X Feature Mapping

Comparison to ODK-X functionality:

| ODK-X Feature | ODE Implementation |
|---------------|-------------------|
| Linked tables with SQL | `x-dynamicEnum` with `query` + `whereClause` |
| Select person prompt | `query: "hh_person"` with filters |
| Choice/field filters | `params` or `whereClause` |
| `query()` function | `getDynamicChoiceList` |
| `_id` column (primary key) | `observationId` field |
| Cascading selects | **Not supported** (use static filters) |

## Best Practices

✅ **Do:**
- Use `distinct: true` for unique values
- Use parameter filtering for simple cases
- Use meaningful `labelField` values
- Test with actual data
- Use `valueField: "observationId"` to reference records
- Use static filter values in params

❌ **Don't:**
- Query all observations without filtering
- Use `distinct: true` for record IDs
- Forget `data.` prefix for form fields
- Use typos in field names
- Query non-existent form types
- Use template parameters (`{{data.field}}`) - not supported

## Getting Help

1. **Check examples above** for similar use case
2. **Review troubleshooting section** for common issues
3. **Check browser console** for error messages
4. **Verify observations** exist with correct field names
5. **Test with simplified schema** first
6. **Ask on GitHub Discussions** if stuck

## Related Sections

- [Form Design](/docs/guides/form-design) - Learn about form structure
- [Formplayer Reference](/docs/reference/formplayer) - Question type details
- [Formulus Features](/docs/using/formulus-features) - Mobile app capabilities
- [Sync Protocol](/docs/development/architecture#sync-protocol) - How data syncs
