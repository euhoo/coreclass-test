import React from 'react';
import request from '../utils/request';

export default class App extends React.Component {
state = {
  store: [],
  id: '',
  value: '',
  name: '',
  page: 1,
  perPage: 10,
}

componentDidMount() {
  /* when loading store is empty.
    when load it fills with all entries
  */
  const { store } = this.props;
  this.setState({ store });
}

    idChange = async ({ target }) => {
      const {
        value, name, page, perPage,
      } = this.state;
      const id = target.value;
      const response = await request({
        id, value, name, page, perPage,
      });
      this.setState({ store: response.data, id });
    }

    nameChange = async ({ target }) => {
      const {
        value, id, page, perPage,
      } = this.state;
      const name = target.value;
      const response = await request({
        id, value, name, page, perPage,
      });
      this.setState({ store: response.data, name });
    }

    render() {
      const { store } = this.state;
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9">
              Elements
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
                {/* не могу здесь использовать тип "number" для input ID,name & value потому,что мне придется
              или по ходу выполнения программы менять тип переменной(что очень плохо) или в фильтр будут
              попадать начальные цифровые(нулевые) значения каких-то полей и тогда фильтр будет работать
              не правильно */}
                Id:
                <input className="form-control w-50" type="text" placeholder="id" onChange={this.idChange} />
                Name:
                <input className="form-control" type="text" placeholder="name" onChange={this.nameChange} />
                Value:
                <input className="form-control w-50" type="text" placeholder="min" />
                <input className="form-control w-50" type="text" placeholder="max" />
                Count of pages:
                <input className="form-control w-50" type="number" placeholder="pages" min="0" />
                Count of elements per page:
                <input className="form-control w-50" type="number" placeholder="per page" min="0" />
              </div>
            </div>
          </div>
        </div>


      );
    }
}
