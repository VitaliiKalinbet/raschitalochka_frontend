export const colors = [
  'rgb(236, 178, 42)',
  'rgb(226, 139, 32)',
  'rgb(210, 89, 37)',
  'rgb(103, 183, 208)',
  'rgb(85, 147, 215)',
  'rgb(255, 171, 0)',
  'rgb(156, 194, 84)',
  'rgb(115, 173, 87)',
  'rgb(185, 199, 177)',
  'rgb(217, 165, 170)',
  'rgb(100, 84, 40)',
  'rgb(26, 71, 60)'
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const options = {
  border: 2000,
  responsive: true,
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  },
  pieceLabel: {
    render(args) {
      return args.label;
    },
    fontSize: 10,
    fontColor: '#fff',
    position: 'default',
    overlap: true
  }
};
