import React from 'react';

const FilterCol = (props) => {
  const { makeFilter, makeReset, state } = props;
  const {
    store, page, perPage, id, name, minValue, maxValue,
  } = state;
  return (
    <div className="col-12 col-sm-3">
      Filter
      <div>
        Id:
        <input className="form-control w-50" type="number" placeholder="id" value={id} onChange={makeFilter('id')} />
        Name:
        <input className="form-control" type="text" placeholder="name" value={name} onChange={makeFilter('name')} />
        Value:
        <input className="form-control w-50" type="number" placeholder="min" value={minValue} onChange={makeFilter('minValue')} />
        <input className="form-control w-50" type="number" placeholder="max" value={maxValue} onChange={makeFilter('maxValue')} />
        Page:
        <input className="form-control w-50" type="number" placeholder="page" value={page} min="1" onChange={makeFilter('page')} />
        Elements per page:
        <input className="form-control w-50" type="number" placeholder={`max ${store.length}`} min="1" value={perPage} onChange={makeFilter('perPage')} />
        <button type="button" className="btn btn-secondary btn-sm" onClick={makeReset}>Reset</button>
      </div>
    </div>
  );
};
export default FilterCol;
