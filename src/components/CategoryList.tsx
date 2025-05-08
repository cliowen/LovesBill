import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Fab,
  Container,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { categories } from '../constants/categories';

// 定义分类图片和颜色映射
const categoryStyles = {
  food: {
    image: '/images/doraemon-food.png',
    color: '#FF4081',
    description: '美食记录'
  },
  shopping: {
    image: '/images/doraemon-shopping.png',
    color: '#1E88E5',
    description: '购物清单'
  },
  transport: {
    image: '/images/doraemon-travel.png',
    color: '#43A047',
    description: '出行记录'
  },
  entertainment: {
    image: '/images/doraemon-fun.png',
    color: '#FB8C00',
    description: '娱乐活动'
  },
  housing: {
    image: '/images/doraemon-home.png',
    color: '#8E24AA',
    description: '住宿费用'
  },
  other: {
    image: '/images/doraemon-other.png',
    color: '#757575',
    description: '其他支出'
  },
};

const CategoryList: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleAddBill = () => {
    navigate('/add-bill');
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      height: 'calc(100vh - 56px)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      pt: '56px',
      bgcolor: '#f5f5f5',
    }}>
      <Container 
        maxWidth="sm" 
        sx={{ 
          py: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Grid 
          container 
          spacing={3} 
          sx={{ 
            mt: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 改为两列布局
            gap: 2,
            flex: 1,
            alignContent: 'center',
            px: 1,
            overflow: 'hidden',
          }}
        >
          {categories.map((category) => {
            const style = categoryStyles[category.id as keyof typeof categoryStyles];
            return (
              <Grid item key={category.id} sx={{ minHeight: 0 }}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                    borderRadius: 3,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'white',
                  }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '100%', // 改为正方形
                      backgroundColor: `${style.color}10`,
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={style.image}
                      alt={category.name}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '70%', // 调整图片大小
                        height: '70%',
                        objectFit: 'contain',
                        padding: '12px',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1.05)',
                        },
                        boxShadow: `0 4px 8px ${style.color}25`,
                      }}
                    />
                  </Box>
                  <CardContent 
                    sx={{ 
                      textAlign: 'center', 
                      p: 2,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: style.color,
                        fontSize: '1.1rem',
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.875rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {style.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* 添加账单的悬浮按钮 */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddBill}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          background: 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
          },
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <AddIcon sx={{ fontSize: '1.5rem' }} />
      </Fab>
    </Box>
  );
};

export default CategoryList; 