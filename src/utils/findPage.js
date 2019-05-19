export default (oldPage, numberOfPages) => {
  if (oldPage.length === 0 || oldPage <= 0) return 1;
  if (oldPage > numberOfPages) return numberOfPages;
  return oldPage;
};
