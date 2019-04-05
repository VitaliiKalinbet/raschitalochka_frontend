import { colors, months } from '../../components/Main/config';
import 'chart.piecelabel.js';

export const sortFunc = (a, b) => a.date - b.date;
export const getSortedData = arr => arr.sort(sortFunc);

export const getCategoriesArr = arr => arr.filter(data => data.comments !== '');
export const getIncome = arr => arr.filter(item => item.type === '-');

export const getFilteredDataBySelectedMonth = (arr, selctedMonth) => {
  const income = getIncome(arr);
  return income.filter(el => months[new Date(el.date).getMonth()] === selctedMonth);
};

export const getFilteredDataBySelectedYear = (arr, selectedYear) => {
  const income = getIncome(arr);
  return income.filter(el => String(new Date(el.date).getFullYear()) === selectedYear);
};

export const getFilteredDataByYearAndMonth = (data, year, month) =>
  getFilteredDataBySelectedMonth(getFilteredDataBySelectedYear(data, year), month);

const getAmountSum = arr => arr.reduce((acc, current) => acc + current.amount, 0);

export const getChartData = arr => {
  const income = getIncome(arr);
  const labels = [...new Set(income.map(i => i.category))];
  const dataListByCategory = labels.map(category => income.filter(item => item.category === category));
  const data = dataListByCategory.map(categoryArr => getAmountSum(categoryArr));
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
    const month = months[new Date(date).getMonth()];
    if (!uniqMonth.includes(month)) uniqMonth.push(month);
  });
  return uniqMonth;
};

export const getYears = arr => {
  const uniqYear = [];
  arr.forEach(({ date }) => {
    const year = String(new Date(date).getFullYear());
    if (!uniqYear.includes(year)) uniqYear.push(year);
  });
  return uniqYear;
};
