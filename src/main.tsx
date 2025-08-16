import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import './i18n';
import "./index.css";
import { store } from "./store/store";
import { theme } from './theme';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
  </Provider>
);
