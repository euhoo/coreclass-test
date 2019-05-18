import React from 'react';
import request from '../utils/request';
import findMinMax from '../utils/findMinMax';

export default class App extends React.Component {
state = {
  store: [],
  id: '',
  minValue: 0,
  maxValue: 10,
  name: '',
  page: 1,
  perPage: 10,
}

componentDidMount() {
  /*
  when loading store is empty.
  when load it fills with all entries
  */
  const { store } = this.props;
  const [minValue, maxValue] = findMinMax(store);
  this.setState({ store, minValue, maxValue });
}

    idChange = async ({ target }) => {
      const {
        minValue, maxValue, name, page, perPage,
      } = this.state;
      const id = target.value;
      // this.setState({ id });
      const response = await request({
        id, minValue, maxValue, name, page, perPage,
      });
      this.setState({ store: response.data.store, id });
    }

    nameChange = async ({ target }) => {
      const {
        minValue, maxValue, id, page, perPage,
      } = this.state;
      const name = target.value;
      // this.setState({ name });
      const response = await request({
        id, minValue, maxValue, name, page, perPage,
      });
      this.setState({ store: response.data.store, name });
    }

    minValueChange = async ({ target }) => {
      const {
        id, maxValue, name, page, perPage,
      } = this.state;
      const minValue = target.value;
      // this.setState({ minValue });
      const response = await request({
        id, minValue, maxValue, name, page, perPage,
      });
      this.setState({ store: response.data.store, minValue });
    }

    maxValueChange = async ({ target }) => {
      const {
        id, minValue, name, page, perPage,
      } = this.state;
      const maxValue = target.value;
      // this.setState({ minValue });
      const response = await request({
        id, minValue, maxValue, name, page, perPage,
      });
      this.setState({ store: response.data.store, maxValue });
    }

    perPageChange = async ({ target }) => {
      const {
        id, minValue, maxValue, name, page,
      } = this.state;
      const perPage = target.value;
      // this.setState({ minValue });
      const response = await request({
        id, minValue, maxValue, name, page, perPage,
      });
      console.log(response.data.perPage);
      this.setState({ store: response.data.store, perPage: response.data.perPage });
    }

    pageChange = async ({ target }) => {
      const {
        id, minValue, maxValue, name, perPage,
      } = this.state;
      const page = target.value;
      // this.setState({ minValue });
      const response = await request({
        id, minValue, maxValue, name, page, perPage,
      });
      this.setState({ store: response.data.store, page: +response.data.page });
    }

    render() {
      const { store, page, perPage } = this.state;
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9">
              {`Elements, page ${page}:`}
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  { store.map((item) => {
                    const { id, name, value } = item;
                    return (
                      <tr key={id}>
                        <th scope="row">{id}</th>
                        <td>{name}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-12 col-sm-3">
              Sort & filter
              <div>
                {/*
              не могу здесь использовать тип "number" для input ID,name & value потому,что мне придется
              или по ходу выполнения программы менять тип переменной(что очень плохо) или в фильтр будут
              попадать начальные цифровые(нулевые) значения каких-то полей и тогда фильтр будет работать
              не правильно
              */}
                Id:
                <input className="form-control w-50" type="text" placeholder="id" onChange={this.idChange} />
                Name:
                <input className="form-control" type="text" placeholder="name" onChange={this.nameChange} />
                Value:
                <input className="form-control w-50" type="number" placeholder="min" onChange={this.minValueChange} />
                <input className="form-control w-50" type="number" placeholder="max" onChange={this.maxValueChange} />
                Pages:
                <input className="form-control w-50" type="number" placeholder="page" min="1" onChange={this.pageChange} />
                Elements per page:
                <input className="form-control w-50" type="number" placeholder={`max ${store.length}`} min="1" value={perPage} onChange={this.perPageChange} />
              </div>
            </div>
          </div>
        </div>


      );
    }
}
