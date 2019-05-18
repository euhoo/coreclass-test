import querystring from 'querystring';

export default (store, query) => {
  const {
    id, minValue, maxValue, name, page, perPage,
  } = querystring.parse(query);


  const filteredById = id.length === 0 ? store : store.filter(i => i.id === +id);

  const filteredByName = name.length === 0 ? filteredById : filteredById.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));

  const filteredByMinValue = minValue.length === 0 ? filteredByName : filteredByName.filter(i => i.value >= minValue);
  const filteredByMaxValue = maxValue.length === 0 ? filteredByMinValue : filteredByMinValue.filter(i => i.value <= maxValue);
  const findNewPerPage = (oldPerPage, currentStore) => {
    if (oldPerPage.length === 0) return currentStore.length;
    if (oldPerPage <= 0 || oldPerPage > currentStore.length) return currentStore.length;
    return oldPerPage;
  };
  const newPerPage = findNewPerPage(perPage, filteredByMaxValue);
  const numberOfPages = Math.ceil(filteredByMaxValue.length / newPerPage);
  const findNewPage = (oldPage) => {
    if (oldPage.length === 0 || oldPage <= 0) return 1;
    if (oldPage > numberOfPages) return numberOfPages;
    return oldPage;
  };

  const newPage = findNewPage(page, filteredByMaxValue);


  const minElIndex = (newPage - 1) * newPerPage;
  const maxElIndex = newPage * newPerPage;
  const result = filteredByMaxValue.filter((_i, index) => (index >= minElIndex && index < maxElIndex));
  return {
    store: result, page: newPage, perPage: newPerPage, name, id, minValue, maxValue,
  };
};
