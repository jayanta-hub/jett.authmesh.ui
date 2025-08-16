import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomCalendar } from './CustomCalendar';
import React from 'react';

describe('CustomCalendar Component', () => {
    test('renders without crashing', () => {
        render(<CustomCalendar />);
        // Check if specific calendar elements appear, assuming default behavior from DateCalendar
        expect(document.querySelector('.MuiPickersCalendarHeader-root')).toBeInTheDocument();
    });
});
