import axios from 'axios';

// Axios global defaults.
axios.defaults.withCredentials = true;

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '';
const GRAPHQL_ENDPOINT = `${API_ENDPOINT}/graphql`;

class DataSource {
  constructor(errHandler) {
    /* This error handler constructor is pretty much useless right now.
    I'll probably use it for a more proper error handling on later
    development. */
    this.errHandler = errHandler || (() => {});
  }

  async graphQLFetch(query, variables = {}, options = {}) {
    const response = await this.sendRequest('POST', GRAPHQL_ENDPOINT, {
      query,
      variables,
      options,
    });
    // Based on Axios response object schema.
    const { data } = response;
    if (data.errors && data.data === null) {
      const error = data.errors[0];
      throw new Error(error.message);
    }

    return data.data;
  }

  async getData(endPoint, options = {}) {
    try {
      const response = await this.sendRequest(
        'GET',
        `${API_ENDPOINT}${endPoint}`,
        {},
        options,
      );
      return response.data;
    } catch (error) {
      console.error('getData error:', error.message);
    }

    return undefined;
  }

  async postData(endPoint, data, options = {}) {
    try {
      const response = await this.sendRequest(
        'POST',
        `${API_ENDPOINT}${endPoint}`,
        data,
        options,
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
  sendRequest(method, url, data, options = {}) {
    return axios.request({ method, url, data, ...options });
  }
}

export { API_ENDPOINT, GRAPHQL_ENDPOINT };
export default DataSource;
