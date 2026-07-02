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

### Rating Scales (Likert)

Use **`format: "likert"`** for agreement, satisfaction, frequency, importance, likelihood, and numeric rating scales. The stored value is the selected `oneOf[].const` (typically an integer, or `null` when "Not applicable" is chosen). Labels come from each `oneOf[].title` and are fully translatable.

```json
{
  "type": "integer",
  "format": "likert",
  "title": "How satisfied are you with the service?",
  "oneOf": [
    { "const": 1, "title": "Very dissatisfied" },
    { "const": 2, "title": "Dissatisfied" },
    { "const": 3, "title": "Neutral" },
    { "const": 4, "title": "Satisfied" },
    { "const": 5, "title": "Very satisfied" }
  ],
  "likert": {
    "display": "buttons",
    "colorMode": "spectrum",
    "allowClear": true
  }
}
```

All variants share one clean look: neutral outlined option cells, with an accent border and tint on the selected option only. Every option is a touch-friendly target and the layout adapts to phone and tablet widths.

#### Display modes (`likert.display`)

| Value     | Presentation                                             |
| --------- | -------------------------------------------------------- |
| `buttons` | Equal-width labelled option cells (default)              |
| `radio`   | Radio row with labels below (classic survey style)       |
| `slider`  | Slider with tick marks, endpoint anchors, and value badge|
| `numeric` | Compact number cells (NPS style)                         |
| `stars`   | Star rating with the selected label alongside            |
| `emoji`   | One emoji per option (`emoji` on each `oneOf` entry)     |

#### Colour (`likert.colorMode`)

| Value      | Selected-option accent                          |
| ---------- | ----------------------------------------------- |
| `neutral`  | Theme primary (default)                         |
| `spectrum` | Semantic red → yellow → green by scale position |
| `stars`    | Standard rating gold (used with `display: "stars"`) |

Colour is only ever a secondary cue — selection is always conveyed by the border, tint, and weight as well, so scales remain readable for colour-blind respondents.

#### Presets

When you omit `oneOf`, set `likert.preset` to generate standard options: `agreement`, `frequency`, `satisfaction`, `importance`, `likelihood`, `numeric_0_10`, `numeric_1_5`, `numeric_1_7`.

#### Choosing a scale

| Display                                | Best for                        | Label pattern                                                    |
| -------------------------------------- | ------------------------------- | ---------------------------------------------------------------- |
| `buttons` / `radio`                    | Opinion scales (3–5 options)    | Full label per option (`oneOf[].title`)                          |
| `numeric`                              | NPS, pain, rating (5+ points)   | Numbers in cells; word labels on the first/last `oneOf` entries  |
| `buttons` + `endpointLabelsOnly: true` | NPS 0–10 in button form         | Digits in cells; endpoint words below                            |
| `slider`                               | Continuous 0–10 ranges          | Endpoint word anchors below; value badge always visible          |
| `emoji`                                | Optional sentiment (low-stakes) | Emoji **and** text label on every option                         |
| `stars`                                | 5-point satisfaction            | Star count with the selected label beside it                     |

Research on survey scales favours **numeric scales with verbal endpoint anchors** (highest reliability) and **fully-labelled word buttons** (fastest to answer). Emoji are engaging but can cluster toward the middle and vary by culture, so they always render with a text label and are best reserved for informal contexts.

#### Additional options

| Option                       | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `likert.allowClear`          | Tapping the selected option again clears it (default `true`).                                    |
| `likert.endpointLabelsOnly`  | Show word labels only at the endpoints of long numeric scales; omit for 3–4 option scales.       |
| `likert.allowNotApplicable`  | Adds a "Not applicable" choice. Use `type: ["integer", "null"]`; stores the `notApplicableValue`. |
| `likert.notApplicableLabel`  | Custom label for the N/A option (default "Not applicable").                                       |
| `likert.notApplicableValue`  | Stored value for N/A (default `null`).                                                            |

#### Layout (UI schema)

Control the arrangement from the UI schema `options`:

```json
{
  "type": "Control",
  "scope": "#/properties/satisfaction",
  "options": { "orientation": "cols-2" }
}
```

`options.orientation` accepts `horizontal` (default), `vertical` (stacked), `flow` (wrap), or `cols-2` … `cols-5` (a fixed multi-column grid, useful on tablets). Word and radio scales automatically stack to one option per row on narrow phones. `options.display` overrides `likert.display` per placement.

In review/read-only mode the selected answer stays prominent while the other options are de-emphasised, and the finalize summary shows the option's `title` (or "Not applicable").

### Duration / Timer

Use **`format: "duration"`** to capture an elapsed time. The stored value is always a number of **seconds**.

```json
{
  "type": "number",
  "format": "duration",
  "title": "Time to complete the task",
  "minimum": 0,
  "duration": {
    "mode": "stopwatch",
    "unit": "seconds",
    "precision": 1,
    "allowManualEntry": true
  }
}
```

| `duration.mode` | Presentation                                        |
| --------------- | --------------------------------------------------- |
| `stopwatch`     | Start / Pause / Resume / Reset, then **Save** to commit |
| `countdown`     | Counts down from `duration.countdownFrom` seconds   |
| `manual`        | A plain numeric seconds field                       |

Other options: `unit` (display unit), `precision` (decimal places), `allowManualEntry` (permit typing a value alongside the timer), and `countdownFrom` (starting seconds for `countdown`). The stopwatch commits only when the collector presses **Save**, so an unsaved running timer never writes a partial value. The finalize summary renders the value in a human-readable form (e.g. `1m 30s`).

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
