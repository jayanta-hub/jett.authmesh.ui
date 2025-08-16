import {
  toPascalCaseWithSuffix,
  formatLabel,
  removeApiVersion,
  removeEmptyMatchValue,
  shouldRenderField,
  getFieldKey,
  getMaxLength,
} from './helpers';
import { FieldConfig } from '../../../../utility/types/dynamic-form/DynamicForm';

describe('Helper Functions', () => {
  describe('toPascalCaseWithSuffix', () => {
    test('converts underscore-separated string to PascalCase with Value suffix', () => {
      expect(toPascalCaseWithSuffix('test_string')).toBe('TestStringValue');
      expect(toPascalCaseWithSuffix('another_test_case')).toBe('AnotherTestCaseValue');
    });

    test('handles strings that already have Value suffix', () => {
      expect(toPascalCaseWithSuffix('testValue')).toBe('TestValue');
      expect(toPascalCaseWithSuffix('test_stringValue')).toBe('TestStringValue');
    });

    test('filters out "the" from string', () => {
      expect(toPascalCaseWithSuffix('the_test_string')).toBe('TestStringValue');
    });

    test('handles empty string', () => {
      expect(toPascalCaseWithSuffix('')).toBe('Value');
    });
  });

  describe('formatLabel', () => {
    test('formats underscore-separated string to title case', () => {
      expect(formatLabel('test_label')).toBe('Test label');
      expect(formatLabel('another_test_case')).toBe('Another test case');
    });

    test('handles single word', () => {
      expect(formatLabel('test')).toBe('Test');
    });

    test('handles empty string', () => {
      expect(formatLabel('')).toBe('');
    });
  });

  describe('removeApiVersion', () => {
    test('removes /api/v1 prefix from path', () => {
      expect(removeApiVersion('/api/v1/endpoint')).toBe('/endpoint');
      expect(removeApiVersion('/api/v1/nested/endpoint')).toBe('/nested/endpoint');
    });

    test('returns unchanged path if no /api/v1 prefix', () => {
      expect(removeApiVersion('/endpoint')).toBe('/endpoint');
      expect(removeApiVersion('/api/v2/endpoint')).toBe('/api/v2/endpoint');
    });

    test('handles empty or invalid input', () => {
      expect(removeApiVersion('')).toBe('');
      expect(removeApiVersion(null as any)).toBe('');
      expect(removeApiVersion(undefined as any)).toBe('');
    });
  });

  describe('removeEmptyMatchValue', () => {
    test('filters out rules with empty MatchValue', () => {
      const rules = [
        {
          RuleId: 'rule1',
          RuleOptions: [
            { MatchType: 'EQUALS', MatchValue: 'value1' },
            { MatchType: 'CONTAINS', MatchValue: '' },
            { MatchType: 'STARTS_WITH', MatchValue: 'value2' },
          ],
        },
        {
          RuleId: 'rule2',
          RuleOptions: [
            { MatchType: 'EQUALS', MatchValue: '' },
          ],
        },
      ];

      const result = removeEmptyMatchValue(rules);
      
      expect(result).toHaveLength(1);
      expect(result[0].RuleOptions).toHaveLength(2);
      expect(result[0].RuleOptions[0].MatchValue).toBe('value1');
      expect(result[0].RuleOptions[1].MatchValue).toBe('value2');
    });

    test('handles empty rules array', () => {
      expect(removeEmptyMatchValue([])).toEqual([]);
    });
  });

  describe('shouldRenderField', () => {
    const mockField: FieldConfig = {
      ruleId: 'rule1',
      ruleDisplayName: 'Test Rule',
      matchTypeField: {
        name: 'matchType',
        type: 'select',
        label: 'Match Type',
        options: [],
        Visibility: 'VISIBLE',
        selectionMode: 'SINGLE',
        isRequired: true,
      },
      valueField: {
        name: 'value',
        type: 'text',
        label: 'Value',
        placeholder: 'Enter value',
        options: [],
        Visibility: 'VISIBLE',
        selectionMode: 'SINGLE',
        isRequired: true,
        validations: [],
      },
      parentFieldName: 'parentField_option1|option2',
    };

    test('returns true for field without parentFieldName', () => {
      const fieldWithoutParent = { ...mockField };
      delete (fieldWithoutParent as any).parentFieldName;
      
      expect(shouldRenderField(fieldWithoutParent, {})).toBe(true);
    });

    test('returns true when parent field value matches', () => {
      const values = { parentField: 'option1' };
      expect(shouldRenderField(mockField, values)).toBe(true);
    });

    test('returns false when parent field value does not match', () => {
      const values = { parentField: 'option3' };
      expect(shouldRenderField(mockField, values)).toBe(false);
    });

    test('handles array parent values', () => {
      const values = { parentField: ['option1', 'option3'] };
      expect(shouldRenderField(mockField, values)).toBe(true);
    });

    test('returns false when parent field is undefined', () => {
      const values = {};
      expect(shouldRenderField(mockField, values)).toBe(false);
    });
  });

  describe('getFieldKey', () => {
    test('generates unique key for field', () => {
      const field: FieldConfig = {
        ruleId: 'rule1',
        ruleDisplayName: 'Test Rule',
        matchTypeField: {
          name: 'matchType',
          type: 'select',
          label: 'Match Type',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
        },
        valueField: {
          name: 'value',
          type: 'text',
          label: 'Value',
          placeholder: 'Enter value',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
          validations: [],
        },
      };

      expect(getFieldKey(field)).toBe('rule1-matchType-value');
    });
  });

  describe('getMaxLength', () => {
    test('returns maxLength validation value', () => {
      const field: FieldConfig = {
        ruleId: 'rule1',
        ruleDisplayName: 'Test Rule',
        matchTypeField: {
          name: 'matchType',
          type: 'select',
          label: 'Match Type',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
        },
        valueField: {
          name: 'value',
          type: 'text',
          label: 'Value',
          placeholder: 'Enter value',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
          validations: [
            { type: 'required', value: true, comment: 'Field is required' },
            { type: 'maxLength', value: 50, comment: 'Maximum 50 characters' },
          ],
        },
      };

      expect(getMaxLength(field)).toBe(50);
    });

    test('returns null when no maxLength validation', () => {
      const field: FieldConfig = {
        ruleId: 'rule1',
        ruleDisplayName: 'Test Rule',
        matchTypeField: {
          name: 'matchType',
          type: 'select',
          label: 'Match Type',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
        },
        valueField: {
          name: 'value',
          type: 'text',
          label: 'Value',
          placeholder: 'Enter value',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
          validations: [
            { type: 'required', value: true, comment: 'Field is required' },
          ],
        },
      };

      expect(getMaxLength(field)).toBe(null);
    });

    test('returns null when no validations', () => {
      const field: FieldConfig = {
        ruleId: 'rule1',
        ruleDisplayName: 'Test Rule',
        matchTypeField: {
          name: 'matchType',
          type: 'select',
          label: 'Match Type',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
        },
        valueField: {
          name: 'value',
          type: 'text',
          label: 'Value',
          placeholder: 'Enter value',
          options: [],
          Visibility: 'VISIBLE',
          selectionMode: 'SINGLE',
          isRequired: true,
          validations: [],
        },
      };

      expect(getMaxLength(field)).toBe(null);
    });
  });
});
