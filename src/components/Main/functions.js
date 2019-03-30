import { colors } from './config';
import 'chart.piecelabel.js';

export const getCategoriesArr = arr => arr.filter(data => data.comments !== '');
export const getChartData = arr => {
  const labelsArr = arr.map(item => item.category);
  const income = arr.filter(item => item.type === '-');
  const amountArr = income.map(item => item.amount);
  return {
    labels: labelsArr,
    datasets: [
      {
        data: amountArr,
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }
    ]
  };
};

export const getTotalByType = (arr, type) => {
  return arr.reduce((sum, item) => {
    return item.type !== type ? sum : sum + item.amount;
  }, 0);
};
