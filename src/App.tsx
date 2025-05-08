import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Fab } from '@mui/material';
import Header from './components/Header';
import AddBillForm from './components/AddBillForm';
import CategoryList from './components/CategoryList';
import CategoryDetail from './pages/CategoryDetail';
import Statistics from './components/Statistics';
import AddIcon from '@mui/icons-material/Add';

// 创建哆啦A梦主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // 哆啦A梦蓝色
    },
    secondary: {
      main: '#FF4081', // 粉色点缀
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Header />
          <Routes>
            <Route path="/" element={
              <Container maxWidth="sm" sx={{ py: 4 }}>
                <CategoryList />
              </Container>
            } />
            <Route path="/add-bill" element={
              <Container maxWidth="sm" sx={{ py: 4 }}>
                <AddBillForm />
              </Container>
            } />
            <Route path="/category/:categoryId" element={
              <Container maxWidth="sm" sx={{ py: 4 }}>
                <CategoryDetail />
              </Container>
            } />
            <Route path="/statistics" element={
              <Container maxWidth="md" sx={{ py: 4 }}>
                <Statistics />
              </Container>
            } />
          </Routes>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => window.location.href = '/add-bill'}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              background: 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 