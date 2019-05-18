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
  sort: 'idMinToMax',
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

    filter = str => async ({ target }) => {
      await this.setState({ [str]: target.value });
      const response = await request(this.state);
      this.setState({ store: response.data.store });
    }

    paging = str => async ({ target }) => {
      await this.setState({ [str]: target.value });
      const response = await request(this.state);
      this.setState({ store: response.data.store, [str]: response.data[str] });
    }

    onReset = async () => {
      const response = await request({
        id: '', minValue: 1, maxValue: 10, name: '', page: 1, perPage: 10, sort: 'idToUp',
      });
      const { store } = response.data;
      const [min, max] = findMinMax(store);
      console.log(response.data);
      this.setState({ ...response.data });
    }

    onSort = method => async () => {
      const { sort } = this.state;
      const sortObj = {
        was: sort,
        now: '',
      };
      switch (method) {
        case 'id':
          sortObj.now = sortObj.was === 'idMinToMax' ? 'idMaxToMin' : 'idMinToMax';
          break;
        case 'name':
          sortObj.now = sortObj.was === 'nameZ-A' ? 'nameA-Z' : 'nameZ-A';
          break;
        case 'value':
          sortObj.now = sortObj.was === 'maxToMin' ? 'minToMax' : 'maxToMin';
          break;
        default:
          break;
      }
      await this.setState({ sort: sortObj.now });
      const response = await request(this.state);
      this.setState({ ...response.data });
    }

    render() {
      const {
        store, page, perPage, id, name, minValue, maxValue,
      } = this.state;
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9">
              {`Elements, page ${page}:`}
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>
                      Id
                      <button type="button" className="btn btn-light btn-sm" onClick={this.onSort('id')}>sort</button>
                    </th>
                    <th>
                      Name
                      <button type="button" className="btn btn-light btn-sm" onClick={this.onSort('name')}>sort</button>
                      
                    </th>
                    <th>
                      Value
                      <button type="button" className="btn btn-light btn-sm" onClick={this.onSort('value')}>sort</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { store.map((item) => {
                    // eslint-disable-next-line no-shadow
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
                <input className="form-control w-50" type="number" placeholder="id" value={id} onChange={this.filter('id')} />
                Name:
                <input className="form-control" type="text" placeholder="name" value={name} onChange={this.filter('name')} />
                Value:
                <input className="form-control w-50" type="number" placeholder="min" value={minValue} onChange={this.filter('minValue')} />
                <input className="form-control w-50" type="number" placeholder="max" value={maxValue} onChange={this.filter('maxValue')} />
                Pages:
                <input className="form-control w-50" type="number" placeholder="page" value={page} min="1" onChange={this.paging('page')} />
                Elements per page:
                <input className="form-control w-50" type="number" placeholder={`max ${store.length}`} min="1" value={perPage} onChange={this.paging('perPage')} />
                <button type="button" className="btn btn-secondary btn-sm" onClick={this.onReset}>Reset</button>
              </div>
            </div>
          </div>
        </div>


      );
    }
}
