import { min, max } from 'lodash';

export default (store) => {
  const values = store.map(i => i.value);
  return [min(values), max(values)];
};
