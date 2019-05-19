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

  // Сортировка

  const sorted = makeSort(filteredByMaxValue, sort);

  // Пагинация

  const newPerPage = findPerPage(perPage, sorted);
  const numberOfPages = Math.ceil(sorted.length / newPerPage);

  const newPage = findPage(page, numberOfPages);
  const minElIndex = (newPage - 1) * newPerPage;
  const maxElIndex = newPage * newPerPage;

  const totalFiltered = sorted
    .filter((_i, index) => (index >= minElIndex && index < maxElIndex));

  // Возвращаю результат

  return {
    store: totalFiltered,
    page: newPage,
    perPage: newPerPage,
    name,
    id,
    minValue,
    maxValue,
    sort,
  };
};
