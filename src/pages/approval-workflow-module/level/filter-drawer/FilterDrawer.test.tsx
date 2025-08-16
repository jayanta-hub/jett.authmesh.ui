import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterDrawer from './FilterDrawer';
import '@testing-library/jest-dom';

describe('FilterDrawer Component', () => {
  const mockTags: any[] = [
    {
      id: '1',
      name: 'Department',
      category: 'Organization',
      values: [
        { Id: '1-1', Name: 'Engineering' },
        { Id: '1-2', Name: 'Marketing' },
        { Id: '1-3', Name: 'Sales' },
      ],
    },
    {
      id: '2',
      name: 'Location',
      category: 'Organization',
      values: [
        { Id: '2-1', Name: 'New York' },
        { Id: '2-2', Name: 'San Francisco' },
      ],
    },
    {
      id: '3',
      name: 'Status',
      category: 'User',
      values: [],
    },
  ];

  const mockSelectedTag = {
    id: '0',
    name: 'User Group',
    category: 'Predefined',
    values: [
      { Id: '0-1', Name: 'Admins' },
      { Id: '0-2', Name: 'Managers' },
    ],
  };

  const mockOnApplyFilters = jest.fn();
  const mockSetIsDrawerOpen = jest.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      isDrawerOpen: true,
      setIsDrawerOpen: mockSetIsDrawerOpen,
      unselectedTags: mockTags,
      onApplyFilters: mockOnApplyFilters,
      initialInclusion: { anyone: true, everyone: false },
      ...props,
    };

    return render(<FilterDrawer {...defaultProps} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the drawer when isDrawerOpen is true', () => {
    renderComponent();
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
  });

  it('does not render the drawer when isDrawerOpen is false', () => {
    renderComponent({ isDrawerOpen: false });
    expect(screen.queryByText('Apply Filters')).not.toBeInTheDocument();
  });

  it('closes the drawer when close icon is clicked', () => {
    renderComponent();
    const closeButton = screen.getByRole('button', { name: /close drawer/i });
    fireEvent.click(closeButton);
    expect(mockSetIsDrawerOpen).toHaveBeenCalledWith(false);
  });

  it('renders the inclusion toggle buttons correctly', () => {
    renderComponent();
    const anyoneButton = screen.getByRole('button', { name: /anyone/i });
    const everyoneButton = screen.getByRole('button', { name: /everyone/i });
    expect(anyoneButton).toHaveClass('MuiButton-contained');
    expect(everyoneButton).not.toHaveClass('MuiButton-contained');
  });

  it('switches inclusion when buttons are clicked', () => {
    renderComponent();
    const everyoneButton = screen.getByRole('button', { name: /everyone/i });
    fireEvent.click(everyoneButton);
    expect(everyoneButton).toHaveClass('MuiButton-contained');
    expect(screen.getByRole('button', { name: /anyone/i })).not.toHaveClass(
      'MuiButton-contained'
    );
  });

  it('renders all tags with their values', () => {
    renderComponent();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
  });

  it('toggles filter selection when checkbox is clicked', () => {
    renderComponent();
    const engineeringCheckbox = screen.getByLabelText('Engineering');
    fireEvent.click(engineeringCheckbox);
    expect(engineeringCheckbox).toBeChecked();
  });

  it('selects all filters when "Select All" is clicked', () => {
    renderComponent();
    const selectAllCheckbox = screen.getByLabelText('Select All');
    fireEvent.click(selectAllCheckbox);
    mockTags.forEach(tag => {
      if (tag.values && tag.values.length > 0) {
        tag.values.forEach(value => {
          expect(screen.getByLabelText(value.Name)).toBeChecked();
        });
      }
    });
  });

  it('resets all filters when "Reset All" is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByLabelText('Engineering'));
    fireEvent.click(screen.getByLabelText('New York'));
    fireEvent.click(screen.getByText('Reset All'));
    expect(screen.getByLabelText('Engineering')).not.toBeChecked();
    expect(screen.getByLabelText('New York')).not.toBeChecked();
  });

  it('calls onApplyFilters with correct data when "Select" button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByLabelText('Engineering'));
    fireEvent.click(screen.getByLabelText('New York'));

    fireEvent.click(screen.getByRole('button', { name: /select/i }));

    expect(mockOnApplyFilters).toHaveBeenCalledWith({
      selectedFilters: {
        '1': { '1-1': true },
        '2': { '2-1': true },
      },
      inclusion: { anyone: true, everyone: false },
    });
  });

  it('toggles tag collapse when switch is clicked', () => {
    renderComponent();
    const departmentSwitches = screen.getAllByRole('checkbox', { name: '' });
    const departmentSwitch = departmentSwitches[0];

    fireEvent.click(departmentSwitch);
    expect(screen.queryByText('Engineering')).not.toBeInTheDocument();
    expect(screen.queryByText('Marketing')).not.toBeInTheDocument();
    expect(screen.queryByText('Sales')).not.toBeInTheDocument();

    fireEvent.click(departmentSwitch);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });
  it('renders selected predefined tag when provided', () => {
    const mockSelectedTag = {
      id: '0',
      name: 'User Group',
      category: 'Predefined',
      values: [
        { Id: '0-1', Name: 'Admins' },
        { Id: '0-2', Name: 'Managers' },
      ],
    };
    renderComponent({ selectedPredefinedTag: mockSelectedTag });
    expect(screen.getByText(/Anyone from User Group and the conditions set below/i)).toBeInTheDocument();
  });

  it('updates the header text based on inclusion and predefined tag', () => {
    renderComponent({ selectedPredefinedTag: mockSelectedTag });
    expect(
      screen.getByText('Anyone from User Group and the conditions set below')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /everyone/i }));
    expect(
      screen.getByText('Everyone from User Group and the conditions set below')
    ).toBeInTheDocument();
  });

  it('does not show values for tags with empty values array', () => {
    renderComponent();
    expect(screen.getByText('Status')).toBeInTheDocument();
    const allCheckboxes = screen.getAllByRole('checkbox');
    const statusCheckboxes = allCheckboxes.filter(checkbox =>
      checkbox.closest('li')?.textContent?.includes('Status')
    );
    expect(statusCheckboxes).toHaveLength(0);
  });

  it('maintains collapsed state when filters are applied', () => {
    renderComponent();
    const departmentSwitch = screen.getAllByRole('checkbox', { name: '' })[0];
    fireEvent.click(departmentSwitch);
    fireEvent.click(screen.getByRole('button', { name: /select/i }));
    renderComponent({ isDrawerOpen: true });
    expect(screen.queryByText('Engineering')).toBeInTheDocument();
  });
});