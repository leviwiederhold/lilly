export type Summary = {
  month: string;
  business_name: string;
  tax_rate: number;
  monthly_income_total: number;
  monthly_expense_total: number;
  net_profit: number;
  estimated_taxes: number;
};

export type IncomeRow = {
  id: string;
  date: string;
  client_name: string;
  service: string;
  payment_type: string;
  amount: number;
  tip: number;
  total: number;
};

export type ExpenseRow = {
  id: string;
  date: string;
  vendor: string;
  category: string;
  description: string;
  amount: number;
  payment_method: string;
  business_percent: number;
  deductible_amount: number;
};

export type CashRow = {
  id: string;
  date: string;
  starting_cash: number;
  cash_earned: number;
  cash_spent: number;
  ending_cash: number;
  notes: string;
};
