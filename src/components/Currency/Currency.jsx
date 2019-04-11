import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import * as s from './Currency.module.css';

export default class Currency extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    const apiUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11';
    fetch(apiUrl)
      .then(resp => resp.json())
      .then(data => {
        console.log('resp axios privatbank', data);

        this.setState({
          data
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
          {data.length > 0 ? (
            data.map(obj => {
              return (
                <div className={s.tableRow} key={obj.ccy}>
                  <div className={s.tableRowItem}>{obj.ccy}</div>
                  <div className={s.tableRowItem}>{obj.buy}</div>
                  <div className={s.tableRowItem}>{obj.sale}</div>
                </div>
              );
            })
          ) : (
            <div className={s.loader}>
              <Loader type="Oval" color="#grey" height="50" width="50" />
            </div>
          )}
        </div>
        <div className={s.background} />
      </div>
    );
  }
}
