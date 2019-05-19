import React from 'react';

const Table = (props) => {
  const { store, makeSort, page } = props;
  return (
    <div className="col-12 col-sm-9">
      {`Elements, page ${page}:`}
      <table className="table table-sm">
        <thead>
          <tr>
            {['id', 'name', 'value'].map(item => (
              <th key={item}>
                <div>{item}</div>
                <button type="button" className="btn btn-light btn-sm" onClick={makeSort(item)}>sort</button>
              </th>
            ))}
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
  );
};
export default Table;
