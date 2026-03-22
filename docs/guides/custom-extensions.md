---
sidebar_position: 5
---

# Custom Extensions

Create custom question types and extend the Formulus Formplayer with specialized input fields.

:::info Production Ready
The ODE extension system allows developers to package custom question types that work seamlessly with the form system. Extensions are deployed via app bundles and automatically available to all users.
:::

## Overview

The extension system enables you to:

- **Custom Question Types** - Add specialized input components beyond built-in types
- **Business Logic** - Implement domain-specific validation and processing
- **Reusable Components** - Package extensions for distribution to other implementations
- **Automatic Distribution** - Deploy via app bundles; users get updates automatically

## Quick Start

### Creating a Custom Question Type

A custom question type consists of:

1. **TypeScript/JavaScript Component** - React component for rendering
2. **Type Definition** - JSON schema for form configuration
3. **Registration** - Entry in the extension registry

**Example: Custom Phone Number Input**

```typescript
// phone-number-type.tsx

import React from 'react';
import { Control } from 'react-hook-form';

interface PhoneNumberProps {
  value: string;
  onChange: (value: string) => void;
  format: 'intl' | 'local';  // From UI Schema
  country?: string;          // From UI Schema
  required?: boolean;
  error?: string;
}

export const PhoneNumberControl: React.FC<PhoneNumberProps> = ({
  value,
  onChange,
  format,
  country,
  error,
  required
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Custom formatting logic
    const cleaned = input.replace(/\D/g, '');
    const formatted = formatPhoneNumber(cleaned, format, country);
    onChange(formatted);
  };

  return (
    <div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={getPlaceholder(format, country)}
        required={required}
        aria-invalid={!!error}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

// Helper functions
function formatPhoneNumber(
  digits: string,
  format: 'intl' | 'local',
  country?: string
): string {
  if (format === 'intl') {
    return `+${digits}`;  // International format
  }
  // Local format based on country
  if (country === 'UG') {
    return digits.replace(/(\d{3})(\d{2})(\d{6})/, '+256$2 $3');
  }
  return digits;
}

function getPlaceholder(format: 'intl' | 'local', country?: string): string {
  if (format === 'intl') return '+256 701 234567';
  if (country === 'UG') return '0701 234567';
  return '(Enter phone number)';
}
```

### Defining in Schema

Define the custom type in your form schema:

```json
{
  "schema": {
    "type": "object",
    "properties": {
      "phone": {
        "type": "string",
        "title": "Phone Number",
        "x-custom": {
          "type": "phone-number",
          "format": "intl",
          "country": "UG"
        }
      }
    }
  },
  "uischema": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/phone"
      }
    ]
  }
}
```

### Registering the Extension

Extensions are registered when the app initializes using the extension system:

```typescript
// In Formulus initialization or custom app setup

import { registerExtension } from '@ode/formulus-extensions';
import { PhoneNumberControl } from './phone-number-type';

registerExtension({
  name: 'phone-number',
  renderer: PhoneNumberControl,
  schema: {
    type: 'string',
    x-custom: {
      type: 'phone-number'
    }
  },
  validation: {
    pattern: '^\\+?\\d{6,15}$',
    minLength: 6,
    maxLength: 15
  },
  metadata: {
    displayName: 'Phone Number',
    description: 'International or local phone number input',
    version: '1.0.0'
  }
});
```

## Extension Types

### 1. Custom Question Type

New input component for collecting specific data types:

```typescript
interface QuestionTypeExtension {
  name: string;                    // Unique type ID
  renderer: React.ComponentType;   // React component
  supportedFormats?: string[];     // Optional format variants
  validation?: ValidationSchema;   // Validation rules
  metadata: ExtensionMetadata;
}
```

**Examples:**
- Phone number with formatting
- GPS coordinate input with map
- Color picker
- Time range selector
- Signature capture with pressure

### 2. Business Logic Extension

Custom functions for validation, calculation, or data processing:

```typescript
interface BusinessLogicExtension {
  name: string;
  description: string;
  functions: {
    [key: string]: (params: any) => any;
  };
  metadata: ExtensionMetadata;
}

// Example: Custom validation function
registerLogicExtension({
  name: 'advanced-validations',
  functions: {
    validateHouseholdStructure: (household) => {
      // Validate household relationships
      const adults = household.members.filter(m => m.age >= 18);
      return adults.length > 0;
    },
    calculateHouseholdSize: (household) => {
      return household.members.length;
    }
  }
});

// Use in form
{
  "type": "object",
  "properties": {
    "members": {
      "type": "array",
      "x-validation": {
        "function": "validateHouseholdStructure"
      }
    }
  }
}
```

### 3. Data Enhancement Extension

Augment observations with computed or retrieved data:

