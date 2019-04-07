export const getTotalByType = (arr, type) => {
  return arr.reduce((sum, item) => {
    return item.type !== type ? sum : sum + item.amount;
  }, 0);
};

const getFinanceData = state => state.finance.data;
const getTotalIncome = state => getTotalByType(state.finance.data, '+');
const getTotalCost = state => getTotalByType(state.finance.data, '-');

export default {
  getFinanceData,
  getTotalIncome,
  getTotalCost
};
