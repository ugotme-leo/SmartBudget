import React, { useMemo } from 'react';
import { Transaction, AppSettings } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useTranslations, useLocale } from '../contexts/LanguageContext';

interface TransactionListProps {
  transactions: Transaction[];
  categoriesMap: Map<string, string>;
  settings: AppSettings;
}

const TransactionItem: React.FC<{ transaction: Transaction; categoryName: string; settings: AppSettings, locale: string }> = ({ transaction, categoryName, settings, locale }) => {
    const isIncome = transaction.type === 'income';
    
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{transaction.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{categoryName}</p>
            </div>
            <div className="text-right">
                <p className={`font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
                    {isIncome ? '+' : '-'} {formatCurrency(transaction.amount, settings)}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {new Date(transaction.date).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                </p>
            </div>
        </div>
    );
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, categoriesMap, settings }) => {
  const t = useTranslations();
  const { locale } = useLocale();

  const groupedTransactions = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-CA'); // YYYY-MM-DD
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);
  }, [transactions]);

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-200">{t('recentTransactions')}</h2>
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-center py-8">{t('noTransactions')}</p>
        ) : (
          sortedDates.map(date => (
            <div key={date}>
              <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2 sticky top-0 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-sm py-2">
                {new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              <div className="space-y-3">
                {groupedTransactions[date].map(transaction => (
                  <TransactionItem 
                    key={transaction.id} 
                    transaction={transaction} 
                    categoryName={categoriesMap.get(transaction.categoryId) || t('unknownCategory')} 
                    settings={settings}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;