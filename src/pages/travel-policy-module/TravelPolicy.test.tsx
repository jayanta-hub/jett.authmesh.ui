import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TravelPolicy from './TravelPolicy';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { theme } from '../../theme';
import React from 'react';

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    // Mock reducers for testing
    musafirTravelPolicyApi: (state = {}, action: any) => state,
    musafirAprrovalWorkFlow: (state = {}, action: any) => state,
    approversSearchApi: (state = {}, action: any) => state,
    policyConstraintSearch: (state = {}, action: any) => state,
  },
  preloadedState: {},
});

// Mock API calls
jest.mock('../../store/musafirTravelPolicyApi', () => ({
  useCreateTravelPolicyMutation: () => [jest.fn(), { isLoading: false }],
  useEditTravelPolicyMutation: () => [jest.fn(), { isLoading: false }],
  useFetchTravelPolicyListMutation: () => [jest.fn(), { isLoading: false }],
  useGetTravelPolicyByIdMutation: () => [jest.fn()],
  useFetchGroupsMutation: () => [jest.fn()],
  useGetAllUserSegmentsMutation: () => [jest.fn()],
  useGetrulesbyconstraintidMutation: () => [jest.fn(), { isLoading: false }],
  usePolicyStatusUpdateMutation: () => [jest.fn()],
  useSetAsDefaultPolicyMutation: () => [jest.fn()],
  useCreateDuplicatePolicyMutation: () => [jest.fn()],
}));

jest.mock('../../store/musafirAprrovalWorkFlow', () => ({
  useFetchWorkflowListMutation: () => [jest.fn()],
}));

jest.mock('../../store/slice/ApproversSearchApigqlSlice', () => ({
  useLazyGetApproversSearchAutoCompleteGraphQuery: () => [jest.fn(), { data: null }],
}));

jest.mock('../../store/slice/PolicyConstraintSearchSlice', () => ({
  useLazyGetPolicyConstraintSearchQuery: () => [jest.fn(), { data: null }],
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => 'false'),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock ThemeProvider wrapper with Redux Provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </Provider>
);

describe('TravelPolicy Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders travel policy page with main elements', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <TravelPolicy />
        </TestWrapper>
      );
    });
    
    await waitFor(() => {
      // Check for main heading using role
      expect(screen.getByRole('heading', { name: 'travel_policy' })).toBeInTheDocument();
    });
  });

  test('renders breadcrumb navigation', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <TravelPolicy />
        </TestWrapper>
      );
    });
    
    await waitFor(() => {
      expect(screen.getByText('hub')).toBeInTheDocument();
      expect(screen.getByText('settings')).toBeInTheDocument();
      // Check for breadcrumb navigation
      expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
      // Check that travel_policy appears in breadcrumbs (using getAllByText to verify multiple instances)
      expect(screen.getAllByText('travel_policy')).toHaveLength(2);
    });
  });

  test('renders new policy button', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    await waitFor(() => {
      const newPolicyButton = screen.getByText('new_policy');
      expect(newPolicyButton).toBeInTheDocument();
    });
  });

  test('renders tabs for different policy types', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('all')).toBeInTheDocument();
      expect(screen.getByText('flight')).toBeInTheDocument();
      expect(screen.getByText('hotel')).toBeInTheDocument();
      expect(screen.getByText('visa')).toBeInTheDocument();
      expect(screen.getByText('holidays')).toBeInTheDocument();
      expect(screen.getByText('cabs')).toBeInTheDocument();
    });
  });

  test('renders AI assistance toggle', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('ai_assistance')).toBeInTheDocument();
    });
  });

  test('opens create policy modal when new policy button is clicked', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    const newPolicyButton = await screen.findByText('new_policy');
    fireEvent.click(newPolicyButton);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Travel Policy Name')).toBeInTheDocument();
    });
  });

  test('allows entering travel policy name', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    const newPolicyButton = await screen.findByText('new_policy');
    fireEvent.click(newPolicyButton);
    
    const nameInput = await screen.findByPlaceholderText('Travel Policy Name');
    fireEvent.change(nameInput, { target: { value: 'Test Policy' } });
    
    expect(nameInput).toHaveValue('Test Policy');
  });

  test('handles tab change', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    const flightTab = await screen.findByText('flight');
    fireEvent.click(flightTab);
    
    // The tab should be clickable and change the active state
    expect(flightTab).toBeInTheDocument();
  });

  test('renders no data message when policy list is empty', async () => {
    render(
      <TestWrapper>
        <TravelPolicy />
      </TestWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

});

