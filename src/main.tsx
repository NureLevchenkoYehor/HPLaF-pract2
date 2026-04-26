import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    // Target the specific component
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--bg)'
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--social-bg)',
        },
      },
      defaultProps: {
        elevation: 1
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'var(--text-h)'
        }
      }
    }
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
