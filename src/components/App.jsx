import React from 'react';
import request from '../utils/request';
import Table from './Table';
import findSort from '../utils/findSort';
import FilterCol from './FilterCol';

export default class App extends React.Component {
  state = {
    store: this.props.store,
    id: '',
    minValue: 0,
    maxValue: 10,
    name: '',
    page: 1,
    perPage: 10,
    sort: 'idMinToMax',
  }

  makeFilter = str => async ({ target }) => {
    await this.setState({ [str]: target.value });
    const response = await request(this.state);
    this.setState({ store: response.data.store, [str]: response.data[str] });
  }

    makeReset = async () => {
      const response = await request({
        id: '', minValue: 0, maxValue: 10, name: '', page: 1, perPage: 10, sort: 'idMinToMax',
      });
      this.setState({ ...response.data });
    }

    makeSort = method => async () => {
      const { sort } = this.state;
      const res = findSort(sort, method);
      await this.setState({ sort: res });
      const response = await request(this.state);
      this.setState({ ...response.data });
    }

    render() {
      const { store, page } = this.state;
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9">
              {`Elements, page ${page}:`}
              <Table store={store} makeSort={this.makeSort} />
            </div>
            <div className="col-12 col-sm-3">
              Filter
              <FilterCol makeFilter={this.makeFilter} makeReset={this.makeReset} state={this.state} />
            </div>
          </div>
        </div>


      );
    }
}
