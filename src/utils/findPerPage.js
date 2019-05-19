export default (oldPerPage, currentStore) => {
  if (oldPerPage.length === 0) return currentStore.length;
  if (oldPerPage <= 0 || oldPerPage > currentStore.length) return currentStore.length;
  return oldPerPage;
};
