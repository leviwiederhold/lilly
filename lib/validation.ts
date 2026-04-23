import { z } from "zod";

const money = z.coerce.number().finite().min(0);

export const incomeInputSchema = z.object({
  date: z.string().min(1),
  client_name: z.string().trim().min(1, "Client name is required"),
  service: z.string().trim().min(1, "Service is required"),
  payment_type: z.string().trim().min(1, "Payment type is required"),
  amount: money,
  tip: money.default(0),
});

export const expenseInputSchema = z.object({
  date: z.string().min(1),
  vendor: z.string().trim().min(1, "Vendor is required"),
  category: z.string().trim().min(1, "Category is required"),
  description: z.string().trim().default(""),
  amount: money,
  payment_method: z.string().trim().min(1, "Payment method is required"),
  business_percent: z.coerce.number().finite().min(0).max(100),
});

export const cashInputSchema = z.object({
  date: z.string().min(1),
  starting_cash: money,
  cash_earned: money,
  cash_spent: money,
  notes: z.string().trim().default(""),
});

export const summaryQuerySchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional(),
});

export type IncomeInput = z.infer<typeof incomeInputSchema>;
export type ExpenseInput = z.infer<typeof expenseInputSchema>;
export type CashInput = z.infer<typeof cashInputSchema>;
