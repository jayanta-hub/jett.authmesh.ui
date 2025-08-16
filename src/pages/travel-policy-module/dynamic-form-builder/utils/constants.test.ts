import { 
  DayGroupKeys, 
  DaysMapping, 
  formattedLabel, 
  LISTBOX_PADDING 
} from './constants';

describe('Constants', () => {
  describe('DayGroupKeys', () => {
    test('should contain expected day group keys', () => {
      expect(DayGroupKeys).toContain('ALL');
      expect(DayGroupKeys).toContain('WEEKDAYS');
      expect(DayGroupKeys).toContain('WEEKENDS');
    });

    test('should be an array', () => {
      expect(Array.isArray(DayGroupKeys)).toBe(true);
    });
  });

  describe('DaysMapping', () => {
    test('should map ALL to all days of the week', () => {
      expect(DaysMapping.ALL).toEqual([
        'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
      ]);
    });

    test('should map WEEKDAYS to Monday through Friday', () => {
      expect(DaysMapping.WEEKDAYS).toEqual([
        'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'
      ]);
    });

    test('should map WEEKENDS to Saturday and Sunday', () => {
      expect(DaysMapping.WEEKENDS).toEqual([
        'SATURDAY', 'SUNDAY'
      ]);
    });

    test('should have correct keys', () => {
      expect(Object.keys(DaysMapping)).toEqual(['ALL', 'WEEKDAYS', 'WEEKENDS']);
    });
  });

  describe('formattedLabel', () => {
    test('should contain expected formatted labels', () => {
      expect(formattedLabel).toContain('Arrival days');
      expect(formattedLabel).toContain('Departure days');
      expect(formattedLabel).toContain('Travel days');
      expect(formattedLabel).toContain('Booking days');
    });

    test('should be an array', () => {
      expect(Array.isArray(formattedLabel)).toBe(true);
    });

    test('should have minimum expected length', () => {
      expect(formattedLabel.length).toBeGreaterThan(0);
    });
  });

  describe('LISTBOX_PADDING', () => {
    test('should be a number', () => {
      expect(typeof LISTBOX_PADDING).toBe('number');
    });

    test('should be greater than 0', () => {
      expect(LISTBOX_PADDING).toBeGreaterThan(0);
    });
  });
});
