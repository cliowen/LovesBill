import React, { useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Bill, BillSummary } from '../types/bill';
import { format } from 'date-fns';

interface BillListProps {
  bills: Bill[];
  onDeleteBill: (id: string) => void;
}

const BillList: React.FC<BillListProps> = ({ bills, onDeleteBill }) => {
  const calculateSummary = (): BillSummary => {
    const summary = bills.reduce(
      (acc, bill) => {
        acc.total += bill.amount;
        if (bill.paidBy === 'partner1') {
          acc.partner1Total += bill.amount;
        } else {
          acc.partner2Total += bill.amount;
        }
        return acc;
      },
      { total: 0, partner1Total: 0, partner2Total: 0, balance: 0 }
    );

    summary.balance = summary.partner1Total - summary.partner2Total;
    return summary;
  };

  const summary = calculateSummary();

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
        账单列表
      </Typography>
      
      {/* 账单统计 */}
      <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          总支出: ¥{summary.total.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          伴侣1支付: ¥{summary.partner1Total.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          伴侣2支付: ¥{summary.partner2Total.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color={summary.balance > 0 ? 'success.main' : 'error.main'}
          sx={{ mt: 1 }}
        >
          差额: ¥{Math.abs(summary.balance).toFixed(2)}
          {summary.balance > 0 ? ' (伴侣1应收)' : ' (伴侣2应收)'}
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>描述</TableCell>
              <TableCell align="right">金额</TableCell>
              <TableCell>类别</TableCell>
              <TableCell>日期</TableCell>
              <TableCell>支付人</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.description}</TableCell>
                <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  ¥{bill.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={bill.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{format(bill.date, 'yyyy-MM-dd HH:mm')}</TableCell>
                <TableCell>
                  <Chip
                    label={bill.paidBy === 'partner1' ? '伴侣1支付' : '伴侣2支付'}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => onDeleteBill(bill.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BillList; 