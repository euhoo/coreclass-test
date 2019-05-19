import querystring from 'querystring';
import makeSort from './makeSort';
import findPerPage from './findPerPage';
import findPage from './findPage';

/*

Последовательно фильтрую по ID, name, minValue-maxValue.
Далее выполняю пагинацию.
Далее выполняю сортировку полученной страницы.

*/

export default (store, query) => {
  const {
    id, minValue, maxValue, name, page, perPage, sort,
  } = querystring.parse(query);

  // Фильтрация

  const filteredById = (!id) ? store : store.filter(i => i.id === +id);

  const filteredByName = name.length === 0 ? filteredById
    : filteredById.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));

  const filteredByMinValue = minValue.length === 0 ? filteredByName
    : filteredByName.filter(i => i.value >= minValue);

  const filteredByMaxValue = maxValue.length === 0 ? filteredByMinValue
    : filteredByMinValue.filter(i => i.value <= maxValue);

  // Пагинация

  const newPerPage = findPerPage(perPage, filteredByMaxValue);
  const numberOfPages = Math.ceil(filteredByMaxValue.length / newPerPage);

  const newPage = findPage(page, numberOfPages);
  const minElIndex = (newPage - 1) * newPerPage;
  const maxElIndex = newPage * newPerPage;

  const totalFiltered = filteredByMaxValue
    .filter((_i, index) => (index >= minElIndex && index < maxElIndex));

  // Сортировка

  const result = makeSort(totalFiltered, sort);

  // Возвращаю результат
  return {
    store: result,
    page: newPage,
    perPage: newPerPage,
    name,
    id,
    minValue,
    maxValue,
    sort,
  };
};
