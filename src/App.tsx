import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import BooksPage from './pages/BooksPage';
import { AppBar, Box, Button, Container, Divider, Stack, Toolbar } from '@mui/material';

const pages = [{ path: '/weather', label: 'Weather' }, { path: '/books', label: 'Books' }];

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Stack
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                direction={"row"}
              >
                {pages.map((page) => (
                  <Button href={page.path} key={page.label} >
                    {page.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
