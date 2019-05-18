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
  const { store } = this.props;
  const [minValue, maxValue] = findMinMax(store);
  this.setState({ store, minValue, maxValue });
}

    idChange = async ({ target }) => {
      await this.setState({ id: target.value });
      const response = await request(this.state);
      const { store, id, minValue, maxValue, name, page, perPage } = response.data;
      this.setState({ store, id, minValue, maxValue, name, page, perPage });
    }

    nameChange = async ({ target }) => {
      await this.setState({ name: target.value });
      const response = await request(this.state);
      const { store, id, minValue, maxValue, name, page, perPage } = response.data;
      this.setState({ store, id, minValue, maxValue, name, page, perPage });
    }

    minValueChange = async ({ target }) => {
      await this.setState({ minValue: target.value });
      const response = await request(this.state);
      const { store, id, minValue, maxValue, name, page, perPage } = response.data;
      this.setState({ store, id, minValue, maxValue, name, page, perPage });
    }

    maxValueChange = async ({ target }) => {
      await this.setState({ maxValue: target.value });
      const response = await request(this.state);
      const { store, id, minValue, maxValue, name, page, perPage } = response.data;
      this.setState({ store, id, minValue, maxValue, name, page, perPage });
    }

    perPageChange = async ({ target }) => {
      await this.setState({ perPage: target.value });
      const response = await request(this.state);
      const { store, id, minValue, maxValue, name, page, perPage } = response.data;
      this.setState({ store, id, minValue, maxValue, name, page, perPage });
    }

    pageChange = async ({ target }) => {
      await this.setState({ page: target.value });
      const response = await request(this.state);
      const { store, id, minValue, maxValue, name, page, perPage } = response.data;
      this.setState({ store, id, minValue, maxValue, name, page, perPage });
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
                Filter
              <div>
                Id:
                <input className="form-control w-50" type="number" placeholder="id" onChange={this.idChange} />
                Name:
                <input className="form-control" type="text" placeholder="name" onChange={this.nameChange} />
                Value:
                <input className="form-control w-50" type="number" placeholder="min" onChange={this.minValueChange} />
                <input className="form-control w-50" type="number" placeholder="max" onChange={this.maxValueChange} />
                Pages:
                <input className="form-control w-50" type="number" placeholder="page" min="1" value={page} onChange={this.pageChange} />
                Elements per page:
                <input className="form-control w-50" type="number" min="1" value={perPage} onChange={this.perPageChange} />

              </div>
            </div>
          </div>
        </div>


      );
    }
}
