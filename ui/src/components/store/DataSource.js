import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000';
const GRAPHQL_ENDPOINT = `${API_ENDPOINT}/graphql`;

class DataSource {
  constructor(errHandler) {
    this.errHandler = errHandler || (() => {});
  }

  async graphQLFetch(query, variables = {}) {
    try {
      const response = await this.sendRequest('POST', GRAPHQL_ENDPOINT, {
        query,
        variables,
      });
      // Based on Axios response object schema.
      const { data } = response;
      if (data.errors && data.data === null) {
        const error = data.errors[0];
        throw new Error(error.message);
      }

      return data.data;
    } catch (error) {
      console.error('graphQLFetch error: ', error);
    }

    return undefined;
  }

  async postData(endPoint, data) {
    try {
      const response = await this.sendRequest(
        'POST',
        `${API_ENDPOINT}${endPoint}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('postData error:', error.message);
    }

    return undefined;
  }

  async deleteData(endPoint, data) {
    try {
      const response = await this.sendRequest(
        'DELETE',
        `${API_ENDPOINT}${endPoint}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('deleteData error: ', error.message);
    }

    return undefined;
  }

  // eslint-disable-next-line class-methods-use-this
  sendRequest(method, url, data) {
    return axios.request({ method, url, data });
  }
}

export { API_ENDPOINT, GRAPHQL_ENDPOINT };
export default DataSource;
