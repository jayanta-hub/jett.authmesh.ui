import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BaseURL, APIversion } from "../utility/config";
import { getAuthHeader } from '../utility/config/oAuth';
import type { AuthOdetails } from '../utility/config/oAuth';

// Accept authOdetails as a parameter
const AutoCompleteApiClient = (authOdetails: AuthOdetails) => {
const authToken = getAuthHeader('platformsearch', 'POST', authOdetails);
  const client = new ApolloClient({
    uri: `${BaseURL}${APIversion}platformsearch`,
    headers: {
      "Authorization": authToken?.Authorization,
    },
    cache: new InMemoryCache(),
  });

  return client;
};

export default AutoCompleteApiClient;

