import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicTabs from './HomeDashboard';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';

const theme = createTheme();

describe('BasicTabs Component', () => {
  it('renders the component without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <BasicTabs />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <BasicTabs />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Flight')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText('Holidays')).toBeInTheDocument();
  });

  it('changes tab on click', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <BasicTabs />
        </MemoryRouter>
      </ThemeProvider>
    );

    const hotelsTab = screen.getByText('Hotels');
    fireEvent.click(hotelsTab);

    expect(hotelsTab).toHaveClass('Mui-selected');
  });

  it('changes template on template tab click', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <BasicTabs />
        </MemoryRouter>
      </ThemeProvider>
    );

    const template2Tab = screen.getByText('Template 2');
    fireEvent.click(template2Tab);

    expect(localStorage.getItem('templateValue')).toBe('1');
  });

  it('renders mobile view correctly', () => {
    window.innerWidth = 375; // Simulating a small screen
    window.dispatchEvent(new Event('resize'));

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <BasicTabs />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Flight')).toBeInTheDocument();
  });

  it('renders desktop view correctly', () => {
    window.innerWidth = 1024; // Simulating a large screen
    window.dispatchEvent(new Event('resize'));

    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <BasicTabs />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Book your')).toBeInTheDocument();
  });
});
