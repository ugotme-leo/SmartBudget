export const translations = {
  my: {
    // Header
    appName: 'သုံးငွေ စာရင်း',
    dashboard: 'ပင်မ စာမျက်နှာ',
    reports: 'လစဉ် မှတ်တမ်း',
    categories: 'အမျိုးအစားများ',
    settings: 'ချိန်ညှိရန်',
  
    // ExpenseForm
    addTransaction: 'ငွေစာရင်း ထည့်ရန်',
    expense: 'သုံးငွေ',
    income: 'ဝင်ငွေ',
    amount: 'ငွေပမာဏ',
    amountPlaceholder: 'ဥပမာ: 5000',
    description: 'အကြောင်းအရာ',
    descriptionPlaceholder: 'ဥပမာ: ကော်ဖီ',
    category: 'အမျိုးအစား',
    date: 'နေ့စွဲ',
    save: 'သိမ်းမည်',
    errorAllFieldsRequired: 'ဖြည့်ရန်ကျန်ရှိနေပါသည်။',
    errorInvalidAmount: 'ငွေပမာဏ မှားယွင်းနေပါသည်။',
  
    // ExpenseList
    recentTransactions: 'လတ်တလော ငွေဝင်/ထွက်များ',
    noTransactions: 'စာရင်းသွင်းထားခြင်း မရှိသေးပါ။',
    unknownCategory: 'အမျိုးအစားမသိ',
  
    // ReportView
    monthlyReport: 'လစဉ် မှတ်တမ်း',
    previousMonth: 'ယခင်လ',
    nextMonth: 'နောက်လ',
    exportCSV: 'Export CSV',
    noDataForMonth: 'ရွေးချယ်ထားသောလတွင် စာရင်းသွင်းထားခြင်း မရှိသေးပါ။',
    totalIncome: 'စုစုပေါင်း ဝင်ငွေ',
    totalExpenses: 'စုစုပေါင်း သုံးငွေ',
    balance: 'လက်ကျန်',
    expenseCategories: 'သုံးငွေ အမျိုးအစားများ',
    noExpenses: 'သုံးငွေမရှိပါ။',
    noExpenseChart: 'သုံးငွေ Chart မရှိပါ။',
    monthlyTransactions: 'လစဉ် ငွေဝင်/ထွက် စာရင်း',
    edit: 'ပြင်မည်',
    delete: 'ဖြတ်မည်',
    confirmDelete: 'ဒီစာရင်းကို ဖျက်မှာ သေချာလား?',
    confirmDeleteTitle: 'ဖျက်ရန် သေချာပါသလား',
    showingTransactionsFor: '"{category}" အတွက် စာရင်းများ ပြသနေသည်',
    clearFilter: 'စစ်ထုတ်ခြင်းကို ဖယ်ရှားမည်',
  
    // CategoryManager
    manageCategories: 'အမျိုးအစားများ စီမံရန်',
    newCategoryPlaceholder: 'အမျိုးအစား အသစ်',
    add: 'ထည့်မည်',
    cancel: 'မလုပ်တော့ပါ',
  
    // SettingsView
    settingsTitle: 'ချိန်ညှိရန်',
    currencySymbol: 'ငွေကြေးသင်္ကေတ',
    currencySymbolPlaceholder: 'ဥပမာ: Ks, $',
    symbolPosition: 'သင်္ကေတ နေရာ',
    positionBefore: 'ရှေ့မှာ ($1,000)',
    positionAfter: 'နောက်မှာ (1,000 Ks)',
    savedMessage: 'သိမ်းဆည်းပြီးပါပြီ!',
    theme: 'ဒီဇိုင်း',
    lightTheme: 'လင်းသော ဒီဇိုင်း',
    darkTheme: 'မှောင်သော ဒီဇိုင်း',
    language: 'ဘာသာစကား',
    burmese: 'မြန်မာ',
    english: 'English',
    toggleToLight: 'လင်းသော ဒီဇိုင်းသို့ ပြောင်းရန်',
    toggleToDark: 'မှောင်သော ဒီဇိုင်းသို့ ပြောင်းရန်',
    dangerZone: 'အန္တရာယ်ဇုန်',
    deleteAllData: 'ဒေတာအားလုံးကို ဖျက်မည်',
    deleteAllDataMessage: 'ဤအသုံးပြုသူ၏ ငွေစာရင်း၊ အမျိုးအစားများနှင့် ဆက်တင်များအားလုံးကို အပြီးအပိုင် ဖျက်ပစ်ပါမည်။',
    confirmDeleteAllDataTitle: 'ဒေတာအားလုံးကို ဖျက်ရန် သေချာပါသလား',
    confirmDeleteAllDataMessage: 'ဤလုပ်ဆောင်ချက်ကို နောက်ပြန်ပြင်၍မရပါ။ အချက်အလက်အားလုံး အပြီးတိုင် ဖျက်ပစ်ပါမည်။',
  
    // EditTransactionModal
    editTransaction: 'ငွေစာရင်း ပြင်ရန်',
  },
  en: {
    // Header
    appName: 'Smart Budget',
    dashboard: 'Dashboard',
    reports: 'Reports',
    categories: 'Categories',
    settings: 'Settings',
  
    // ExpenseForm
    addTransaction: 'Add Transaction',
    expense: 'Expense',
    income: 'Income',
    amount: 'Amount',
    amountPlaceholder: 'e.g., 5000',
    description: 'Description',
    descriptionPlaceholder: 'e.g., Coffee',
    category: 'Category',
    date: 'Date',
    save: 'Save',
    errorAllFieldsRequired: 'All fields are required.',
    errorInvalidAmount: 'Invalid amount.',
  
    // ExpenseList
    recentTransactions: 'Recent Transactions',
    noTransactions: 'No transactions recorded yet.',
    unknownCategory: 'Unknown',
  
    // ReportView
    monthlyReport: 'Monthly Report',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    exportCSV: 'Export CSV',
    noDataForMonth: 'No data for the selected month.',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    balance: 'Balance',
    expenseCategories: 'Expense by Category',
    noExpenses: 'No expenses.',
    noExpenseChart: 'No expense chart to display.',
    monthlyTransactions: 'Monthly Transactions',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this transaction?',
    confirmDeleteTitle: 'Confirm Deletion',
    showingTransactionsFor: 'Showing transactions for "{category}"',
    clearFilter: 'Clear Filter',
  
    // CategoryManager
    manageCategories: 'Manage Categories',
    newCategoryPlaceholder: 'New category name',
    add: 'Add',
    cancel: 'Cancel',
  
    // SettingsView
    settingsTitle: 'Settings',
    currencySymbol: 'Currency Symbol',
    currencySymbolPlaceholder: 'e.g., Ks, $',
    symbolPosition: 'Symbol Position',
    positionBefore: 'Before ($1,000)',
    positionAfter: 'After (1,000 Ks)',
    savedMessage: 'Saved successfully!',
    theme: 'Theme',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    language: 'Language',
    burmese: 'မြန်မာ',
    english: 'English',
    toggleToLight: 'Switch to light mode',
    toggleToDark: 'Switch to dark mode',
    dangerZone: 'Danger Zone',
    deleteAllData: 'Delete All Data',
    deleteAllDataMessage: 'Permanently delete all transactions, categories, and settings for this profile.',
    confirmDeleteAllDataTitle: 'Delete All Data?',
    confirmDeleteAllDataMessage: 'Are you absolutely sure? This action cannot be undone and will permanently erase all data for this profile.',

  
    // EditTransactionModal
    editTransaction: 'Edit Transaction',
  }
};