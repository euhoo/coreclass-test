export default (store, response) => {
    const { id, value, name, page, perPage } = response;
    const filtered = store.filter(item => item.id == id);
  return filtered;
};
