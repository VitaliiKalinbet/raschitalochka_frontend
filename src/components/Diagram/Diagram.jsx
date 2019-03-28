import React from 'react';
// import ReactTable from 'react-table';

import Button from '../Button/Button';
import Table from '../Table/Table';
import Chart from '../Chart/Chart';

import s from './Diagram.module.css';

const Diagram = ({ financeData }) => {
  console.log(financeData);
  return (
    <div className={s.wrap}>
      <Chart />
      <p className={s.title}>Cost Diagram</p>
      <div className={s.diagramWrap} />
      <Button value="Udate" />
      <div className={s.selectors}>
        <select className={s.manthSelect} name="manth">
          <option value="January">January</option>
          <option value="February">February</option>
        </select>
        <select className={s.yearSelect} name="year">
          <option value="2019">2019</option>
        </select>
      </div>

      <Table />
    </div>
  );
};

Diagram.defaultProps = {
  financeData: []
};

Diagram.propTypes = {
  financeData: PropTypes.arrayOf(PropTypes.array)
};

export default Diagram;
