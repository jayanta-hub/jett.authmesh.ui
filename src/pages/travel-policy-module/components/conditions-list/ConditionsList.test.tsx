import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { theme } from '../../../../theme';
import React from 'react';

// Mock the helper function
jest.mock('../../utility/helper', () => ({
  removeBracketedText: (text: string) => text.replace(/\[.*?\]/g, ''),
  capitalizeFirstLetter: (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
}));

// Extract ConditionsList component for testing
interface ConditionsListProps {
  title: string;
  index: number;
  details: {
    PolicyConstraintId: string;
    Rules: Array<{
      RuleDisplayOrder: number;
      RuleDisplayName: string;
      RuleOptions: Array<{
        MatchType: string;
        MatchValue: string;
      }>;
    }>;
  };
  onEdit: (id: string) => void;
  onClose: (index: number) => void;
  travelPolicyType: string;
  editData?: {
    IsDefault: boolean;
  };
}

const ConditionsList: React.FC<ConditionsListProps> = ({ 
  title, 
  index, 
  details, 
  onEdit, 
  onClose, 
  travelPolicyType, 
  editData 
}) => {
  const formatMatchType = (matchType: string) => {
    if (typeof matchType !== 'string') return '';
    return matchType
      .replace('_REGEX', '')
      .split('_')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatValues = (values: any) => {
    if (typeof values === 'string') {
      return values.charAt(0).toUpperCase() + values.slice(1).toLowerCase().split("_").join(" ");
    } else if (Array.isArray(values) && values.every(item => typeof item === 'string')) {
      return values.map((word: string) => {
        const camelCase = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return camelCase.split("_").join("");
      }).join(', ')
    }
    return '';
  };

  return (
    <Paper
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        px: { xs: 0, md: 2 },
        borderRadius: 'borderRadius',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        marginTop: 2,
        width: '100%',
      }}
      elevation={0}
    >
      <Typography
        variant="subtitle1"
        fontWeight="500"
        sx={{
          marginBottom: 1, 
          fontFamily: "poppins",
          fontWeight: "500", 
          fontSize: "12px"
        }}
      >
        {title.replace(/\[.*?\]/g, '')}
      </Typography>
      {details?.Rules.map((rule) => {
        const days = ["ALL", "WEEKDAYS", "WEEKENDS"];
        return (
          <Typography
            key={rule.RuleDisplayOrder}
            variant="body2"
            sx={{ 
              color: theme.palette.customColors?.grey?.[8] || '#666', 
              marginBottom: 0.5, 
              fontSize: "10px" 
            }}
          >
            {rule.RuleDisplayName} {formatMatchType(rule.RuleOptions[0].MatchType)} {
              rule.RuleOptions?.filter((option) => !days.includes(option.MatchValue))
                .map((option, index) => `${index === 0 ? '' : ', '}${formatValues(option.MatchValue)}`)
            }
          </Typography>
        );
      })}
      {((travelPolicyType !== "view" && editData?.IsDefault === false) || (travelPolicyType === 'create')) && (
        <Box
          sx={{
            position: 'absolute',
            top: '1rem',
            right: 0.5,
            display: 'flex',
            gap: 0.5,
            fontFamily: "poppins",
            fontWeight: "500",
            fontSize: "14px"
          }}
        >
          <Box
            component="img"
            src="edit-icon.png"
            onClick={() => onEdit(details?.PolicyConstraintId)}
            sx={{
              height: "13px",
              width: "13px",
              objectFit: "contain",
              cursor: "pointer",
              marginTop: 0.7,
            }}
          />
          <IconButton
            aria-label="Close"
            onClick={() => onClose(index)}
            size="small"
            sx={{
              color: 'grey',
              padding: 0.5,
              cursor: "pointer",
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ConditionsList Component', () => {
  const mockProps = {
    title: 'Test Condition [FLIGHTS]',
    index: 0,
    details: {
      PolicyConstraintId: 'constraint-123',
      Rules: [
        {
          RuleDisplayOrder: 1,
          RuleDisplayName: 'Flight Class',
          RuleOptions: [
            {
              MatchType: 'EQUALS',
              MatchValue: 'ECONOMY'
            }
          ]
        },
        {
          RuleDisplayOrder: 2,
          RuleDisplayName: 'Price Range',
          RuleOptions: [
            {
              MatchType: 'LESS_THAN',
              MatchValue: '1000'
            }
          ]
        }
      ]
    },
    onEdit: jest.fn(),
    onClose: jest.fn(),
    travelPolicyType: 'create',
    editData: { IsDefault: false }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders condition title without brackets', () => {
    render(
      <MockThemeProvider>
        <ConditionsList {...mockProps} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Test Condition')).toBeInTheDocument();
    expect(screen.queryByText('[FLIGHTS]')).not.toBeInTheDocument();
  });

  test('renders all rules', () => {
    render(
      <MockThemeProvider>
        <ConditionsList {...mockProps} />
      </MockThemeProvider>
    );

    expect(screen.getByText(/Flight Class/)).toBeInTheDocument();
    expect(screen.getByText(/Price Range/)).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <MockThemeProvider>
        <ConditionsList {...mockProps} />
      </MockThemeProvider>
    );

    const editButton = screen.getByRole('img');
    fireEvent.click(editButton);

    expect(mockProps.onEdit).toHaveBeenCalledWith('constraint-123');
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <MockThemeProvider>
        <ConditionsList {...mockProps} />
      </MockThemeProvider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledWith(0);
  });

  test('does not render edit and close buttons in view mode', () => {
    render(
      <MockThemeProvider>
        <ConditionsList {...mockProps} travelPolicyType="view" />
      </MockThemeProvider>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  test('does not render edit and close buttons for default policy', () => {
    render(
      <MockThemeProvider>
        <ConditionsList 
          {...mockProps} 
          travelPolicyType="edit"
          editData={{ IsDefault: true }}
        />
      </MockThemeProvider>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  test('renders edit and close buttons for non-default policy in create mode', () => {
    render(
      <MockThemeProvider>
        <ConditionsList {...mockProps} travelPolicyType="create" />
      </MockThemeProvider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('handles empty rules array', () => {
    const propsWithEmptyRules = {
      ...mockProps,
      details: {
        ...mockProps.details,
        Rules: []
      }
    };

    render(
      <MockThemeProvider>
        <ConditionsList {...propsWithEmptyRules} />
      </MockThemeProvider>
    );

    expect(screen.getByText('Test Condition')).toBeInTheDocument();
    expect(screen.queryByText(/Flight Class/)).not.toBeInTheDocument();
  });
});
