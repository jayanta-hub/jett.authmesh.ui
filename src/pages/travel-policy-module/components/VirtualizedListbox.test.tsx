import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListboxComponent, BpIcon, BpCheckedIcon } from '../dynamic-form-builder/components/VirtualizedListbox';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';
import React from 'react';

// Mock react-window
jest.mock('react-window', () => ({
  VariableSizeList: ({ children, itemData, itemCount }: any) => {
    return (
      <div data-testid="virtualized-list">
        {Array.from({ length: itemCount }).map((_, index) => 
          children({ index, style: {}, data: itemData })
        )}
      </div>
    );
  },
}));

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('VirtualizedListbox Component', () => {
  const mockProps = {
    'data-total-count': 10,
    'data-selected-count': 2,
    'data-on-select-all': jest.fn(),
    'data-on-clear': jest.fn(),
    'data-on-save': jest.fn(),
    'data-temp-selected': new Set(['item1', 'item2']),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ListboxComponent with header controls', () => {
    render(
      <MockThemeProvider>
        <ListboxComponent {...mockProps}>
          <div>Item 1</div>
          <div>Item 2</div>
        </ListboxComponent>
      </MockThemeProvider>
    );

    expect(screen.getByText('Select all 10')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Selected: 2')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('calls onSelectAll when Select All button is clicked', () => {
    render(
      <MockThemeProvider>
        <ListboxComponent {...mockProps}>
          <div>Item 1</div>
        </ListboxComponent>
      </MockThemeProvider>
    );

    const selectAllButton = screen.getByText('Select all 10');
    fireEvent.click(selectAllButton);

    expect(mockProps['data-on-select-all']).toHaveBeenCalledTimes(1);
  });

  test('calls onClear when Clear button is clicked', () => {
    render(
      <MockThemeProvider>
        <ListboxComponent {...mockProps}>
          <div>Item 1</div>
        </ListboxComponent>
      </MockThemeProvider>
    );

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(mockProps['data-on-clear']).toHaveBeenCalledTimes(1);
  });

  test('calls onSave when Save button is clicked', () => {
    render(
      <MockThemeProvider>
        <ListboxComponent {...mockProps}>
          <div>Item 1</div>
        </ListboxComponent>
      </MockThemeProvider>
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockProps['data-on-save']).toHaveBeenCalledTimes(1);
  });

  test('renders children items', () => {
    render(
      <MockThemeProvider>
        <ListboxComponent {...mockProps}>
          <div>Test Item 1</div>
          <div>Test Item 2</div>
        </ListboxComponent>
      </MockThemeProvider>
    );

    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  test('renders without header controls when not provided', () => {
    render(
      <MockThemeProvider>
        <ListboxComponent>
          <div>Item 1</div>
        </ListboxComponent>
      </MockThemeProvider>
    );

    expect(screen.getByText('Select all 0')).toBeInTheDocument();
    expect(screen.getByText('Selected: 0')).toBeInTheDocument();
  });
});

describe('Custom Checkbox Icons', () => {
  test('renders BpIcon', () => {
    const { container } = render(
      <MockThemeProvider>
        <BpIcon />
      </MockThemeProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders BpCheckedIcon', () => {
    const { container } = render(
      <MockThemeProvider>
        <BpCheckedIcon />
      </MockThemeProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
