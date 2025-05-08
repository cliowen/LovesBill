import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { billService } from '../services/billService';
import { categories } from '../constants/categories';

const AddBillForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paidBy: 'partner1',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 验证表单数据
    if (!formData.category) {
      setError('请选择分类');
      return;
    }
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      setError('请输入有效的金额');
      return;
    }
    if (!formData.description) {
      setError('请输入描述');
      return;
    }
    if (!formData.date) {
      setError('请选择日期');
      return;
    }

    try {
      // 获取选中分类的名称
      const selectedCategory = categories.find(cat => cat.id === formData.category);
      if (!selectedCategory) {
        setError('无效的分类');
        return;
      }

      // 添加新账单
      billService.addBill({
        category: selectedCategory.name, // 使用分类名称
        amount: Number(formData.amount),
        description: formData.description,
        date: formData.date,
        paidBy: formData.paidBy as 'partner1' | 'partner2',
      });

      // 返回上一页
      navigate(-1);
    } catch (err) {
      setError('添加账单失败');
      console.error('Error adding bill:', err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 顶部导航栏 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          添加账单
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          {/* 分类选择 */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>分类</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="分类"
              onChange={handleSelectChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 金额输入 */}
          <TextField
            fullWidth
            label="金额"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
            inputProps={{ min: 0, step: 0.01 }}
          />

          {/* 描述输入 */}
          <TextField
            fullWidth
            label="描述"
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />

          {/* 日期选择 */}
          <TextField
            fullWidth
            label="日期"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
            InputLabelProps={{ shrink: true }}
          />

          {/* 支付人选择 */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>支付人</InputLabel>
            <Select
              name="paidBy"
              value={formData.paidBy}
              label="支付人"
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="partner1">伴侣1</MenuItem>
              <MenuItem value="partner2">伴侣2</MenuItem>
            </Select>
          </FormControl>

          {/* 错误提示 */}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* 提交按钮 */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              },
            }}
          >
            添加账单
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddBillForm; 