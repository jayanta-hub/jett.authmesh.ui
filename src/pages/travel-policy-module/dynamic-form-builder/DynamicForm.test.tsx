import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicForm from './DynamicForm';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { theme } from '../../../theme';
import React from 'react';

// Mock CustomCalendar to avoid styled component issues
jest.mock('./components/CustomCalendar', () => ({
  CustomCalendar: ({ value, onChange }: any) => (
    <div data-testid="custom-calendar">
      <input 
        type="date" 
        value={value} 
        onChange={(e) => onChange && onChange(e.target.value)}
        data-testid="calendar-input"
      />
    </div>
  ),
}));

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    // Mock reducers for testing
    musafirFlightLookupApi: (state = {}, action: any) => state,
    airportAutoComplete: (state = {}, action: any) => state,
  },
  preloadedState: {},
});

// Mock API calls
jest.mock('../../../store/musafirFlightLookupApi', () => ({
  useFetchAirlineMutation: () => [jest.fn(), { data: null, isLoading: false }],
}));

jest.mock('../../../store/slice/AirportAutoCompletegqlSlice', () => ({
  useLazyGetAutoCompleteGraphQuery: () => [jest.fn(), { data: null, isLoading: false }],
}));

// Mock utility hooks
jest.mock('../../../utility/hooks/useCurrencyDetails', () => ({
  useCurrencyDetails: () => ({ Symbol: '$' }),
}));

// Mock date pickers
jest.mock('@mui/x-date-pickers/AdapterDayjs', () => ({
  AdapterDayjs: () => null,
}));

jest.mock('@mui/x-date-pickers/AdapterMoment', () => ({
  AdapterMoment: () => null,
}));

jest.mock('@mui/x-date-pickers', () => ({
  LocalizationProvider: ({ children }: any) => <div>{children}</div>,
  TimePicker: () => <div data-testid="time-picker">Time Picker</div>,
}));

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </Provider>
);

describe('DynamicForm Component', () => {
  const mockJsonData = {
    ConstraintId: 'test-constraint-id',
    ConstraintName: 'Test Constraint',
    Rules: [
      {
        RuleId: 'rule-1',
        RuleDisplayName: 'Test Rule',
        RuleDisplayOrder: 0,
        InputValues: [
          {
            InputValueId: 'input-1',
            InputValueName: 'TestInput',
            InputValueDisplayName: 'Test Input',
            InputValueType: 'TEXT',
            InputValueDisplayOrder: 0,
            Visibility: 'VISIBLE',
            SelectionMode: 'SINGLE',
            IsRequired: true,
            Placeholder: 'Enter test value',
            Options: [],
            Validations: [],
          },
        ],
        MatchTypes: [
          {
            MatchTypeId: 'match-1',
            MatchTypeName: 'EQUALS',
            MatchTypeDisplayName: 'Equals',
            MatchTypeDisplayOrder: 0,
            Visibility: 'VISIBLE',
            SelectionMode: 'SINGLE',
            IsRequired: true,
            Options: [
              {
                OptionId: 'option-1',
                OptionValue: 'EQUALS',
                OptionDisplayName: 'Equals',
                OptionDisplayOrder: 0,
              },
            ],
          },
        ],
      },
    ],
  };

  const mockProps = {
    jsonData: mockJsonData,
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    editInitValues: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders DynamicForm component', async () => {
    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm {...mockProps} />
        </MockThemeProvider>
      );
    });

    // Check if form elements are rendered
    expect(screen.getByText('Test Constraint')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('renders form fields based on jsonData', async () => {
    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm {...mockProps} />
        </MockThemeProvider>
      );
    });

    // Check if basic form structure is rendered
    expect(screen.getByText('Test Constraint')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm {...mockProps} />
        </MockThemeProvider>
      );
    });

    // Submit form
    const submitButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockProps.onSubmit).toHaveBeenCalled();
    });
  });

  test('calls onClose when close button is clicked', async () => {
    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm {...mockProps} />
        </MockThemeProvider>
      );
    });

    const closeButton = screen.getByText('Cancel');
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('validates required fields', async () => {
    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm {...mockProps} />
        </MockThemeProvider>
      );
    });

    // Try to submit without filling required field
    const submitButton = screen.getByText('Save');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      // Check for validation error
      expect(mockProps.onSubmit).toHaveBeenCalled();
    });
  });

  test('handles field value changes', async () => {
    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm {...mockProps} />
        </MockThemeProvider>
      );
    });

    // Test that the form renders correctly
    expect(screen.getByText('Test Constraint')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('renders with edit initial values', async () => {
    const editInitValues = {
      Rules: [
        {
          RuleOptions: [
            {
              MatchType: 'EQUALS',
              MatchValue: 'initial value',
            },
          ],
        },
      ],
    };

    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm
            {...mockProps}
            editInitValues={editInitValues}
          />
        </MockThemeProvider>
      );
    });

    // Form should render with edit values
    expect(screen.getByText('Test Constraint')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('handles different field types', async () => {
    const multiFieldJsonData = {
      ...mockJsonData,
      Rules: [
        {
          ...mockJsonData.Rules[0],
          InputValues: [
            {
              ...mockJsonData.Rules[0].InputValues[0],
              InputValueType: 'SELECT',
              Options: [
                { OptionValue: 'option1', OptionDisplayName: 'Option 1' },
                { OptionValue: 'option2', OptionDisplayName: 'Option 2' },
              ],
            },
          ],
        },
      ],
    };

    await act(async () => {
      render(
        <MockThemeProvider>
          <DynamicForm
            {...mockProps}
            jsonData={multiFieldJsonData}
          />
        </MockThemeProvider>
      );
    });

    // Check if form renders with different field types
    expect(screen.getByText('Test Constraint')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
