/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import request from '../utils/request';
import Table from './Table';
import findSort from '../utils/findSort';
import FilterCol from './FilterCol';

export default class App extends React.Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
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
    /*
     У меня был выбор или ограничить в инпуте количество страниц максимально возможным
      или после последней страницы выводить пустые страницы, а для показателя per page
      просто ничего не менять, если показатель per page больше,чем количество элементов.
      Выбрал пекрвый вариант, поэтому в строчке 31 я дополниительно устанавливаю в state
      возвращенное значение из запроса.
    */
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
          <Table store={store} page={page} makeSort={this.makeSort} />
          <FilterCol makeFilter={this.makeFilter} makeReset={this.makeReset} state={this.state} />
        </div>
      </div>
    );
  }
}
