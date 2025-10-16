import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, Category, View, AppSettings } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ReportView from './components/ReportView';
import CategoryManager from './components/CategoryManager';
import SettingsView from './components/SettingsView';
import LoginView from './components/LoginView';
import { LanguageProvider } from './contexts/LanguageContext';

const defaultCategories: Category[] = [
  { id: '1', name: 'အစားအသောက်' },
  { id: '2', name: 'ခရီးစရိတ်' },
  { id: '3', name: 'ဖျော်ဖြေရေး' },
  { id: '4', name: 'ကျန်းမာရေး' },
  { id: '5', name: 'အသုံးစရိတ်' },
  { id: '6', name: 'လစာ' },
];

const defaultSettings: AppSettings = {
  currencySymbol: 'Ks',
  currencyPosition: 'after',
  language: 'my',
};

// Main application component for logged-in users
const MainApp: React.FC<{ user: string; onLogout: () => void, onDeleteAllData: () => void }> = ({ user, onLogout, onDeleteAllData }) => {
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>(`${user}_transactions`, []);
    const [categories, setCategories] = useLocalStorage<Category[]>(`${user}_categories`, defaultCategories);
    const [settings, setSettings] = useLocalStorage<AppSettings>(`${user}_app-settings`, defaultSettings);
    const [currentView, setCurrentView] = useState<View>(View.Dashboard);

    const categoriesMap = useMemo(() => {
        const map = new Map<string, string>();
        categories.forEach(cat => map.set(cat.id, cat.name));
        return map;
    }, [categories]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        setTransactions([...transactions, { ...transaction, id: uuidv4() }]);
    };

    const updateTransaction = (id: string, updatedTransaction: Transaction) => {
        setTransactions(transactions.map(t => (t.id === id ? updatedTransaction : t)));
    };

    const deleteTransaction = (id: string) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };
    
    const addCategory = (name: string) => {
        if (name && !categories.some(c => c.name === name)) {
        const newCategory: Category = { id: uuidv4(), name };
        setCategories([...categories, newCategory]);
        }
    };

    const updateCategory = (id: string, name: string) => {
        setCategories(categories.map(c => (c.id === id ? { ...c, name } : c)));
    };

    const deleteCategory = (id: string) => {
        setTransactions(transactions.filter(transaction => transaction.categoryId !== id));
        setCategories(categories.filter(c => c.id !== id));
    };

    const renderView = () => {
        switch (currentView) {
        case View.Dashboard:
            return <Dashboard 
                    transactions={transactions} 
                    categories={categories}
                    categoriesMap={categoriesMap} 
                    addTransaction={addTransaction} 
                    settings={settings}
                    />;
        case View.Reports:
            return <ReportView 
                    transactions={transactions} 
                    categories={categories}
                    categoriesMap={categoriesMap} 
                    settings={settings} 
                    updateTransaction={updateTransaction}
                    deleteTransaction={deleteTransaction}
                    />;
        case View.Categories:
            return <CategoryManager 
                    categories={categories}
                    addCategory={addCategory}
                    updateCategory={updateCategory}
                    deleteCategory={deleteCategory}
                    />;
        case View.Settings:
            return <SettingsView 
                    currentSettings={settings}
                    onSave={setSettings}
                    onDeleteAllData={onDeleteAllData}
                    />;
        default:
            return <Dashboard 
                    transactions={transactions} 
                    categories={categories}
                    categoriesMap={categoriesMap} 
                    addTransaction={addTransaction} 
                    settings={settings}
                    />;
        }
    };

    return (
        <LanguageProvider settings={settings}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <Header 
                currentView={currentView} 
                setCurrentView={setCurrentView}
                user={user}
                onLogout={onLogout}
            />
            <main className="container mx-auto p-4 md:p-6">
                {renderView()}
            </main>
            </div>
        </LanguageProvider>
    );
};

// Top-level App component to handle authentication state
function App() {
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>('currentUser', null);
  
  const handleLogin = (username: string) => {
    // Sanitize username for use as a key
    const sanitizedUser = username.trim().toLowerCase();
    if (sanitizedUser) {
      // For a new user, initialize their categories with the default set.
      // This ensures that even if they log in for the first time, they have categories to start with.
      const categoriesKey = `${sanitizedUser}_categories`;
      try {
        if (!window.localStorage.getItem(categoriesKey)) {
          window.localStorage.setItem(categoriesKey, JSON.stringify(defaultCategories));
        }
      } catch (error) {
          console.error("Failed to initialize categories in localStorage", error);
      }

      setCurrentUser(sanitizedUser);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const handleDeleteAllUserData = () => {
    if (!currentUser) return;

    try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key && key.startsWith(`${currentUser}_`)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => window.localStorage.removeItem(key));

    } catch (error) {
        console.error("Failed to delete user data from localStorage", error);
    }
    
    handleLogout();
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return <MainApp user={currentUser} onLogout={handleLogout} onDeleteAllData={handleDeleteAllUserData} />;
}

export default App;