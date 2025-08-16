import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import OrganizationsPage from './OrganizationsPage';

// Mock the HomeNavBar component
jest.mock('../../components/core-module/nav-bar/user-home-nav-bar/HomeNavBar', () => {
  return function MockHomeNavBar({ children }: { children: React.ReactNode }) {
    return <div data-testid="navbar">{children}</div>;
  };
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('OrganizationsPage', () => {
  it('renders the page title and subtitle', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Organizations')).toBeInTheDocument();
    expect(screen.getByText('Set up or manage organizations seamlessly and scale your business with confidence.')).toBeInTheDocument();
  });

  it('renders the Noon Global section', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Noon Global')).toBeInTheDocument();
    expect(screen.getByText('Complete your Organization Details')).toBeInTheDocument();
    expect(screen.getByText('Available in 4 Markets')).toBeInTheDocument();
  });

  it('renders the Business Entities section', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Business Entities')).toBeInTheDocument();
  });

  it('renders market accordions', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('India Market')).toBeInTheDocument();
    expect(screen.getByText('UAE Market')).toBeInTheDocument();
    expect(screen.getByText('KSA Market')).toBeInTheDocument();
  });

  it('renders entity cards within markets', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Google LCC')).toBeInTheDocument();
    expect(screen.getByText('Emirates Corp')).toBeInTheDocument();
  });



  it('renders contact support section', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
    expect(screen.getByText('adminalphabet@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+91 9800900098')).toBeInTheDocument();
  });

  it('renders quick help section', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Quick Help?')).toBeInTheDocument();
    expect(screen.getByText('Entity Setup Checklist')).toBeInTheDocument();
    expect(screen.getByText('Getting Started Guide')).toBeInTheDocument();
    expect(screen.getByText('Common Issues')).toBeInTheDocument();
  });

  it('renders create new market section', () => {
    renderWithTheme(<OrganizationsPage />);
    
    expect(screen.getByText('Create a new Market')).toBeInTheDocument();
    expect(screen.getByText('Add a new Market')).toBeInTheDocument();
  });

  it('handles market accordion expansion', () => {
    renderWithTheme(<OrganizationsPage />);
    
    const uaeMarket = screen.getByText('UAE Market');
    fireEvent.click(uaeMarket);
    
    // The UAE market should now be expanded and show its entities
    expect(screen.getByText('Emirates Corp')).toBeInTheDocument();
  });

  it('handles continue setup button clicks', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    renderWithTheme(<OrganizationsPage />);
    
    const continueSetupButtons = screen.getAllByText('Continue Setup');
    fireEvent.click(continueSetupButtons[0]);
    
    expect(consoleSpy).toHaveBeenCalledWith('Continue setup for:', 'india', 'google-lcc');
    
    consoleSpy.mockRestore();
  });

  it('handles add entity button clicks', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    renderWithTheme(<OrganizationsPage />);
    
    const addEntityButtons = screen.getAllByText('Add Entity');
    fireEvent.click(addEntityButtons[0]);
    
    expect(consoleSpy).toHaveBeenCalledWith('Add entity to market:', 'india');
    
    consoleSpy.mockRestore();
  });

  it('handles add market button clicks', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    renderWithTheme(<OrganizationsPage />);
    
    const addMarketButton = screen.getByText('Add a new Market');
    fireEvent.click(addMarketButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Add new market');
    
    consoleSpy.mockRestore();
  });
}); 