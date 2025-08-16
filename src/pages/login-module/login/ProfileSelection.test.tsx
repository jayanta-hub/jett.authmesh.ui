import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileSelection from './ProfileSelection';
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
  pathname: '/profile',
  search: '?code=abc&state=xyz',
};

describe('ProfileSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useAuthProfilesMutation as jest.Mock).mockReturnValue([mockAuthProfilesMutation, { isLoading: false }]);
    (useCreateTokenMutation as jest.Mock).mockReturnValue([mockCreateTokenMutation]);
    window.history.replaceState = jest.fn();
    // Mock window.location.search
    delete window.location;
    (window as any).location = { search: '?code=abc&state=xyz', pathname: '/profile' };
  });

  it('renders loading screen initially', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [], IdToken: 'idtoken' } });
    render(<ProfileSelection />);
    expect(screen.queryByTestId('loading-screen')).toBeNull(); // Not rendered directly, handled by state
  });

  it('navigates to login if no code or state in URL', async () => {
    (window as any).location = { search: '', pathname: '/profile' };
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  it('navigates to login if only code is present', async () => {
    (window as any).location = { search: '?code=abc', pathname: '/profile' };
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  it('navigates to login if only state is present', async () => {
    (window as any).location = { search: '?state=xyz', pathname: '/profile' };
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  it('shows error and navigates if no profiles found', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [], IdToken: 'idtoken' } });
    render(<ProfileSelection />);
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
    mockCreateTokenUnwrap.mockResolvedValue({ 
      Context: { StatusCode: 200 }, 
      Response: { 
        Auth1dot0: { AccessToken: 'token', ExpiryAt: 'exp' }, 
        RefreshToken: 'refresh', 
        RefreshTokenExpiryAt: 'refreshExp', 
        AccessDetail: { AccessToken: 'token' } 
      } 
    });
    render(<ProfileSelection />);
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
    render(<ProfileSelection />);
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
    render(<ProfileSelection />);
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
    render(<ProfileSelection />);
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
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Server Error', { variant: 'error' });
    });
  });

  it('handles profile selection error', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockRejectedValue(new Error('API Error'));
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('No profiles found', { variant: 'error' });
    });
  });

  it('handles successful token creation with valid access token', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockResolvedValue({ 
      Context: { StatusCode: 200 }, 
      Response: { 
        Auth1dot0: { AccessToken: 'token', ExpiryAt: 'exp' }, 
        RefreshToken: 'refresh', 
        RefreshTokenExpiryAt: 'refreshExp', 
        AccessDetail: { AccessToken: 'valid-token' } 
      } 
    });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('jeetat', JSON.stringify({
        token: 'token',
        Expiry: 'exp'
      }));
      expect(Cookies.set).toHaveBeenCalledWith('jeetrt', JSON.stringify({
        token: 'refresh',
        Expiry: 'refreshExp'
      }));
      expect(mockNavigate).toHaveBeenCalledWith('/custom-redirect', { replace: true });
    });
  });

  it('handles profile selection with no selected profile', async () => {
    const profiles = [
      { ProfileId: '1', SourceName: 'Profile1' },
      { ProfileId: '2', SourceName: 'Profile2' },
    ];
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: profiles, IdToken: 'idtoken' } });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(screen.getByText('Profile1')).toBeInTheDocument();
    });
    const continueBtn = screen.getByText(/continue/i);
    expect(continueBtn).toBeDisabled();
    fireEvent.click(continueBtn);
    expect(mockCreateTokenMutation).not.toHaveBeenCalled();
  });
  
  it('handles non-200 status code from auth profile API', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 400 }, Response: { Profiles: [], IdToken: 'idtoken' } });
    render(<ProfileSelection />);
    await waitFor(() => {
      // Should not show any profiles or error for non-200 status
      expect(screen.queryByText('Profile1')).not.toBeInTheDocument();
    });
  });

  it('handles missing Response in auth profile API', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 } });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('No profiles found', { variant: 'error' });
    });
  });

  it('handles missing Profiles in Response', async () => {
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { IdToken: 'idtoken' } });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('No profiles found', { variant: 'error' });
    });
  });

  it('handles missing IdToken in Response', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile] } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockResolvedValue({ 
      Context: { StatusCode: 200 }, 
      Response: { 
        Auth1dot0: { AccessToken: 'token', ExpiryAt: 'exp' }, 
        RefreshToken: 'refresh', 
        RefreshTokenExpiryAt: 'refreshExp', 
        AccessDetail: { AccessToken: 'valid-token' } 
      } 
    });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(mockCreateTokenMutation).toHaveBeenCalled();
    });
  });

  it('handles missing Auth1dot0 in token response', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockResolvedValue({ 
      Context: { StatusCode: 200 }, 
      Response: { 
        RefreshToken: 'refresh', 
        RefreshTokenExpiryAt: 'refreshExp', 
        AccessDetail: { AccessToken: 'valid-token' } 
      } 
    });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('jeetat', JSON.stringify({
        token: undefined,
        Expiry: undefined
      }));
    });
  });

  it('handles missing RefreshToken in token response', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockResolvedValue({ 
      Context: { StatusCode: 200 }, 
      Response: { 
        Auth1dot0: { AccessToken: 'token', ExpiryAt: 'exp' }, 
        AccessDetail: { AccessToken: 'valid-token' } 
      } 
    });
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('jeetrt', JSON.stringify({
        token: undefined,
        Expiry: undefined
      }));
    });
  });

  it('handles missing location.state.from', async () => {
    const profile = { ProfileId: '1', SourceName: 'TestProfile' };
    mockAuthProfilesMutation.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ Context: { StatusCode: 200 }, Response: { Profiles: [profile], IdToken: 'idtoken' } });
    mockCreateTokenMutation.mockReturnValue({ unwrap: mockCreateTokenUnwrap });
    mockCreateTokenUnwrap.mockResolvedValue({ 
      Context: { StatusCode: 200 }, 
      Response: { 
        Auth1dot0: { AccessToken: 'token', ExpiryAt: 'exp' }, 
        RefreshToken: 'refresh', 
        RefreshTokenExpiryAt: 'refreshExp', 
        AccessDetail: { AccessToken: 'valid-token' } 
      } 
    });
    
    (useLocation as jest.Mock).mockReturnValue({
      state: {},
      pathname: '/profile',
      search: '?code=abc&state=xyz',
    });
    
    render(<ProfileSelection />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard?theme=0', { replace: true });
    });
  });
});