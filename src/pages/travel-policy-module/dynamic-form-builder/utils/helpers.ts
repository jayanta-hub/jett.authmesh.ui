import { FieldConfig } from '../../../../utility/types/dynamic-form/DynamicForm';

export function toPascalCaseWithSuffix(str: string) {
    // Remove 'Value' if already present (idempotent)
    str = str.replace(/Value$/i, '');

    // Split by underscore, capitalize each word, then join
    return str
        .toLowerCase()
        .split('_')
        .map((word, index) => {
            // Skip "THE" to avoid unnecessary capitalization
            if (word === 'the') return '';
            // Capitalize first letter of each word
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .filter(Boolean) // Remove empty strings (e.g., from "the")
        .join('') + 'Value'; // Append "Value" at the end
}

export const formatLabel = (label: string) => {
    return label?.split('_')?.join(' ')?.toLowerCase()?.replace(/^./, match => match?.toUpperCase());
};

export function removeApiVersion(path: string) {
    if (!path || typeof path !== 'string') return '';
    return path.replace(/^\/api\/v1\//, '');
}

export const removeEmptyMatchValue = (rules: any[]) => {
    return rules?.map(rule => ({
        ...rule,
        RuleOptions: rule.RuleOptions.filter((option: any) => option.MatchValue !== "")
    }))?.filter(rule => rule.RuleOptions.length > 0); // Optionally remove rules with no valid options
};

// Helper to filter fields for rendering based on parentFieldName and current values
export function shouldRenderField(field: FieldConfig, values: Record<string, unknown>): boolean {
    if (!('parentFieldName' in field) || !field.parentFieldName || typeof field.parentFieldName !== 'string') return true;
    const parentFieldNameStr = typeof field.parentFieldName === 'string' ? field.parentFieldName : '';
    const underscoreIndex = parentFieldNameStr.indexOf('_');
    const parentField = parentFieldNameStr.substring(0, underscoreIndex);
    const inputValueNames = parentFieldNameStr.substring(underscoreIndex + 1).split('|');
    const parentValue = values[parentField];
    const normalize = (str: string) => (str ?? '').replace(/\s+/g, '_').toUpperCase();
    if (Array.isArray(parentValue)) {
        return inputValueNames.some(inputValueName => (parentValue as string[]).some((val) => normalize(val) === normalize(inputValueName)));
    } else if (typeof parentValue === 'string') {
        return inputValueNames.some(inputValueName => normalize(parentValue) === normalize(inputValueName));
    }
    return false;
}

export const getFieldKey = (field: FieldConfig) =>
    `${field.ruleId}-${field.matchTypeField.name}-${field.valueField.name}`;

export const getMaxLength = (field: FieldConfig) => {
    for (const validation of field?.valueField?.validations ?? []) {
        if (validation.type === 'maxLength') {
            return validation.value;
        }
    }
    return null;
};
