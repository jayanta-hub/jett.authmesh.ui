import React from 'react';
import { render, screen } from '@testing-library/react';
import PricingPolicy from './PricingPolicy';
import '@testing-library/jest-dom';

jest.mock('./pricing-policy-listing/PricingPolicyListing', () => () => (
  <div data-testid="pricing-policy-listing">PricingPolicyListing</div>
));
jest.mock('../../components/core-module/container/Container', () => (props: any) => (
  <div data-testid="container">{props.children}</div>
));

jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useMediaQuery from '@mui/material/useMediaQuery';

describe('PricingPolicy Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders breadcrumbs correctly on desktop view', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); 

    render(<PricingPolicy />);

    expect(screen.getByText('Hub')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Pricing policy')).toBeInTheDocument();
  });

  test('shows heading on desktop view', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); 

    render(<PricingPolicy />);
    expect(screen.getByText('Pricing Policy')).toBeInTheDocument();
  });

  test('does not show heading on mobile view', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); 

    render(<PricingPolicy />);
    expect(screen.queryByText('Pricing Policy')).not.toBeInTheDocument();
  });

  test('renders PricingPolicyListing', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(<PricingPolicy />);
    expect(screen.getByTestId('pricing-policy-listing')).toBeInTheDocument();
  });
});
