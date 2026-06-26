---
sidebar_position: 3
---

# Form Specifications

Technical specification for ODE form definitions using JSON schema and JSON Forms.

## Overview

Forms in ODE are defined using two JSON documents:

1. **Schema**: Defines the data structure and validation rules (JSON Schema)
2. **UI Schema**: Defines how the form is presented to users (JSON Forms UI Schema)

Both follow established standards: JSON Schema for data validation and JSON Forms for UI specification.

## Schema Format

The schema follows the JSON Schema specification (draft 7). It defines the structure and validation rules for form data.

### Basic Structure

```json
{
  "type": "object",
  "properties": {
    "fieldName": {
      "type": "string",
      "title": "Field Label",
      "description": "Field description"
    }
  },
  "required": ["fieldName"]
}
```

### Property Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text input | Names, descriptions, text fields |
| `integer` | Whole number | Age, count, quantity |
| `number` | Decimal number | Weight, temperature, measurements |
| `boolean` | True/false value | Consent, agreement, flags |
| `array` | List of items | Multiple selections, lists |
| `object` | Nested object | Complex data structures |

### Validation Rules

Common validation rules:

```json
{
  "type": "string",
  "minLength": 5,
  "maxLength": 100,
  "pattern": "^[A-Za-z]+$",
  "format": "email"
}
```

**Available formats:**
- `email`: Email address validation
- `date`: Date validation (ISO 8601)
- `date-time`: Date and time validation
- `uri`: URI validation
- `uuid`: UUID validation

**Numeric constraints:**
- `minimum` / `maximum`: For numbers
- `exclusiveMinimum` / `exclusiveMaximum`: Exclude boundary values
- `multipleOf`: Must be multiple of value

**String constraints:**
- `minLength` / `maxLength`: String length
- `pattern`: Regular expression pattern

### Enumeration

Define allowed values:

```json
{
  "type": "string",
  "enum": ["option1", "option2", "option3"],
  "enumNames": ["Option 1", "Option 2", "Option 3"]
}
```

## UI Schema Format

The UI schema follows the JSON Forms UI Schema specification. It controls how form fields are presented and organized.

### Basic Structure

```json
{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/fieldName"
    }
  ]
}
```

### Layout Types

| Layout | Description | Use Case |
|--------|-------------|----------|
| `VerticalLayout` | Fields arranged vertically | Default layout |
| `HorizontalLayout` | Fields arranged horizontally | Side-by-side fields |
| `Group` | Group related fields | Logical grouping |
| `Categorization` | Organize into categories | Complex forms with sections |

### Control Configuration

```json
{
  "type": "Control",
  "scope": "#/properties/fieldName",
  "label": "Custom Label",
  "options": {
    "placeholder": "Enter value",
    "format": "password"
  }
}
```

### Conditional Display

Show or hide fields based on other field values:

```json
{
  "type": "Control",
  "scope": "#/properties/email",
  "rule": {
    "effect": "SHOW",
    "condition": {
      "scope": "#/properties/contactMethod",
      "schema": {
        "const": "email"
      }
    }
  }
}
```

## Question Types

Question types are specified using the `format` property in the schema:

### Text Input

```json
{
  "type": "string",
  "title": "Name",
  "format": "text"
}
```

### Number Input

```json
{
  "type": "integer",
  "title": "Age",
  "minimum": 0,
  "maximum": 120
}
```

### Date and Time

```json
{
  "type": "string",
  "title": "Date",
  "format": "date"
}
```

### Selection

```json
{
  "type": "string",
  "title": "Choice",
  "enum": ["option1", "option2"],
  "enumNames": ["Option 1", "Option 2"]
}
```

### Sub-observations (embedded observations of another form type)

Collect **multiple related observations as JSON objects inside one parent observation** using `"format": "sub-observation"`. Each embedded item is edited in a nested Formplayer session (`openFormplayer` with `subObservationMode`). Only **`linkedForm`** is required; **`parentKey`** is optional. Optional **`itemLabel`** customizes add-button and empty-table copy (see [Custom Extensions](../guides/custom-extensions.md#sub-observations-format-sub-observation)).

Nested sessions validate the **child** schema on submit (`skipFinalize` only skips the Finalize page). Parent-level validators and denormalized fields run in the **parent** session. For multi-level trees, use validators on each form where rows are added, or parent snapshot init fields — see [Nested sessions and custom validators](../guides/custom-extensions.md#nested-sessions-and-custom-validators).

See the full schema options and examples in [Custom Extensions](../guides/custom-extensions.md#sub-observations-format-sub-observation).

```json
{
  "linked_children": {
    "type": "array",
    "format": "sub-observation",
    "title": "Related entries",
    "linkedForm": "child_form",
    "parentKey": "parent_id",
    "parentValuePath": "parent_id",
    "displayField": "name",
    "subObservationInitValues": {
      "parent_id": "{{parentValue}}"
    }
  }
}
```

### Multimedia Types

#### Photo

```json
{
  "type": "object",
  "format": "photo",
  "title": "Profile Photo"
}
```

#### Audio

```json
{
  "type": "string",
  "format": "audio",
  "title": "Voice Note"
}
```

#### Video

```json
{
  "type": "string",
  "format": "video",
  "title": "Instructional Video"
}
```

#### GPS

```json
{
  "type": "string",
  "format": "gps",
  "title": "Current Location"
}
```

#### Signature

```json
{
  "type": "object",
  "format": "signature",
  "title": "Customer Signature"
}
```

#### QR Code

```json
{
  "type": "string",
  "format": "qrcode",
  "title": "QR Code Scanner"
}
```

#### File Selection

Generic attachment via document picker. Use **`type: object`** with **`format: select_file`** (Formplayer stores basename + portable metadata; no inline preview).

```json
{
  "type": "object",
  "format": "select_file",
  "title": "Upload Document"
}
```

## Form Versioning

Forms support versioning to allow updates while maintaining compatibility:

- Each form has a `schemaType` and `schemaVersion`
- When editing an observation, the form version used to create it is used
- New observations use the latest form version

## Complete Example

```json
{
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "Full Name",
        "minLength": 1,
        "maxLength": 100
      },
      "age": {
        "type": "integer",
        "title": "Age",
        "minimum": 0,
        "maximum": 120
      },
      "email": {
        "type": "string",
        "title": "Email Address",
        "format": "email"
      },
      "photo": {
        "type": "object",
        "format": "photo",
        "title": "Profile Photo"
      }
    },
    "required": ["name", "age"]
  },
  "uischema": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/name"
      },
      {
        "type": "Control",
        "scope": "#/properties/age"
      },
      {
        "type": "Control",
        "scope": "#/properties/email"
      },
      {
        "type": "Control",
        "scope": "#/properties/photo"
      }
    ]
  }
}
```

## Related Documentation

- [Form Design Guide](/guides/form-design)
- [JSON Forms Documentation](https://jsonforms.io)
- [JSON Schema Documentation](https://json-schema.org)
