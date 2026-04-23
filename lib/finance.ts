export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function incomeTotal(amount: number, tip: number): number {
  return roundMoney(amount + tip);
}

export function deductibleAmount(amount: number, businessPercent: number): number {
  return roundMoney(amount * (businessPercent / 100));
}

export function endingCash(startingCash: number, cashEarned: number, cashSpent: number): number {
  return roundMoney(startingCash + cashEarned - cashSpent);
}

export function currentMonthRange(month?: string) {
  const now = new Date();
  const [year, monthNumber] = month
    ? month.split("-").map((part) => Number(part))
    : [now.getFullYear(), now.getMonth() + 1];

  if (!year || !monthNumber) {
    throw new Error("Invalid month");
  }

  const start = new Date(Date.UTC(year, monthNumber - 1, 1));
  const end = new Date(Date.UTC(year, monthNumber, 1));

  return {
    month: `${year}-${String(monthNumber).padStart(2, "0")}`,
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}
