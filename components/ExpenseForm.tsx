import React, { useState } from 'react';
import { Category, Transaction, TransactionType } from '../types';
import { useTranslations } from '../contexts/LanguageContext';

interface TransactionFormProps {
  categories: Category[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ categories, addTransaction }) => {
  const t = useTranslations();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>('expense');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !categoryId || !date) {
      setError(t('errorAllFieldsRequired'));
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError(t('errorInvalidAmount'));
      return;
    }

    addTransaction({
      amount: parsedAmount,
      description,
      categoryId,
      date,
      type,
    });

    setAmount('');
    setDescription('');
    setError('');
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-200">{t('addTransaction')}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-around bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button type="button" onClick={() => setType('expense')} className={`w-full py-2 rounded-md transition-colors text-sm font-semibold ${type === 'expense' ? 'bg-red-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('expense')}
            </button>
            <button type="button" onClick={() => setType('income')} className={`w-full py-2 rounded-md transition-colors text-sm font-semibold ${type === 'income' ? 'bg-green-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}>
                {t('income')}
            </button>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('amount')}</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('amountPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('description')}</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('descriptionPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('category')}</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('date')}</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          {t('save')}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;