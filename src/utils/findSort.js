export default (sort, method) => {
  switch (method) {
    case 'id':
      return sort === 'idMinToMax' ? 'idMaxToMin' : 'idMinToMax';
    case 'name':
      return sort === 'nameZ-A' ? 'nameA-Z' : 'nameZ-A';
    case 'value':
      return sort === 'maxToMin' ? 'minToMax' : 'maxToMin';
    default:
      return sort;
  }
};
