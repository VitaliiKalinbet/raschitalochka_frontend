import { colors, months } from './config';
import 'chart.piecelabel.js';

const sortFunc = (a, b) => {
  if (a.date === b.date) return new Date(b.createdAt) - new Date(a.createdAt);
  return b.date - a.date;
};
export const getSortedData = (arr = []) => arr.sort(sortFunc);

export const getCategoriesArr = arr => arr.filter(data => data.comments !== '');
export const getCost = arr => arr.filter(item => item.type === '-');

export const getFilteredDataBySelectedMonth = (arr, selctedMonth) => {
  return arr.filter(el => months[new Date(el.date).getMonth()] === selctedMonth);
};

export const getFilteredDataBySelectedYear = (arr, selectedYear) => {
  return arr.filter(el => String(new Date(el.date).getFullYear()) === selectedYear);
};

export const getFilteredDataByYearAndMonth = (data = [], year, month) =>
  getFilteredDataBySelectedMonth(getFilteredDataBySelectedYear(data, year), month);

const getAmountSum = arr => arr.reduce((acc, current) => acc + current.amount, 0);
const getDataListByCategory = (arr, costArr) => {
  return arr.map(category => costArr.filter(item => item.category === category));
};

const getLabels = arr => [...new Set(arr.map(i => i.category))];

export const getChartData = arr => {
  const labels = arr.map(item => item.category);
  const data = arr.map(item => item.amount);
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }
    ]
  };
};

export const getTableData = arr => {
  const cost = getCost(arr);
  const labels = getLabels(cost);
  const dataListByCategory = getDataListByCategory(labels, cost);
  const data = dataListByCategory.map(categories => getAmountSum(categories));
  return labels.map((category, idx) => {
    return { category, amount: data[idx] };
  });
};

export const getTotalByType = (arr, type) => {
  return arr.reduce((sum, item) => {
    return item.type !== type ? sum : sum + item.amount;
  }, 0);
};

export const getCurrentMonth = () => months[new Date().getMonth()];
export const getCurrentYear = () => String(new Date().getFullYear());

export const getMonths = arr => {
  const uniqMonth = [];
  arr.forEach(({ date }) => {
    const index = new Date(date).getMonth();
    const month = months[index];
    if (!uniqMonth.includes(month)) uniqMonth.push(month);
  });
  return months.filter(month => uniqMonth.includes(month));
};

export const getYears = arr => {
  const uniqYear = [];
  arr.forEach(({ date }) => {
    const year = new Date(date).getFullYear();
    if (!uniqYear.includes(year)) uniqYear.push(year);
  });
  return uniqYear.sort((prev, next) => prev - next);
};
