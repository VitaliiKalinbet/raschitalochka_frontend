export const getTotalByType = (arr, type) => {
  return arr.reduce((sum, item) => {
    return item.type !== type ? sum : sum + item.amount;
  }, 0);
};

export const getFinanceData = state => state.finance.data;
export const getTotalBalance = state => state.finance.totalBalance;
export const getTotalIncome = state => getTotalByType(state.finance.data, '+');
export const getTotalCost = state => getTotalByType(state.finance.data, '-');
