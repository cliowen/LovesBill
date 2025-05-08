import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { billService } from '../services/billService';
import { categories } from '../constants/categories';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

const Statistics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryData, setCategoryData] = useState<Array<{ name: string; value: number }>>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const bills = await billService.getAllBills();
      const total = await billService.getTotalExpense();
      setTotalExpense(total);

      const data = categories.map(category => {
        const categoryBills = bills.filter(bill => bill.category === category.name);
        const amount = categoryBills.reduce((sum, bill) => sum + bill.amount, 0);
        return {
          name: category.name,
          value: amount
        };
      }).filter(item => item.value > 0);

      setCategoryData(data);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = categoryData.reduce((sum, item) => sum + item.value, 0);
      const percentage = Math.round((data.value / total) * 100);
      return (
        <Paper sx={{ p: 1, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="body2">
            {data.name}: {data.value}元 ({percentage}%)
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        支出统计
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          总支出: {totalExpense}元
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              支出分类统计
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{
                    paddingLeft: '20px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistics; 