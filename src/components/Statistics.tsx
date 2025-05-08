import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  useTheme,
  IconButton,
  Card,
  CardContent,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useMediaQuery,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Bill, billService } from '../services/billService';

const COLORS = ['#FF4081', '#1E88E5', '#43A047', '#FB8C00', '#8E24AA', '#757575'];

// 定义分类数据
const categories = [
  { id: 'food', name: '餐饮', icon: '🍜' },
  { id: 'shopping', name: '购物', icon: '🛍️' },
  { id: 'entertainment', name: '娱乐', icon: '🎮' },
  { id: 'transport', name: '交通', icon: '🚗' },
  { id: 'housing', name: '住房', icon: '🏠' },
  { id: 'other', name: '其他', icon: '📦' },
];

const Statistics: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [bills, setBills] = useState<Bill[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [dailyData, setDailyData] = useState<{ date: string; amount: number }[]>([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [averageExpense, setAverageExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const allBills = billService.getAllBills();
    setBills(allBills);
    updateStatistics(allBills);
  }, [timeRange, selectedCategory]);

  const updateStatistics = (filteredBills: Bill[]) => {
    // 根据选中的分类筛选账单
    let billsToProcess = filteredBills;
    if (selectedCategory !== 'all') {
      billsToProcess = filteredBills.filter(bill => bill.category === selectedCategory);
    }

    // 计算总支出
    const total = billsToProcess.reduce((sum, bill) => sum + bill.amount, 0);
    setTotalExpense(total);

    // 处理分类数据
    const categoryMap = new Map<string, number>();
    billsToProcess.forEach(bill => {
      const current = categoryMap.get(bill.category) || 0;
      categoryMap.set(bill.category, current + bill.amount);
    });
    const categoryData = Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name: categories.find(cat => cat.id === name)?.name || name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
    setCategoryData(categoryData);

    // 处理每日数据
    const dailyMap = new Map<string, number>();
    billsToProcess.forEach(bill => {
      const date = bill.date;
      const current = dailyMap.get(date) || 0;
      dailyMap.set(date, current + bill.amount);
    });
    const dailyData = Array.from(dailyMap.entries())
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
        amount,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setDailyData(dailyData);

    // 计算统计数据
    if (dailyData.length > 0) {
      setAverageExpense(total / dailyData.length);
      setMaxExpense(Math.max(...dailyData.map(d => d.amount)));
    }
  };

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="body2">{label}</Typography>
          <Typography variant="body2" color="primary">
            ¥{payload[0].value.toFixed(2)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: 'calc(100vh - 56px)',
      pt: '56px',
      pb: 3,
      overflow: 'auto',
      bgcolor: '#f5f5f5',
    }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* 顶部导航 */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0,
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexGrow: 1,
          }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              支出统计
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            width: isMobile ? '100%' : 'auto',
          }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>时间范围</InputLabel>
              <Select
                value={timeRange}
                label="时间范围"
                onChange={handleTimeRangeChange}
              >
                <MenuItem value="week">本周</MenuItem>
                <MenuItem value="month">本月</MenuItem>
                <MenuItem value="year">本年</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>支出分类</InputLabel>
              <Select
                value={selectedCategory}
                label="支出分类"
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">全部</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* 统计卡片组 */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  总支出
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  ¥{totalExpense.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  日均支出
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  ¥{averageExpense.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  单日最高支出
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  ¥{maxExpense.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* 饼图 */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 3,
                borderRadius: 2,
                height: isMobile ? '300px' : '400px',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                支出分类占比
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={isMobile ? 80 : 120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `¥${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* 柱状图 */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 3,
                borderRadius: 2,
                height: isMobile ? '300px' : '400px',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                每日支出趋势
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" fill="#1E88E5" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* 趋势线图 */}
          <Grid item xs={12}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 3,
                borderRadius: 2,
                height: isMobile ? '300px' : '400px',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                支出趋势
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#1E88E5" 
                    strokeWidth={2}
                    dot={{ fill: '#1E88E5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Statistics; 