```typescript
interface DataEnhancementExtension {
  name: string;
  enhancers: {
    [key: string]: (obs: Observation) => Promise<any>;
  };
}

// Example: Fetch location name from coordinates
registerDataEnhancer({
  name: 'location-enrichment',
  enhancers: {
    reverseGeocode: async (observation) => {
      const { lat, lng } = observation.data.location;
      const response = await fetch(
        `https://api.example.com/reverse?lat=${lat}&lng=${lng}`
      );
      return {
        location_name: response.locality,
        location_admin: response.admin2,
        location_country: response.country
      };
    }
  }
});
```

## Packaging Extensions

### App Bundle Structure

Extensions are distributed as part of the app bundle:

```
app-bundle.zip
├── forms/
│   └── *.json                    # Form definitions
├── question_types/
│   ├── custom-phone-number.js
│   ├── custom-map-field.js
│   └── custom-signature.js
├── logic/
│   ├── household-validations.js
│   └── calculations.js
├── styles/
│   └── extensions.css           # Custom CSS for extensions
└── metadata.json
```

### Metadata File

Define extension metadata in `metadata.json`:

```json
{
  "version": "1.2.0",
  "description": "Custom question types for household surveys",
  "forms": ["household", "hh_person", "hh_follow_up"],
  "extensions": [
    {
      "name": "phone-number",
      "type": "question-type",
      "description": "International phone number input",
      "version": "1.0.0"
    },
    {
      "name": "location-detail",
      "type": "question-type",
      "description": "GPS with map preview",
      "version": "1.1.0"
    },
    {
      "name": "household-validations",
      "type": "business-logic",
      "description": "Validation rules for household data",
      "version": "1.0.0"
    }
  ],
  "dependencies": [
    "formulus >= 1.0.0",
    "formplayer >= 1.0.0"
  ],
  "author": "Your Organization",
  "license": "MIT"
}
```

## Deployment

### Upload App Bundle

Use the Synkronus CLI or API to deploy:

```bash
synk app-bundle upload path/to/bundle.zip
```

Or API:

```bash
curl -X PUT https://synkronus.example.com/api/v1/app-bundle \
  -H "Authorization: Bearer $TOKEN" \
  -F "bundle=@bundle.zip"
```

### Versioning

Maintain multiple versions:

```bash
# List versions
synk app-bundle list

# Activate specific version
synk app-bundle activate 1.2.0

# Previous version remains available for older clients
```

### Safe Rollback

If issues occur:

```bash
# Immediately activate previous version
synk app-bundle activate 1.1.0

# Clients will pull updated bundle on next sync
```

## Best Practices

### Design

✅ **Do:**
- Keep extensions focused and single-purpose
- Follow component composition patterns
- Reuse core Formulus components where possible
- Implement accessibility (ARIA labels, keyboard navigation)
- Support theme customization
- Validate input on every change

❌ **Don't:**
- Create monolithic extensions doing too much
- Rely on external APIs without fallbacks
- Hard-code strings (use i18n)
- Break from standard form patterns
- Ignore edge cases
- Store sensitive data locally

### Performance

- Minimize bundle size (extensions increase app size)
- Lazy load if possible
- Cache expensive computations
- Avoid blocking operations
- Test on slow networks and low-end devices

### Compatibility

- Test across devices (Android 8+, iOS 13+)
- Support multiple screen sizes
- Handle orientation changes
- Verify offline functionality
- Test with real field data

## Example Implementation

### Complete Custom Time Range Picker

```typescript
// time-range-picker.tsx

import React, { useState } from 'react';

interface TimeRange {
  start: string;  // HH:MM
  end: string;    // HH:MM
}

interface TimeRangePickerProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  label?: string;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  value,
  onChange,
  label
}) => {
  const [startTime, setStartTime] = useState(value?.start || '');
  const [endTime, setEndTime] = useState(value?.end || '');

  const handleChange = (newStart: string, newEnd: string) => {
    setStartTime(newStart);
    setEndTime(newEnd);
    onChange({ start: newStart, end: newEnd });
  };

  const isValidRange = !startTime || !endTime || startTime <= endTime;

  return (
    <div className="time-range-picker">
      {label && <label>{label}</label>}
      
      <div className="time-inputs">
        <div className="time-field">
          <label htmlFor="start">Start Time</label>
          <input
            id="start"
            type="time"
            value={startTime}
            onChange={(e) => handleChange(e.target.value, endTime)}
          />
        </div>

        <div className="separator">to</div>

        <div className="time-field">
          <label htmlFor="end">End Time</label>
          <input
            id="end"
            type="time"
            value={endTime}
            onChange={(e) => handleChange(startTime, e.target.value)}
          />
        </div>
      </div>

      {!isValidRange && (
        <div className="error">End time must be after start time</div>
      )}
    </div>
  );
};
```

Register it:

```typescript
registerExtension({
  name: 'time-range',
  renderer: TimeRangePicker,
  metadata: {
    displayName: 'Time Range',
    description: 'Select start and end times',
    version: '1.0.0'
  }
});
```

Use in form:

```json
{
  "working_hours": {
    "type": "object",
    "x-custom": {
      "type": "time-range"
    },
    "properties": {
      "start": { "type": "string" },
      "end": { "type": "string" }
    }
  }
}
```

## Development Workflow

1. **Setup** - Create React project for extension
2. **Develop** - Build and test component locally
3. **Test** - Verify in Formulus with test forms
4. **Package** - Bundle into app-bundle.zip
5. **Deploy** - Upload via CLI or API
6. **Verify** - Check deployment and monitor usage
7. **Update** - Continue improving based on feedback

## Testing Extensions

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { TimeRangePicker } from './time-range-picker';

describe('TimeRangePicker', () => {
  it('should accept time range', () => {
    const onChange = jest.fn();
    render(
      <TimeRangePicker
        value={{ start: '09:00', end: '17:00' }}
        onChange={onChange}
        label="Working Hours"
      />
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('09:00');
    expect(inputs[1]).toHaveValue('17:00');
  });

  it('should validate time range', () => {
    const { getByText } = render(
      <TimeRangePicker
        value={{ start: '17:00', end: '09:00' }}
        onChange={() => {}}
      />
    );

    expect(getByText(/End time must be after start time/)).toBeInTheDocument();
  });
});
```

### Integration Tests

Test with actual forms and the Formulus environment.

## Related Content

- [Form Design](/docs/guides/form-design) - Learn about form structure and types
- [Formplayer Reference](/docs/reference/formplayer) - Built-in question types
- [App Bundle Format](/docs/reference/app-bundle-format) - Full bundle specification
- [Deployment](/docs/guides/deployment) - Deploy to production