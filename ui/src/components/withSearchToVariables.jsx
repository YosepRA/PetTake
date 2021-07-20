import React, { Component } from 'react';

const controlKeys = [
  { key: 'breed', dataType: 'string' },
  { key: 'gender', dataType: 'string' },
  { key: 'age', dataType: 'string' },
  { key: 'coatLength', dataType: 'string' },
  { key: 'preferHomeWith', dataType: 'array' },
  { key: 'preferHomeWithout', dataType: 'array' },
  { key: 'health', dataType: 'array' },
  { key: 'sort', dataType: 'string' },
];

// Convert URL search params to GraphQL variables.
function paramsToVariables(search) {
  const params = new URLSearchParams(search);
  const variables = {};

  // Get the key-value pair.
  // Then, filter out the unused parameters.
  const data = controlKeys
    .map(({ key, dataType }) => {
      const value = dataType === 'array' ? params.getAll(key) : params.get(key);
      return { key, value };
    })
    .filter(({ value }) => {
      const isArray = Array.isArray(value);
      let result;
      if (isArray) result = value.length > 0;
      else result = value !== null;

      return result;
    });
  // Convert it to final variables object.
  data.forEach(({ key, value }) => {
    variables[key] = value;
  });

  return variables;
}

export default function withSearchToVariables(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        variables: {},
      };
    }

    componentDidMount() {
      this.parseSearch();
    }

    componentDidUpdate(prevProps) {
      const {
        location: { search: prevSearch },
      } = prevProps;
      const {
        location: { search: currentSearch },
      } = this.props;

      if (prevSearch !== currentSearch) this.parseSearch();
    }

    parseSearch = () => {
      const {
        location: { search },
      } = this.props;
      const variables = paramsToVariables(search);

      this.setState({ variables });
    };

    render() {
      const { variables } = this.state;

      return <WrappedComponent variables={variables} />;
    }
  };
}
