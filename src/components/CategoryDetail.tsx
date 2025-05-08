import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Bill, billService } from '../services/billService';

const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [bills, setBills] = useState<Bill[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (categoryId) {
      const categoryBills = billService.getBillsByCategory(categoryId);
      setBills(categoryBills);
      setTotal(billService.getCategoryTotal(categoryId));
    }
  }, [categoryId]);

  const handleBack = () => {
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ 
      position: 'relative',
      height: 'calc(100vh - 56px)',
      pt: '56px',
      overflow: 'hidden',
    }}>
      <Container maxWidth="sm" sx={{ height: '100%', py: 2 }}>
        {/* 返回按钮 */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={handleBack}
            sx={{ 
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
            {categoryId}支出明细
          </Typography>
        </Box>

        {/* 总支出卡片 */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 2, 
            mb: 2, 
            borderRadius: 2,
            background: 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)',
            color: 'white',
          }}
        >
          <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
            本月总支出
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
            ¥{total.toFixed(2)}
          </Typography>
        </Paper>

        {/* 账单列表 */}
        <Paper 
          elevation={1}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            maxHeight: 'calc(100% - 180px)',
            overflowY: 'auto',
          }}
        >
          <List>
            {bills.map((bill) => (
              <ListItem 
                key={bill.id}
                divider
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <ListItemText
                  primary={bill.description}
                  secondary={formatDate(bill.date)}
                  primaryTypographyProps={{
                    fontWeight: 'medium',
                  }}
                />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                  }}
                >
                  ¥{bill.amount.toFixed(2)}
                </Typography>
              </ListItem>
            ))}
            {bills.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="暂无支出记录"
                  sx={{ textAlign: 'center', color: 'text.secondary' }}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default CategoryDetail; 