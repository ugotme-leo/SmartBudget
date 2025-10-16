import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../types';
import { useTranslations } from '../contexts/LanguageContext';

interface EditTransactionModalProps {
  transaction: Transaction;
  categories: Category[];
  onSave: (id: string, updatedTransaction: Transaction) => void;
  onClose: () => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, categories, onSave, onClose }) => {
  const t = useTranslations();
  const [amount, setAmount] = useState(String(transaction.amount));
  const [description, setDescription] = useState(transaction.description);
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [date, setDate] = useState(transaction.date);
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);


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

    onSave(transaction.id, {
      ...transaction,
      amount: parsedAmount,
      description,
      categoryId,
      date,
      type,
    });

    onClose();
  };

  return (
    <div 
        className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4" 
        aria-modal="true"
        role="dialog"
        onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{t('editTransaction')}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

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
            <label htmlFor="edit-amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('amount')}</label>
            <input
              type="number"
              id="edit-amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('description')}</label>
            <input
              type="text"
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('category')}</label>
            <select
              id="edit-category"
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
            <label htmlFor="edit-date" className="block text-sm font-medium text-slate-600 dark:text-slate-300">{t('date')}</label>
            <input
              type="date"
              id="edit-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 py-2 px-4 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">
                {t('cancel')}
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;