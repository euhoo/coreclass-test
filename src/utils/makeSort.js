import { sortBy } from 'lodash';

export default (filtered, method) => {
  switch (method) {
    case 'idMaxToMin':
      return sortBy(filtered, (item => item.id)).reverse();
    case 'idMinToMax':
      return sortBy(filtered, (item => item.id));
    case 'nameZ-A':
      return sortBy(filtered, (item => item.name)).reverse();
    case 'nameA-Z':
      return sortBy(filtered, (item => item.name));
    case 'maxToMin':
      return sortBy(filtered, (item => item.value)).reverse();
    case 'minToMax':
      return sortBy(filtered, (item => item.value));
    default:
      return filtered;
  }
};
