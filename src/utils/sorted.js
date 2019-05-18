import { sortBy } from 'lodash';

export default (filtered, method) => {
  const sortObj = {
    was: method,
    result: [],
  };
  switch (method) {
    case 'idMaxToMin':
      sortObj.result = sortBy(filtered, (item => item.id));
      break;
    case 'idMinToMax':
      sortObj.result = sortBy(filtered, (item => item.id)).reverse();
      break;
    case 'nameZ-A':
      sortObj.result = sortBy(filtered, (item => item.name));
      break;
    case 'nameA-Z':
      sortObj.result = sortBy(filtered, (item => item.name)).reverse();
      break;

    case 'maxToMin':
      sortObj.result = sortBy(filtered, (item => item.value));
      break;
    case 'minToMax':
      sortObj.result = sortBy(filtered, (item => item.value)).reverse();
      break;

    default:
      break;
  }
  return sortObj.result;
};
