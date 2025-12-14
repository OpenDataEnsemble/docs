---
sidebar_position: 1
---

# Forms Overview

Create and configure data collection forms in ODE.

## Understanding Forms

Forms in ODE are defined using **JSON Schema** for data structure and **JSON Forms UI Schema** for layout.

A **form** is a template that defines:
- What data to collect (schema)
- How to display it (UI)
- Validation rules
- Conditional logic

## Form Structure

### Required Files

Each form requires two files:

```
forms/
└── myform/
    ├── schema.json    # Data structure (JSON Schema)
    └── ui.json        # Display layout (UI Schema)
```

### schema.json

Defines the data structure using JSON Schema draft-07:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Patient Registration",
  "description": "Register a new patient",
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
      "minLength": 1,
      "maxLength": 100
    },
    "lastName": {
      "type": "string",
      "title": "Last Name",
      "minLength": 1,
      "maxLength": 100
    },
    "dateOfBirth": {
      "type": "string",
      "format": "date",
      "title": "Date of Birth"
    },
    "gender": {
      "type": "string",
      "title": "Gender",
      "enum": ["male", "female", "other"]
    }
  },
  "required": ["firstName", "lastName", "dateOfBirth", "gender"]
}
```

### ui.json

Defines how the form is displayed:

```json
{
  "type": "Layout",
  "layout": "vertical",
  "elements": [
    {
      "type": "Label",
      "text": "Patient Information",
      "variant": "h5"
    },
    {
      "type": "Control",
      "scope": "#/properties/firstName"
    },
    {
      "type": "Control",
      "scope": "#/properties/lastName"
    },
    {
      "type": "Control",
      "scope": "#/properties/dateOfBirth"
    },
    {
      "type": "Control",
      "scope": "#/properties/gender",
      "options": {
        "format": "radio"
      }
    }
  ]
}
```

## Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Forms     │────▶│   User      │────▶│ Observations│
│  (Schema)   │     │  (Mobile)   │     │   (Data)    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               │ Sync
                                               ▼
                                        ┌─────────────┐
                                        │  Synkronus  │
                                        │  (Server)   │
                                        └─────────────┘
```

## Field Types

Forms support various field types:

| Field Type | Description | Schema Type |
|------------|-------------|-------------|
| **Text** | Single/multi-line text | `string` |
| **Number** | Numeric values | `number`, `integer` |
| **Date/Time** | Date and time selection | `string` with `format` |
| **Select** | Single choice | `string` with `enum` |
| **Multi-select** | Multiple choices | `array` |
| **Boolean** | Checkbox/toggle | `boolean` |
| **Photo** | Camera capture | `string` with `formulus:type: "photo"` |
| **GPS** | Location capture | `object` with `formulus:type: "gps"` |
| **Signature** | Digital signature | `string` with `formulus:type: "signature"` |
| **Audio** | Voice recording | `string` with `formulus:type: "audio"` |
| **QR Code** | Scan QR/barcode | `string` with `formulus:type: "qrcode"` |

## Form Design

- [Schema Definition](/docs/build/forms/design/schema-definition) - Define data structure
- [UI Schema Configuration](/docs/build/forms/design/ui-schema) - Configure layout
- [Validation Rules](/docs/build/forms/design/validation) - Add validation
- [Conditional Logic](/docs/build/forms/design/conditional-logic) - Show/hide fields

## Advanced Features

- [Multimedia in Forms](/docs/build/forms/advanced-features/multimedia) - Photos, audio, video
- [GPS & Location](/docs/build/forms/advanced-features/location) - Location capture
- [File Attachments](/docs/build/forms/advanced-features/attachments) - File uploads

## Best Practices

### Form Design

1. **Keep forms focused** - One purpose per form
2. **Use clear labels** - Avoid jargon
3. **Group related fields** - Use sections
4. **Mark required fields** - Use schema `required`
5. **Add help text** - Guide users
6. **Test on device** - Verify usability

### Schema Design

1. **Use appropriate types** - String, number, boolean
2. **Add validation** - minLength, maximum, pattern
3. **Use enums** - For fixed choices
4. **Document fields** - Use `description`
5. **Version schemas** - Track changes

## Related Content

- [Form Versioning](/docs/build/forms/versioning)
- [Observations](/docs/build/data-management/observations)
- [JSON Forms Documentation](https://jsonforms.io)
- [JSON Schema Documentation](https://json-schema.org)
