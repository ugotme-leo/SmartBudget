import React from 'react';
import { Transaction, Category, AppSettings } from '../types';
import TransactionForm from './ExpenseForm';
import TransactionList from './ExpenseList';

interface DashboardProps {
  transactions: Transaction[];
  categories: Category[];
  categoriesMap: Map<string, string>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  settings: AppSettings;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, categories, categoriesMap, addTransaction, settings }) => {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <TransactionForm categories={categories} addTransaction={addTransaction} />
      </div>
      <div className="lg:col-span-2">
        <TransactionList transactions={sortedTransactions} categoriesMap={categoriesMap} settings={settings} />
      </div>
    </div>
  );
};

export default Dashboard;