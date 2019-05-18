export default (sort, method) => {
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
  return sortObj.now;
};
