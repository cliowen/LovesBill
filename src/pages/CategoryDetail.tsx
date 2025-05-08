import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { Bill, billService } from '../services/billService';
import { getCategoryById } from '../constants/categories';

const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [categoryBills, setCategoryBills] = useState<Bill[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    if (!categoryId) {
      setError('分类ID不能为空');
      setLoading(false);
      return;
    }
    
    try {
      // 获取分类信息
      const category = getCategoryById(categoryId);
      if (!category) {
        setError('无效的分类');
        setLoading(false);
        return;
      }
      setCategoryName(category.name);

      // 从 billService 获取所有账单
      const allBills = billService.getAllBills();
      // 过滤当前分类的账单
      const filteredBills = allBills.filter(bill => bill.category === category.name);
      setCategoryBills(filteredBills);
      // 计算总金额
      const total = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
      setTotalAmount(total);
      setError(null);
    } catch (err) {
      setError('加载数据时出错');
      console.error('Error loading bills:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  if (!categoryId) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">分类ID不能为空</Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* 顶部导航栏 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          {categoryName}明细
        </Typography>
      </Box>

      {/* 统计信息 */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          总支出
        </Typography>
        <Typography variant="h4">
          ¥{totalAmount.toFixed(2)}
        </Typography>
      </Paper>

      {/* 账单列表 */}
      <Paper>
        <List>
          {categoryBills.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" color="text.secondary" align="center">
                    暂无账单记录
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            categoryBills.map((bill, index) => (
              <React.Fragment key={bill.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1">
                          {bill.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          ¥{bill.amount.toFixed(2)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={format(new Date(bill.date), 'yyyy-MM-dd HH:mm')}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={bill.paidBy === 'partner1' ? '伴侣1支付' : '伴侣2支付'}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < categoryBills.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default CategoryDetail; 