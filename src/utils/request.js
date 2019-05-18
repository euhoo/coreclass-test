import axios from 'axios';

export default async ({
  id, minValue, maxValue, name, page, perPage,
}) => {
 // const res = `id: ${id},min: ${minValue}, max: ${maxValue}, name: ${name}, page: ${page}, perPage: ${perPage}`;
  const request = await axios.get('/api/v1/data/', {
    params: {
      id,
      minValue,
      maxValue,
      name,
      page,
      perPage,
    },
  });
  return request;
};
