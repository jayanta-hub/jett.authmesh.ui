import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import i18n from 'i18next'; // Mock i18next configuration
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { useFetchParentTagsMutation, useFetchTagsMetaMutation, useFetchTagsMutation } from '../../store/musafirTagsApi';
import { store } from '../../store/store';
import { theme } from '../../theme'; // Import your theme
import Tags from './Tags';


// import { useFetchGroupsTestMutation } from '../../store/musafirGroupTest';
// import { useFetchParentTagsMutation, useFetchTagsMetaMutation, useFetchTagsMutation 
// Mock Material-UI icons
jest.mock('@mui/icons-material/Search', () => () => <div>SearchIcon</div>);
jest.mock('@mui/icons-material/AddCircleOutlineOutlined', () => () => <div>AddCircleOutlineIcon</div>);
jest.mock('@mui/icons-material/FilterAltOutlined', () => () => <div>FilterAltOutlinedIcon</div>);
jest.mock('@mui/icons-material/NavigateNext', () => () => <div>NavigateNextIcon</div>);

// Mock images
jest.mock('../../assets/images/filterTags.png', () => 'filterTags.png');
jest.mock('../../assets/images/gridMenuIcon.png', () => 'gridMenuIcon.png');
jest.mock('../../assets/images/listMenuIcon.png', () => 'listMenuIcon.png');

// Mock RTK Query hooks
jest.mock('../../store/musafirTagsApi', () => ({
  useFetchTagsMutation: jest.fn(),
  useFetchTagsMetaMutation: jest.fn(),
  useFetchParentTagsMutation: jest.fn(),
  useFetchGroupsTestMutation: jest.fn(),
}));

// Mock i18next
i18n.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        hub: 'Hub',
        settings: 'Settings',
        tags: 'Tags',
        list: 'List',
        grid: 'Grid',
        sort: 'Sort',
        name: 'Name',
        created_date: 'Created Date',
        organization: 'Organization',
        search_here: 'Search here',
        new_custom_tag: 'New Custom Tag',
      },
    },
  },
});

// Mock Redux store
// const createMockStore = () =>
//   configureStore({
//     reducer: {
//       tagsSlice,
//     },
//     preloadedState: {
//       tagsSlice: {
//         fetchLoading: false,
//       },
//     },
//   });

    // const store = configureStore({
    //   reducer: {
    //     tagsSlice: tagsSlice?.reducer,
    //   },
    // });


// Mock media query for mobile view
const mockUseMediaQuery = jest.fn();
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => mockUseMediaQuery(),
}));

describe('Tags Component', () => {
  let mockFetchTags: jest.Mock;
  let mockFetchTagsMeta: jest.Mock;
  let mockFetchParentTags: jest.Mock;
  let mockFetchGroupsTest: jest.Mock;
//   let store: ReturnType<typeof createMockStore>;/

  beforeEach(() => {
    // store = createMockStore();

    // Mock RTK Query hooks
    mockFetchTags = jest.fn().mockReturnValue([jest.fn().mockResolvedValue({
      unwrap: jest.fn().mockResolvedValue({
        Context: { Message: 'Success' },
        Response: {
          Data: [
            { TagName: 'Tag1' },
            { TagName: 'Tag2' },
          ],
          Pagination: { Total: 20 },
        },
      })}), {}]);
    mockFetchTagsMeta = jest.fn().mockReturnValue([jest.fn().mockResolvedValue({
      unwrap: jest.fn().mockResolvedValue({ Response: {} }),
    }), {}]);
    mockFetchParentTags = jest.fn().mockReturnValue([jest.fn().mockResolvedValue({
      unwrap: jest.fn().mockResolvedValue({ Response: [] }),
    }), {}]);
    mockFetchGroupsTest = jest.fn().mockReturnValue([jest.fn().mockResolvedValue({
      unwrap: jest.fn().mockResolvedValue({ Response: [] }),
    }), {}]);

    (useFetchTagsMutation as jest.Mock).mockReturnValue(mockFetchTags());
    (useFetchTagsMetaMutation as jest.Mock).mockReturnValue(mockFetchTagsMeta());
    (useFetchParentTagsMutation as jest.Mock).mockReturnValue(mockFetchParentTags());
    // (useFetchGroupsTestMutation as jest.Mock).mockReturnValue(mockFetchGroupsTest());

    // Default to non-mobile view
    mockUseMediaQuery.mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <Tags />
          </I18nextProvider>
        </ThemeProvider>
      </Provider>
    );

  test('renders breadcrumbs correctly', () => {
    renderComponent();
    expect(screen.getByText('Hub')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
  });

  test('renders list and grid toggle buttons in non-mobile view', () => {
    renderComponent();
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.getByText('Grid')).toBeInTheDocument();
  });

  test('toggles between list and grid view', () => {
    renderComponent();
    const gridButton = screen.getByText('Grid').parentElement!;
    fireEvent.click(gridButton);
    expect(store.getState().tagsSlice.view).toBe(1); // Assuming setView updates the Redux store
  });

  test('renders search bar and sort dropdown in non-mobile view', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sort')).toBeInTheDocument();
  });

  test('handles search input', async () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search here');
    fireEvent.change(searchInput, { target: { value: 'Tag1' } });
    await waitFor(() => {
      expect(screen.getByText('Tag1')).toBeInTheDocument(); // Assuming AllTags renders TagName
    });
  });

  test('opens tag creation modal on button click', () => {
    renderComponent();
    const newTagButton = screen.getByText('New Custom Tag');
    fireEvent.click(newTagButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument(); // Assuming TagCreationModal renders a dialog
  });

  test('changes tab and fetches tags accordingly', async () => {
    renderComponent();
    const customTab = screen.getByText('Custom'); // Assuming TagsTabSelector renders tab labels
    fireEvent.click(customTab);
    await waitFor(() => {
      expect(mockFetchTags).toHaveBeenCalledWith({
        patch: expect.objectContaining({
          Request: expect.objectContaining({ FilterType: 'CUSTOM' }),
        }),
      });
    });
  });

  test('handles pagination change', async () => {
    renderComponent();
    const paginationButton = screen.getByText('2'); // Assuming Pagination renders page numbers
    fireEvent.click(paginationButton);
    await waitFor(() => {
      expect(mockFetchTags).toHaveBeenCalledWith({
        patch: expect.objectContaining({
          Request: expect.objectContaining({ Pagination: expect.objectContaining({ PageNumber: 2 }) }),
        }),
      });
    });
  });

  test('displays loading state', () => {
    (useFetchTagsMutation as jest.Mock).mockReturnValue([
      jest.fn().mockReturnValue(new Promise(() => {})), // Simulate pending state
      { isLoading: true },
    ]);
    renderComponent();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays no tags message when tagsList is empty', async () => {
    (useFetchTagsMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({
          Context: { Message: 'Success' },
          Response: { Data: [], Pagination: { Total: 0 } },
        }),
      }),
      {},
    ]);
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('No Tags Found')).toBeInTheDocument();
    });
  });

  test('renders mobile view correctly', () => {
    mockUseMediaQuery.mockReturnValue(true); // Simulate mobile view
    renderComponent();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument();
    expect(screen.getByText('New Custom Tag')).toBeInTheDocument();
  });

  test('fetches tags on component mount', async () => {
    renderComponent();
    await waitFor(() => {
      expect(mockFetchTags).toHaveBeenCalled();
      expect(mockFetchTagsMeta).toHaveBeenCalled();
      expect(mockFetchParentTags).toHaveBeenCalled();
      expect(mockFetchGroupsTest).toHaveBeenCalled();
    });
  });
});