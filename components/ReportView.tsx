import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { Transaction, AppSettings, Category } from '../types';
import { formatCurrency } from '../utils/formatters';
import EditTransactionModal from './EditTransactionModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useTranslations, useLocale } from '../contexts/LanguageContext';

interface ReportViewProps {
  transactions: Transaction[];
  categories: Category[];
  categoriesMap: Map<string, string>;
  settings: AppSettings;
  updateTransaction: (id: string, updatedTransaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19AF', '#19AFFF'];


const ReportView: React.FC<ReportViewProps> = ({ transactions, categories, categoriesMap, settings, updateTransaction, deleteTransaction }) => {
  const t = useTranslations();
  const { locale } = useLocale();
  const [selectedMonth, setSelectedMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory(null);
  }, [selectedMonth]);


  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => t.date.startsWith(selectedMonth))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, selectedMonth]);

  const { expenseChartData, totalExpenses, totalIncome, netTotal } = useMemo(() => {
    let income = 0;
    let expenseTotal = 0;
    const expenseDataMap = new Map<string, number>();
    
    filteredTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
        const categoryName = categoriesMap.get(transaction.categoryId) || t('unknownCategory');
        expenseDataMap.set(categoryName, (expenseDataMap.get(categoryName) || 0) + transaction.amount);
      }
    });

    const data = Array.from(expenseDataMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { 
      expenseChartData: data, 
      totalExpenses: expenseTotal,
      totalIncome: income,
      netTotal: income - expenseTotal
    };
  }, [filteredTransactions, categoriesMap, t]);
  
  const displayedTransactions = useMemo(() => {
    if (!selectedCategory) {
        return filteredTransactions;
    }
    return filteredTransactions.filter(transaction => {
        const categoryName = categoriesMap.get(transaction.categoryId) || t('unknownCategory');
        return categoryName === selectedCategory;
    });
  }, [filteredTransactions, selectedCategory, categoriesMap, t]);
  
  
  const handlePreviousMonth = () => {
    const currentDate = new Date(`${selectedMonth}-01T00:00:00`);
    currentDate.setMonth(currentDate.getMonth() - 1);
    const newMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(newMonth);
  };

  const handleNextMonth = () => {
    const currentDate = new Date(`${selectedMonth}-01T00:00:00`);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const newMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(newMonth);
  };

  const formattedMonth = useMemo(() => {
    const date = new Date(`${selectedMonth}-01T00:00:00`);
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
  }, [selectedMonth, locale]);


  const handleDeleteRequest = (id: string) => {
    setDeletingTransactionId(id);
  };

  const handleConfirmDelete = () => {
    if (deletingTransactionId) {
      deleteTransaction(deletingTransactionId);
      setDeletingTransactionId(null);
    }
  };

  const handleExportCSV = () => {
    const header = `ID,Description,Amount,Category,Date,Type\n`;
    const rows = filteredTransactions.map(transaction => {
        const categoryName = categoriesMap.get(transaction.categoryId) || t('unknownCategory');
        const escapedDescription = `"${String(transaction.description || '').replace(/"/g, '""')}"`;
        return [transaction.id, escapedDescription, transaction.amount, categoryName, transaction.date, transaction.type].join(',');
    }).join('\n');

    const csvString = header + rows;
    const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePieClick = (data: any) => {
    const categoryName = data.name;
    if (categoryName === selectedCategory) {
        setSelectedCategory(null);
    } else {
        setSelectedCategory(categoryName);
    }
  };

  const pieActiveProps: any = {
    activeIndex: expenseChartData.findIndex(d => d.name === selectedCategory),
    activeShape: (props: any) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    },
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-800 dark:text-slate-200">{payload[0].name}</p>
          <p className="text-slate-600 dark:text-slate-300">{formatCurrency(payload[0].value, settings)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      {editingTransaction && (
        <EditTransactionModal 
            transaction={editingTransaction}
            categories={categories}
            onSave={updateTransaction}
            onClose={() => setEditingTransaction(null)}
        />
      )}
      <ConfirmDeleteModal 
        isOpen={deletingTransactionId !== null}
        onClose={() => setDeletingTransactionId(null)}
        onConfirm={handleConfirmDelete}
        message={t('confirmDelete')}
      />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4 md:mb-0">{t('monthlyReport')}</h2>
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center gap-2 md:gap-4 p-1 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <button onClick={handlePreviousMonth} className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" aria-label={t('previousMonth')}>
                    <ChevronLeftIcon />
                </button>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 w-40 md:w-48 text-center tabular-nums">
                    {formattedMonth}
                </h3>
                <button onClick={handleNextMonth} className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" aria-label={t('nextMonth')}>
                    <ChevronRightIcon />
                </button>
            </div>
            <button onClick={handleExportCSV} className="flex items-center gap-2 bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
                <DownloadIcon />
                <span className="hidden md:inline">{t('exportCSV')}</span>
            </button>
        </div>
      </div>


      {filteredTransactions.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-10">{t('noDataForMonth')}</p>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-green-700 dark:text-green-300">{t('totalIncome')}</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalIncome, settings)}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-300">{t('totalExpenses')}</h4>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalExpenses, settings)}</p>
            </div>
             <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300">{t('balance')}</h4>
                <p className={`text-2xl font-bold ${netTotal >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>{formatCurrency(netTotal, settings)}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">{t('expenseCategories')}</h3>
                 {expenseChartData.length > 0 ? (
                    <div className="space-y-3">
                    {expenseChartData.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                <p className="text-slate-700 dark:text-slate-200">{entry.name}</p>
                            </div>
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(entry.value, settings)}</p>
                        </div>
                    ))}
                    </div>
                 ) : (
                    <p className="text-slate-500 dark:text-slate-400">{t('noExpenses')}</p>
                 )}
            </div>
            <div className="h-80 w-full">
            {expenseChartData.length > 0 ? (
                <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={expenseChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={110}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        onClick={handlePieClick}
                        {...pieActiveProps}
                    >
                    {expenseChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{cursor: 'pointer', outline: 'none'}} />
                    ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">{t('noExpenseChart')}</div>
            )}
            </div>
        </div>


        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">{t('monthlyTransactions')}</h3>

            {selectedCategory && (
                <div className="flex justify-between items-center mb-4 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        {t('showingTransactionsFor').replace('{category}', selectedCategory)}
                    </p>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
                    >
                        {t('clearFilter')}
                    </button>
                </div>
            )}

            <div className="space-y-3">
                {displayedTransactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-sm">
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{transaction.description}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {categoriesMap.get(transaction.categoryId) || t('unknownCategory')} - {new Date(transaction.date).toLocaleDateString(locale, { day: 'numeric', month: 'short' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                {formatCurrency(transaction.amount, settings)}
                            </p>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingTransaction(transaction)} className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors text-sm">{t('edit')}</button>
                                <button onClick={() => handleDeleteRequest(transaction.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors text-sm">{t('delete')}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
      )}
    </div>
  );
};

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export default ReportView;