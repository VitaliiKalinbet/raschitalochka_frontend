export const getTotalByType = (arr, type) => {
  return arr.reduce((sum, item) => {
    return item.type !== type ? sum : sum + item.amount;
  }, 0);
};

export const getFinanceData = state => state.finance.data;
export const getTypeTotalBalance = state => state.finance.typeTotalBalance;

export const getTotalBalance = state => {
  const balance = state.finance.totalBalance;
  return getTypeTotalBalance(state) === '-' ? -Math.abs(balance) : balance;
};

export const getTotalIncome = state => getTotalByType(state.finance.data, '+');
export const getTotalCost = state => getTotalByType(state.finance.data, '-');
