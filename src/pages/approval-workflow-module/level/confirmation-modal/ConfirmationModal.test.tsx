import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationModal } from './ConfirmationModal'; // Adjust the import path
import '@testing-library/jest-dom';

describe('ConfirmationModal', () => {
  const mockOnClose = jest.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      showConfirmModal: true,
      onClose: mockOnClose,
    };
    
    return render(<ConfirmationModal {...defaultProps} {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when showConfirmModal is true', () => {
    renderComponent();
    expect(screen.getByText('Alert')).toBeInTheDocument();
    expect(screen.getByText('Overriding rights may get impacted by this arrangement. Do you wish to continue?')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('does not render when showConfirmModal is false', () => {
    renderComponent({ showConfirmModal: false });
    expect(screen.queryByText('Alert')).not.toBeInTheDocument();
  });

  it('calls onClose with false when No button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('No'));
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  it('calls onClose with true when Yes button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Yes'));
    expect(mockOnClose).toHaveBeenCalledWith(true);
  });

  it('calls onClose with false when clicking outside the modal', () => {
    renderComponent();
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  it('matches snapshot when visible', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when not visible', () => {
    const { asFragment } = renderComponent({ showConfirmModal: false });
    expect(asFragment()).toMatchSnapshot();
  });
});