import React from 'react';
import request from '../utils/request';

export default class App extends React.Component {
state = {
  store: {
    byId: {},
    allIds: [],
  },
  id: '',
  value: 'w',
  name: 'e',
  page: 'r',
  perPage: 'w',
}

componentDidMount() {
  const { store } = this.props;
  this.setState({ store });
}

    idChange = async (e) => {
      const {
        value, name, page, perPage,
      } = this.state;
      const id = e.target.value;
      this.setState({ id });
      const data = await request({ id, value, name, page, perPage });
      console.log(data);
    }

    render() {
      const { store } = this.state;
      const { allIds, byId } = store;
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
                  { allIds.map((item) => {
                    const { id, name, value } = byId[item];
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
                Id:
                <input className="form-control w-50" type="number" placeholder="id" onChange={this.idChange} />
                Name:
                <input className="form-control" type="text" placeholder="name" />
                Value:
                <input className="form-control w-50" type="number" placeholder="min" min="0" />
                <input className="form-control w-50" type="number" placeholder="max" />
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
