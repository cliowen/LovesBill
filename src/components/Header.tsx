import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: '56px !important',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
          }}
        >
          <Box
            component="img"
            src="/images/doraemon-logo.png"
            alt="哆啦A梦"
            sx={{
              width: 36,
              height: 36,
              objectFit: 'contain',
              borderRadius: '50%',
              backgroundColor: '#fff',
              padding: '2px',
            }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#fff',
              letterSpacing: '0.5px',
            }}
          >
            记账本
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton 
          onClick={() => navigate('/statistics')}
          sx={{ 
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <BarChartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 