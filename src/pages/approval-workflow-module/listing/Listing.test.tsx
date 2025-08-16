import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Use RTK's configureStore
import Listing from './Listing';
import approvalWorkFlowReducer from '../../../store/slice/ApprovalWorkFlowSlice'; // Your actual slice path
import {
  useFetchWorkflowListMutation,
  useDeleteWorkflowListByIdMutation,
  useFetchWorkflowListByIdMutation
} from '../../../store/musafirAprrovalWorkFlow';

// Mocks for the RTK Query hooks
jest.mock('../../../store/musafirAprrovalWorkFlow');

// Initial workflow data for testing
const defaultWorkflow = {
  WorkflowId: '123',
  Name: 'Test Workflow',
  Status: 'Active',
  IsActive: true,
  CreatedByName: 'John Doe',
  CreatedDate: '2024-01-01',
  ModifiedBy: '',
  ModifiedDate: '',
  ApproverTypes: ['Manager'],
  LevelCount: 1
};

// Mock functions to simulate actions
const mockSetIsLevelDrawerOpen = jest.fn();
const mockSetIsCreated = jest.fn();
const mockSetIsEditMode = jest.fn();
const mockSetIsDeleteMode = jest.fn();

// Set up the real store with preloaded state
const setup = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      approvalWorkFlowSlice: approvalWorkFlowReducer, // Import your slice reducer
    },
    preloadedState: {
      approvalWorkFlowSlice: {
        workflowListData: {
          Response: {
            Data: [defaultWorkflow], // Simulating one workflow
            Pagination: {
              Total: 1
            }
          }
        },
        error: null,
        ...preloadedState
      }
    }
  });

  // Mock RTK Query hooks to return a resolved value
  (useFetchWorkflowListMutation as jest.Mock).mockReturnValue([jest.fn().mockResolvedValue({}), { isLoading: false }]);
  (useDeleteWorkflowListByIdMutation as jest.Mock).mockReturnValue([jest.fn().mockResolvedValue({})]);
  (useFetchWorkflowListByIdMutation as jest.Mock).mockReturnValue([
    () => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }),
  ]);
  

  return render(
    <Provider store={store}>
      <Listing
        setIsLevelDrawerOpen={mockSetIsLevelDrawerOpen}
        setIsCreated={mockSetIsCreated}
        isCreated={false}
        setIsEditMode={mockSetIsEditMode}
        isDeleteMode={false}
        setIsDeleteMode={mockSetIsDeleteMode}
      />
    </Provider>
  );
};

describe('Listing Component', () => {
  test('displays message when no workflows exist', () => {
    setup({
      workflowListData: { Response: { Data: [], Pagination: { Total: 0 } } },
      error: null
    });
    expect(screen.getByText(/No approval workflows found/i)).toBeInTheDocument();
  });
  
  test('renders workflow list', async () => {
    setup();
    // Check if the default workflow appears on the screen
    expect(await screen.findByText(/Test Workflow/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.includes('created_by') && element?.querySelector('strong')?.textContent === 'John Doe')).toBeInTheDocument();
  });

  test('clicks new process button', () => {
    setup();
    const button = screen.getByRole('button', { name: /new_process/i });
    fireEvent.click(button);
    expect(mockSetIsLevelDrawerOpen).toHaveBeenCalledWith(true);
  });

  test('toggles workflow status', async () => {
    setup();
    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeChecked();
    fireEvent.click(switchInput);
    await waitFor(() => {
      expect(switchInput).not.toBeChecked();
    });
  });
  
  test('handles error state', () => {
    setup({
      error: { message: 'Test error' },
      workflowListData: { Response: { Data: [], Pagination: { Total: 0 } } }
    });
    expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();
  });

  test('shows loading message', () => {
    (useFetchWorkflowListMutation as jest.Mock).mockReturnValue([jest.fn(), { isLoading: true }]);
    const store = configureStore({
      reducer: {
        approvalWorkFlowSlice: approvalWorkFlowReducer
      },
      preloadedState: {
        approvalWorkFlowSlice: {
          workflowListData: { Response: { Data: [], Pagination: { Total: 0 } } },
          error: null
        }
      }
    });

    render(
      <Provider store={store}>
        <Listing
          setIsLevelDrawerOpen={mockSetIsLevelDrawerOpen}
          setIsCreated={mockSetIsCreated}
          isCreated={false}
          setIsEditMode={mockSetIsEditMode}
          isDeleteMode={false}
          setIsDeleteMode={mockSetIsDeleteMode}
        />
      </Provider>
    );

    expect(screen.getByText(/Loading workflows/i)).toBeInTheDocument();
  });
  
  test('opens menu on clicking action button and sets workflow ID and name', () => {
    setup(); // render the component
  
    // Find the action button - update selector based on your actual implementation
    const actionButton = screen.getByRole('button', { name: /settings/i }); // or use a testId if you have one
    fireEvent.click(actionButton);
  
    // Now assert the expected side effects
    // If the menu becomes visible or selected state updates
    expect(screen.getByText(/Test Workflow/i)).toBeInTheDocument(); // The workflow name appears (optional)
  
    // If your menu shows workflow name or options, assert that
    expect(screen.getByText(/Edit/i)).toBeInTheDocument(); // or whatever menu item appears
  });
  
  test('closes the menu when clicking outside or selecting an option', async () => {
    setup();
  
    const settingsButton = await screen.findByLabelText(/settings/i);
    fireEvent.click(settingsButton);
  
    // Confirm the menu opened
    const editOption = await screen.findByText(/edit/i);
    expect(editOption).toBeInTheDocument();
  
    // Simulate clicking the menu option to close (or click outside if you have logic for that)
    fireEvent.click(editOption);
  
    // Wait for the menu to disappear
    await waitFor(() => {
      expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();
    });
  });

  test('closes the delete confirmation dialog when clicking Cancel', async () => {
    setup(); // Your component render function
  
    // Open the menu and click "Delete" to trigger the dialog
    fireEvent.click(await screen.findByRole('button', { name: /settings/i }));
    fireEvent.click(await screen.findByText(/delete/i));
  
    // Ensure dialog appears
    expect(await screen.findByText(/are you sure you want to delete/i)).toBeInTheDocument();
  
    // Click the Cancel button
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
  
    // Wait for dialog to disappear
    await waitFor(() => {
      expect(screen.queryByText(/are you sure you want to delete/i)).not.toBeInTheDocument();
    });
  });
  
});
