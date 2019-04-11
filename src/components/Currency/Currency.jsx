import React, { Component } from 'react';
import axios from 'axios';

import * as s from './Currency.module.css';

export default class Currency extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    const apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11';
    axios
      .get(apiUrl)
      .then(resp => {
        console.log('resp axios privatbank', resp);
        this.setState(state => {
          const data = state.data.concat(resp.data);
          return { data };
        });
      })
      .catch(err => console.log('privatbank api', err));
  };

  render() {
    const { data } = this.state;

    return (
      <div className={s.container}>
        <div className={s.tableHeading}>
          <div className={s.tableHeadingItem}>Currency</div>
          <div className={s.tableHeadingItem}>Sale</div>
          <div className={s.tableHeadingItem}>Purshase</div>
        </div>
        <div className={s.content}>
          {data.length > 0
            ? data.map(obj => {
                return (
                  <div className={s.tableRow} key={obj.ccy}>
                    <div className={s.tableRowItem}>{obj.ccy}</div>
                    <div className={s.tableRowItem}>{obj.buy}</div>
                    <div className={s.tableRowItem}>{obj.sale}</div>
                  </div>
                );
              })
            : ''}
        </div>
        <div className={s.background} />
      </div>
    );
  }
}
