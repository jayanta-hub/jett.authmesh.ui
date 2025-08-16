import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TravelPolicyCard from './TravelPolicyCard';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../theme';

// Mock theme
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('TravelPolicyCard Component', () => {
  const defaultProps = {
    title: 'Test Travel Policy',
    lines: ['Applicable for: All Employees', 'Based on: Flight Fare'],
    active: true,
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders travel policy card with title and lines', () => {
    render(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Test Travel Policy')).toBeInTheDocument();
    expect(screen.getByText('Applicable for: All Employees')).toBeInTheDocument();
    expect(screen.getByText('Based on: Flight Fare')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('renders with empty lines array', () => {
    const props = { ...defaultProps, lines: [] };
    render(
      <MockThemeProvider>
        <TravelPolicyCard {...props} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Test Travel Policy')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('renders with undefined lines', () => {
    const props = { ...defaultProps, lines: undefined };
    render(
      <MockThemeProvider>
        <TravelPolicyCard {...props} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Test Travel Policy')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('renders switch in correct state based on active prop', () => {
    const { rerender } = render(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} active={true} />
      </MockThemeProvider>
    );

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();

    rerender(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} active={false} />
      </MockThemeProvider>
    );

    expect(switchElement).not.toBeChecked();
  });

  test('calls onToggle when switch is clicked', () => {
    const mockOnToggle = jest.fn();
    render(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} onToggle={mockOnToggle} />
      </MockThemeProvider>
    );

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('renders three-dot menu button', () => {
    render(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} />
      </MockThemeProvider>
    );

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  test('renders default tag with correct styling', () => {
    render(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} />
      </MockThemeProvider>
    );

    const defaultTag = screen.getByText('Default');
    expect(defaultTag).toBeInTheDocument();
    // Check for presence of the tag and its basic styling
    expect(defaultTag).toHaveStyle({
      position: 'absolute',
      transform: 'rotate(-45deg)',
    });
  });

  test('renders with HTML content in lines', () => {
    const propsWithHTML = {
      ...defaultProps,
      lines: ['<strong>Bold text</strong>', '<em>Italic text</em>'],
    };

    render(
      <MockThemeProvider>
        <TravelPolicyCard {...propsWithHTML} />
      </MockThemeProvider>
    );

    // Check that HTML is rendered (dangerouslySetInnerHTML)
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('Italic text')).toBeInTheDocument();
  });

  test('renders card with correct styling structure', () => {
    const { container } = render(
      <MockThemeProvider>
        <TravelPolicyCard {...defaultProps} />
      </MockThemeProvider>
    );

    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle({
      position: 'relative',
      borderRadius: '8px', // borderRadius: 2 = 8px in MUI
      minHeight: '180px',
    });
  });

  test('handles multiple lines correctly', () => {
    const propsWithMultipleLines = {
      ...defaultProps,
      lines: [
        'Line 1: Applicable for All Employees',
        'Line 2: Based on Flight Fare',
        'Line 3: No Approval Process selected',
        'Line 4: Additional constraint',
      ],
    };

    render(
      <MockThemeProvider>
        <TravelPolicyCard {...propsWithMultipleLines} />
      </MockThemeProvider>
    );

    propsWithMultipleLines.lines.forEach(line => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });

  test('renders without crashing when no props are provided', () => {
    render(
      <MockThemeProvider>
        <TravelPolicyCard />
      </MockThemeProvider>
    );

    // Should render with default values
    expect(screen.getByText('Active')).toBeInTheDocument();
    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).not.toBeChecked();
  });
});
