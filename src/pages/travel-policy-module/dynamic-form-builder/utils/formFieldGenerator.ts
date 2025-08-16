import { BaseFieldConfig, FieldConfig, JsonData, MUIStyle } from '../../../../utility/types/dynamic-form/DynamicForm';

// Generate Form Fields from JSON
export function generateFormFields(
    jsonData: JsonData,
    parentFieldName?: string,
    parentMeta?: { ConstraintId?: string; ConstraintName?: string; BucketName?: string }
): FieldConfig[] {
    const constraintId = jsonData?.ConstraintId || parentMeta?.ConstraintId;
    const constraintName = jsonData?.ConstraintName || parentMeta?.ConstraintName;
    const bucketName = jsonData?.BucketName || parentMeta?.BucketName;
    const fields: FieldConfig[] = [];

    jsonData?.ConstraintRules?.forEach((rule) => {
        // Defensive: skip if no Rule or ValueType
        if (!rule?.Rule || !rule?.Rule?.ValueType || !rule?.Rule?.MatchType) return;
        const ruleDataMatchType = rule?.Rule?.MatchType;
        const ruleDataValueField = rule?.Rule?.ValueType;
        const matchTypeFieldName = `${rule?.Rule?.RuleName}${rule?.RuleDisplayName?.replace(/\s+/g, '')}${ruleDataMatchType?.Label?.replace(/\s+/g, '')}`;
        const valueFieldName = `${rule?.Rule?.RuleName}${rule?.RuleDisplayName?.replace(/\s+/g, '')}${ruleDataValueField?.Label?.replace(/\s+/g, '')}`;

        // Create matchTypeField (select)
        const matchTypeField: BaseFieldConfig = {
            type: ruleDataMatchType?.ElementType?.toLowerCase(),
            name: matchTypeFieldName,
            label: ruleDataMatchType?.Label,
            placeholder: ruleDataMatchType?.Placeholder || 'Select value',
            isRequired: rule?.Required,
            selectionMode: ruleDataMatchType?.SelectionMode,
            RuleDisplayOrder: rule?.RuleDisplayOrder,
            Visibility: ruleDataMatchType?.Visibility,
            RuleName: rule?.Rule?.RuleName,
            styles: {
                label: { marginBottom: '5px' },
                select: { marginBottom: '10px', width: '100%' } as MUIStyle,
                error: { color: 'red', fontSize: '12px' },
            },
            options: ruleDataMatchType?.InputValues?.map((val) => ({
                label: val?.DisplayName,
                value: val?.Name,
                hint: val?.Hint,
            })),
        };

        // Create valueField (text)
        const valueField: BaseFieldConfig = {
            type: ruleDataValueField?.ElementType?.toLowerCase(),
            name: valueFieldName,
            label: ruleDataValueField?.Label,
            placeholder: ruleDataValueField?.Placeholder || 'Enter value',
            isRequired: rule?.Required,
            selectionMode: ruleDataValueField?.SelectionMode,
            RuleDisplayOrder: rule?.RuleDisplayOrder,
            Visibility: ruleDataValueField?.Visibility,
            RuleName: rule?.Rule?.RuleName,
            styles: {
                label: { marginBottom: '5px' },
                input: { marginBottom: '10px', width: '100%' } as MUIStyle,
                error: { color: 'red', fontSize: '12px' },
            },
            validations: [],
            CommonValidation: {
                RuleType: rule?.Rule?.CommonValidation?.RuleType,
                RuleValues: rule?.Rule?.CommonValidation?.RuleValues,
                Message: rule?.Rule?.CommonValidation?.Message,
                Comment: rule?.Rule?.CommonValidation?.Comment,
            },
            options: ruleDataValueField?.InputValues?.map((val) => ({
                label: val?.DisplayName,
                value: val?.Name,
                hint: val?.Hint,
            })),
            url: ruleDataValueField?.Url
        };

        // Add validations for valueField (text)
        if (rule?.Rule?.CommonValidation && rule?.Rule?.CommonValidation?.RuleType === 'Char_Limit') {
            valueField?.validations?.push({
                type: 'maxLength',
                value: Number(rule?.Rule?.CommonValidation?.RuleValues?.[0]),
                message: rule?.Rule?.CommonValidation?.Message,
                comment: rule?.Rule?.CommonValidation?.Comment,
            });
        }

        // Specific validations based on match type
        rule?.Rule?.Validations?.forEach((val) => {
            val?.Conditions?.forEach((condition) => {
                if (condition?.RuleType === 'REGEX') {
                    valueField?.validations?.push({
                        type: val?.InputValidationKey,
                        value: condition?.RuleValues[0],
                        message: condition?.Message,
                        comment: condition?.Comment,
                    });
                }
            });
        });

        // Combine into a single FieldConfig object
        const field: FieldConfig = {
            ruleId: rule?.Rule?.RuleId,
            ruleDisplayName: rule?.RuleDisplayName,
            matchTypeField,
            valueField,
            parentFieldName, // Track parent for conditional rendering
        };
        fields?.push(field);

        // --- SHARED SUBRULE LOGIC START ---
        // Collect all subrules and the parent inputValue names that reference them
        const subruleMap: Record<string, { subRule: JsonData['ConstraintRules'][number], parentInputNames: string[] }> = {};
        rule?.Rule?.ValueType?.InputValues?.forEach((inputValue: { Name: string; SubRules?: JsonData['ConstraintRules'][number][] }) => {

            if ('SubRules' in inputValue && Array.isArray(inputValue.SubRules) && inputValue.SubRules.length > 0) {
                (inputValue.SubRules as JsonData['ConstraintRules'][number][]).forEach((subRule) => {
                    if (!subRule?.Rule || !subRule?.Rule?.ValueType || !subRule?.Rule?.MatchType) return;
                    const subRuleId = subRule?.Rule?.RuleId;
                    if (!subruleMap[subRuleId]) {
                        subruleMap[subRuleId] = { subRule, parentInputNames: [] };
                    }
                    subruleMap[subRuleId].parentInputNames.push(inputValue.Name);
                });
            }
        });

        // For each unique subrule, generate a single field with all parent options
        Object.values(subruleMap).forEach(({ subRule, parentInputNames }) => {
            const subRuleJson: JsonData = {
                ConstraintId: constraintId,
                ConstraintName: constraintName,
                BucketName: bucketName,
                ConstraintRules: [subRule],
            };
            // Create parentFieldName that includes all parent options separated by |
            const parentFieldForSubRule = `${matchTypeField.name}_${parentInputNames.join('|')}`;
            const subFields = generateFormFields(
                subRuleJson,
                parentFieldForSubRule,
                { ConstraintId: constraintId, ConstraintName: constraintName, BucketName: bucketName },
            );
            if (Array.isArray(subFields)) {
                fields.push(...subFields);
            }
        });
        // --- SHARED SUBRULE LOGIC END ---
    });
    return fields;
}
