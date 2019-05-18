import axios from 'axios';

export default async ({
  id, value, name, page, perPage,
}) => {
  const request = await axios.get('/api/v1/data/', {
    params: {
      id,
      value,
      name,
      page,
      perPage,
    },
  });
  return request;
};
