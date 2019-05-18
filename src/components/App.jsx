import React from 'react';
import axios from 'axios';

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

    idChange = (e) => {
      const {
        value, name, page, perPage,
      } = this.state;
      const id = e.target.value;
      this.setState({ id });
      const data = {
 id, value, name, page, perPage 
};
      console.log(data);
      const request = JSON.stringify(data);
      console.log(request);

      axios.get('/api/v1/data/', {
        params: {
          id,
          value,
          name,
          page,
          perPage,
        },
      })
        .then(response => console.log(response));
    }

    render() {
      const { store } = this.state;
      const { allIds, byId } = store;
      return (
        <table className="table table-sm">
          <thead>
            <tr>
              <th>
                <input className="form-control" type="text" placeholder="id" onChange={this.idChange} />
              </th>
              <th><input className="form-control" type="text" placeholder="name" /></th>
              <th>
                <input className="form-control" type="text" placeholder="min" />
                <input className="form-control" type="text" placeholder="max" />

              </th>
            </tr>
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
      );
    }
}
