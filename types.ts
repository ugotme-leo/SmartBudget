// FIX: Removed unnecessary and circular imports.
// This file defines AppSettings, so it should not import it from itself.
// The `formatCurrency` import was unused and created a circular dependency with `utils/formatters.ts`.

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string; // ISO 8601 format: YYYY-MM-DD
  type: TransactionType;
}

export interface Category {
  id: string;
  name: string;
}

export enum View {
  Dashboard = 'DASHBOARD',
  Reports = 'REPORTS',
  Categories = 'CATEGORIES',
  Settings = 'SETTINGS',
}

export interface AppSettings {
    currencySymbol: string;
    currencyPosition: 'before' | 'after';
    language: 'my' | 'en';
}