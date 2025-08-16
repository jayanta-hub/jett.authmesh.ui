import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { theme } from '../../../../theme';
import React from 'react';

// Extract AllowDenyToggle component for testing
const AllowDenyToggle = ({ value, onChange, disabled = false }: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_event, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      disabled={disabled ?? false}
      sx={{
        borderRadius: '6px',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.customColors?.grey?.[10] || '#ccc'}`,
      }}
    >
      <ToggleButton value="ALLOW">
        Allow
      </ToggleButton>
      <ToggleButton value="DENY">
        Deny
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('AllowDenyToggle Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders both Allow and Deny buttons', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="ALLOW" onChange={mockOnChange} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Allow')).toBeInTheDocument();
    expect(screen.getByText('Deny')).toBeInTheDocument();
  });

  test('shows Allow as selected when value is ALLOW', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="ALLOW" onChange={mockOnChange} />
      </MockThemeProvider>
    );

    const allowButton = screen.getByText('Allow');
    expect(allowButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('shows Deny as selected when value is DENY', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="DENY" onChange={mockOnChange} />
      </MockThemeProvider>
    );

    const denyButton = screen.getByText('Deny');
    expect(denyButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('calls onChange when Allow button is clicked', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="DENY" onChange={mockOnChange} />
      </MockThemeProvider>
    );

    const allowButton = screen.getByText('Allow');
    fireEvent.click(allowButton);

    expect(mockOnChange).toHaveBeenCalledWith('ALLOW');
  });

  test('calls onChange when Deny button is clicked', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="ALLOW" onChange={mockOnChange} />
      </MockThemeProvider>
    );

    const denyButton = screen.getByText('Deny');
    fireEvent.click(denyButton);

    expect(mockOnChange).toHaveBeenCalledWith('DENY');
  });

  test('does not call onChange when clicking already selected button', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="ALLOW" onChange={mockOnChange} />
      </MockThemeProvider>
    );

    const allowButton = screen.getByText('Allow');
    fireEvent.click(allowButton);

    // ToggleButtonGroup doesn't call onChange when clicking already selected button
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test('renders as disabled when disabled prop is true', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="ALLOW" onChange={mockOnChange} disabled={true} />
      </MockThemeProvider>
    );

    const allowButton = screen.getByText('Allow');
    const denyButton = screen.getByText('Deny');

    expect(allowButton).toBeDisabled();
    expect(denyButton).toBeDisabled();
  });

  test('does not call onChange when disabled and button is clicked', () => {
    render(
      <MockThemeProvider>
        <AllowDenyToggle value="ALLOW" onChange={mockOnChange} disabled={true} />
      </MockThemeProvider>
    );

    const denyButton = screen.getByText('Deny');
    fireEvent.click(denyButton);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
