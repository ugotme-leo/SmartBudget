import React, { useState } from 'react';
import { Category } from '../types';
import { useTranslations } from '../contexts/LanguageContext';

interface CategoryManagerProps {
  categories: Category[];
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, addCategory, updateCategory, deleteCategory }) => {
  const t = useTranslations();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };
  
  const handleEdit = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
  };
  
  const handleUpdate = () => {
    if (editingCategoryId && editingCategoryName.trim()) {
      updateCategory(editingCategoryId, editingCategoryName.trim());
      setEditingCategoryId(null);
      setEditingCategoryName('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-200">{t('manageCategories')}</h2>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder={t('newCategoryPlaceholder')}
          className="flex-grow px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button onClick={handleAddCategory} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          {t('add')}
        </button>
      </div>

      <div className="space-y-3">
        {categories.map(category => (
          <div key={category.id} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
            {editingCategoryId === category.id ? (
              <input
                type="text"
                value={editingCategoryName}
                onChange={(e) => setEditingCategoryName(e.target.value)}
                className="flex-grow px-2 py-1 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm"
              />
            ) : (
              <span className="text-slate-800 dark:text-slate-200">{category.name}</span>
            )}
            
            <div className="flex gap-2">
              {editingCategoryId === category.id ? (
                <>
                  <button onClick={handleUpdate} className="text-green-600 hover:text-green-800 dark:hover:text-green-400">{t('save')}</button>
                  <button onClick={() => setEditingCategoryId(null)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">{t('cancel')}</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">{t('edit')}</button>
                  <button onClick={() => deleteCategory(category.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400">{t('delete')}</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;