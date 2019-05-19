import axios from 'axios';

export default async ({
  id, minValue, maxValue, name, page, perPage, sort,
}) => {
  const request = await axios.get('/api/v1/data/', {
    params: {
      id,
      minValue,
      maxValue,
      name,
      page,
      perPage,
      sort,
    },
  });
  return request;
};
