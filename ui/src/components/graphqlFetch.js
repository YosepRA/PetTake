import axios from 'axios';

export default async function graphqlFetch(query, variables = {}) {
  const apiEndPoint = 'http://localhost:3000/graphql';

  try {
    const response = await axios.post(apiEndPoint, { query, variables });
    return response.data.data;
  } catch (error) {
    console.log('graphqlFetch error: ', error);
  }

  return undefined;
}
