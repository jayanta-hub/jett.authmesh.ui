import { SchemaType } from '../../../../utility/types/dynamic-form/DynamicForm';
import * as Yup from 'yup';
import moment from 'moment';

const YupSchemaMap: { [key: string]: SchemaType } = {
    text: Yup.string(),
    currency: Yup.string(),
    number: Yup.string(),
    kilograms: Yup.string(),
    percentage: Yup.string(),
    select: Yup.string(),
    radio: Yup.string(),
    checkbox: Yup.array().of(Yup.string()),
    date: Yup.string(),
    time: Yup.string()
};

// Create Validation Schema
export const createValidationSchema = (fields: any[], matchTypes: { [key: string]: string }, values: Record<string, unknown>) => {
    const shape: Record<string, any> = {};
    fields.forEach((field) => {
        // If this is a subrule, check if its parent InputValue is selected
        if (field.parentFieldName) {
            const [parentField, inputValueNamesRaw] = field.parentFieldName.split('_');
            const inputValueNames = inputValueNamesRaw.split('|');
            const parentValue = values[parentField];
            const normalize = (str: string) => (str ?? '').replace(/\s+/g, '_').toUpperCase();
            if (Array.isArray(parentValue)) {
                if (!inputValueNames.some(inputValueName => (parentValue as string[]).some((val) => normalize(val) === normalize(inputValueName)))) return;
            } else if (typeof parentValue === 'string') {
                if (!inputValueNames.some(inputValueName => normalize(parentValue) === normalize(inputValueName))) return;
            } else {
                return;
            }
        }
        
        // Check if this is a days-related field
        const isDaysField = [
            'bookingday', 'arrivaldays', 'departuredays', 'traveldays', 'days'
        ]?.some(k => field?.matchTypeField?.name?.toLowerCase()?.includes(k?.toLowerCase()));

        // Validation for matchTypeField (select, checkbox, etc.)
        let matchTypeValidator;

        // Extend validation to all checkbox fields with multiple selection mode
        const isCheckboxMultiple = field.valueField.type?.toLowerCase() === "checkbox" && field.valueField.selectionMode?.toLowerCase() === "multiple";
        if (isDaysField || isCheckboxMultiple) {
            // For days fields and other checkbox multiple fields, always use array validation since they're handled as checkboxes
            matchTypeValidator = YupSchemaMap.checkbox;
        } else {
            matchTypeValidator = field.matchTypeField.selectionMode?.toLowerCase() === "multiple" ? YupSchemaMap.checkbox : YupSchemaMap[field.matchTypeField.type.toLowerCase()];
        }

        if (matchTypeValidator && 'nullable' in matchTypeValidator) {
            if (field.matchTypeField.isRequired) {
                if (isDaysField || (field.matchTypeField.selectionMode && field.matchTypeField.selectionMode.toLowerCase() === 'multiple')) {
                    // For days fields or multi-select/checkbox, require at least one selection
                    matchTypeValidator = (matchTypeValidator as Yup.ArraySchema<string, object, string[], object>).min(1, `${field.matchTypeField.label} is required`);
                } else if ('required' in matchTypeValidator) {
                    matchTypeValidator = (matchTypeValidator as Yup.StringSchema<string | undefined, object>).required(`${field.matchTypeField.label} is required`);
                }
            }
            shape[field.matchTypeField.name] = matchTypeValidator.nullable();
        } else {
            console.warn(`Unknown matchTypeField type: ${field.matchTypeField.type} for field: ${field.matchTypeField.name}. Skipping validation.`);
        }
        
        // Validation for valueField (text, checkbox, etc.)
        let valueValidator = field.valueField.selectionMode?.toLowerCase() === "multiple" ? YupSchemaMap.checkbox : YupSchemaMap[field.valueField.type.toLowerCase()];
        
        // Ensure we have a validator for all field types
        if (!valueValidator) {
            valueValidator = YupSchemaMap[field.valueField.type?.toLowerCase()] || Yup.string();
        }
        
        if (valueValidator && 'nullable' in valueValidator) {
            if (field.valueField.isRequired) {
                if (field.valueField.selectionMode && field.valueField.selectionMode.toLowerCase() === 'multiple') {
                    // For multi-select/checkbox, require at least one selection
                    valueValidator = (valueValidator as Yup.ArraySchema<string, object, string[], object>).min(1, `${field.valueField.label} is required`);
                } else if ('required' in valueValidator) {
                    valueValidator = (valueValidator as Yup.StringSchema<string | undefined, object>).required(`${field.valueField.label} is required`);
                }
            }
            
            // validation for EndTimeValue
            if ((field.valueField.name === 'TimeEndTimeValue' || field.valueField.name.includes('EndTimeValue'))) {
                if (valueValidator && 'test' in valueValidator) {
                    valueValidator = valueValidator.test(
                        'endTime-after-startTime',
                        'End time cannot be before start time.',
                        (endTimeValue: unknown, context: Yup.TestContext<unknown>) => {
                            const endTimeStr = typeof endTimeValue === 'string' ? endTimeValue : '';
                            const startTimeValue = context.parent?.TimeStartTimeValue;
                            const startTimeStr = typeof startTimeValue === 'string' ? startTimeValue : '';
                            if (!endTimeStr || !startTimeStr) return true;
                            const endTime = moment(endTimeStr, 'HH:mm', true);
                            const startTime = moment(startTimeStr, 'HH:mm', true);
                            if (!endTime.isValid() || !startTime.isValid()) return true;
                            const endInMs = endTime.hours() * 60 + endTime.minutes();
                            const startInMs = startTime.hours() * 60 + startTime.minutes();
                            return endInMs >= startInMs;
                        }
                    );
                }
            }

            // StartDateValue validation - check for past dates
            if ((field.valueField.name === 'DateStartDateValue' || field.valueField.name.includes('StartDateValue'))) {
                if (valueValidator && 'test' in valueValidator) {
                    valueValidator = valueValidator.test(
                        'startDate-not-in-past',
                        'Start date cannot be in the past.',
                        (startDateValue: string) => {
                            if (!startDateValue) return true;

                            // Try multiple date formats
                            let startDate = moment(startDateValue, 'DD/MM/YY', true);
                            if (!startDate.isValid()) {
                                startDate = moment(startDateValue, 'DD/MM/YYYY', true);
                            }
                            if (!startDate.isValid()) {
                                startDate = moment(startDateValue, 'YYYY-MM-DD', true);
                            }
                            if (!startDate.isValid()) {
                                return true; // If we can't parse the date, don't validate
                            }
                            const today = moment().startOf('day');
                            return !startDate.isBefore(today);
                        }
                    );
                }
            }

            // validation for EndDate > StartDate
            if ((field.valueField.name === 'DateEndDateValue' || field.valueField.name.includes('EndDateValue'))) {
                if (valueValidator && 'test' in valueValidator) {
                    valueValidator = valueValidator.test(
                        'endDate-not-in-past',
                        'End date cannot be in the past.',
                        (endDateValue: string) => {
                            if (!endDateValue) return true;
                            const endDate = moment(endDateValue, 'DD/MM/YY', true);
                            if (!endDate.isValid()) return true;
                            return !endDate.isBefore(moment().startOf('day'));
                        }
                    )
                    valueValidator = valueValidator.test('endDate-after-startDate', 'End date cannot be before start date.',
                        (endDateValue: string, context: Yup.TestContext<unknown>) => {
                            const startDateValue = context.parent?.DateStartDateValue;
                            const endDate = moment(endDateValue, 'DD/MM/YY', true);
                            const startDate = moment(startDateValue, 'DD/MM/YY', true);
                            if (!endDate.isValid() || !startDate.isValid()) return true;
                            return !endDate.isBefore(startDate);
                        }
                    )
                }
            }

            // Enhanced date validation based on match type
            if ((field.valueField.type === 'time' || field.valueField.type === 'date') && field.valueField.validations) {
                const matchTypeFieldName = field.matchTypeField.name;
                const matchType = matchTypes[matchTypeFieldName] || '';
                
                // Find the relevant validation based on match type
                const relevantValidation = field.valueField.validations.find((v) => {
                    const validationType = v.type.replace(/_REGEX$/, '');
                    return validationType === matchType;
                });
                
                if (relevantValidation && typeof relevantValidation.value === 'string' && relevantValidation.value.trim() !== '') {
                    try {
                        // Create regex pattern from the validation value
                        const regexPattern = new RegExp(relevantValidation.value);
                        // Apply the regex validation with custom test function
                        if (valueValidator && 'test' in valueValidator) {
                            valueValidator = valueValidator.test(
                                `regex-validation-${matchType}`,
                                relevantValidation.comment || 'Invalid format',
                                (value: string) => {
                                    if (!value) return true; // Skip validation if empty (handled by required validation)
                                    // For MATCHES_REGEX type, allow any input as it's user-defined
                                    if (matchType === 'MATCHES_REGEX') {
                                        return true;
                                    }
                                    // For other types, apply the regex validation
                                    return regexPattern.test(value);
                                }
                            );
                        }
                    } catch (error) {
                        console.warn(`Invalid regex pattern for ${matchType}: ${relevantValidation.value}`, error);
                    }
                }
                
                // Apply common validation (e.g., max length)
                field.valueField.validations?.forEach((validation) => {
                    if (validation.type === 'maxLength') {
                        valueValidator = valueValidator.max(Number(validation.value), validation.message);
                    }
                });
            }

            // Handle common validation for text-based fields
            const ElementType = ["text", "currency", "number", "kilograms", "percentage"]
            if (ElementType?.includes(field.valueField.type?.toLowerCase())) {
                // Ensure valueValidator is initialized for these field types
                if (!valueValidator) {
                    valueValidator = YupSchemaMap[field.valueField.type?.toLowerCase()] || Yup.string();
                }

                if (field.valueField?.CommonValidation && field.valueField?.CommonValidation?.RuleType === 'REGEX') {
                    if (valueValidator) {
                        valueValidator = (valueValidator as Yup.StringSchema<string | undefined, object>).matches(new RegExp(field.valueField?.CommonValidation?.RuleValues?.[0]), field.valueField?.CommonValidation?.Message);
                    }
                }
                if (field.valueField.isRequired) {
                    valueValidator = (valueValidator as Yup.StringSchema<string | undefined, object>)?.required(`${field.valueField.label} is required`);
                }
            }
            
            // Assign the final validator to shape
            shape[field.valueField.name] = valueValidator.nullable();
        } else {
            console.warn(`Unknown valueField type: ${field.valueField.type} for field: ${field.matchTypeField.name}. Skipping validation.`);
        }
    });
    return Yup.object().shape(shape);
};

export default createValidationSchema;

