import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SamlProfileSelection from './SamlProfileSelection';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthProfilesMutation, useCreateTokenMutation } from '../../../store/musafirLoginApi';
import { enqueueSnackbar } from 'notistack';
import Cookies from 'js-cookie';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock('../../../store/musafirLoginApi');
jest.mock('notistack', () => ({ enqueueSnackbar: jest.fn() }));
jest.mock('js-cookie', () => ({ set: jest.fn() }));
jest.mock('../../../components/core-module/loading-screen/LoadingScreen', () => () => <div data-testid="loading-screen" />);

const mockNavigate = jest.fn();
const mockAuthProfilesMutation = jest.fn();
const mockCreateTokenMutation = jest.fn();
const mockUnwrap = jest.fn();
const mockCreateTokenUnwrap = jest.fn();

const mockLocation = {
  state: { from: '/custom-redirect' },
  pathname: '/saml',
  search: '?token=abc',
};

describe('SamlProfileSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useAuthProfilesMutation as jest.Mock).mockReturnValue([mockAuthProfilesMutation, { isLoading: false }]);
    (useCreateTokenMutation as jest.Mock).mockReturnValue([mockCreateTokenMutation]);
    window.history.replaceState = jest.fn();
    delete window.location;
    (window as any).location = { search: '?token=abc', pathname: '/saml' };
  });

  it('renders loading screen initially', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [], IdToken: 'idtoken' } });
    render(<SamlProfileSelection />);
    expect(screen.queryByTestId('loading-screen')).toBeNull(); 
  });

  it('navigates to login if no token in URL', async () => {
    (window as any).location = { search: '', pathname: '/saml' };
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  it('shows error and navigates if no profiles found', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [], IdToken: 'idtoken' } });
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('No profiles found', { variant: 'error' });
      expect(mockNavigate).toHaveBeenCalledWith('/custom-redirect', { replace: true });
    });
  });

  it('handles single profile and calls sendCreateTokenRequest', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Auth1dot0: { AccessToken: 'token', ExpiryAt: 'exp' }, RefreshToken: 'refresh', RefreshTokenExpiryAt: 'refreshExp', AccessDetail: { AccessToken: 'token' } } });
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(mockCreateTokenMutation).toHaveBeenCalled();
      expect(Cookies.set).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/custom-redirect', { replace: true });
    });
  });

  it('shows profile dialog for multiple profiles and handles selection', async () => {
    const profiles = [
      { ProfileId: '1', SourceName: 'Profile1' },
      { ProfileId: '2', SourceName: 'Profile2' },
    ];
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: profiles, IdToken: 'idtoken' } });
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(screen.getByText('Profile1')).toBeInTheDocument();
      expect(screen.getByText('Profile2')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Profile1'));
    const continueBtn = screen.getByText(/continue/i);
    expect(continueBtn).not.toBeDisabled();
    fireEvent.click(continueBtn);
  });

  it('handles cancel button in dialog', async () => {
    const profiles = [
      { ProfileId: '1', SourceName: 'Profile1' },
      { ProfileId: '2', SourceName: 'Profile2' },
    ];
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: profiles, IdToken: 'idtoken' } });
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(screen.getByText('Profile1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/cancel/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('handles token creation error (400)', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockRejectedValue({ data: { Context: { StatusCode: 400, Message: 'Bad Request' } } });
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Bad Request', { variant: 'error' });
    });
  });

  it('handles token creation error (other)', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockRejectedValue({ data: { Context: { StatusCode: 500, Message: 'Server Error' } } });
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Server Error', { variant: 'error' });
    });
  });

  it('handles token creation error (no context)', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockRejectedValue({});
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Error on creating Token', { variant: 'error' });
    });
  });

  it('handles profile selection error', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockRejectedValue(new Error('API Error'));
    render(<SamlProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('No profiles found', { variant: 'error' });
    });
  });
});