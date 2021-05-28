import React, { Component } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sortKeys = [
  { label: 'Newest', value: '-createdDate' },
  { label: 'Oldest', value: 'createdDate' },
  { label: 'A-Z', value: 'name' },
  { label: 'Z-A', value: '-name' },
];

export default function ListControlSort({ sort, applyControl }) {
  const handleChange = ({ target: { value } }) => {
    applyControl({ sort: value });
  };

  const createSortOptions = (data, currentValue) =>
    data.map(({ label, value }) => (
      <Form.Check
        key={value}
        type="radio"
        id={label}
        label={label}
        name="sort"
        value={value}
        checked={currentValue === value}
        onChange={handleChange}
      />
    ));

  const sortOptions = createSortOptions(sortKeys, sort);

  return (
    <Dropdown className="list-control__dropdown list-control__dropdown--filter">
      <Dropdown.Toggle
        variant="primary"
        id="list-sort"
        className="list-control__btn"
      >
        <FontAwesomeIcon icon="sort-alpha-down" /> Sort
      </Dropdown.Toggle>
      <Dropdown.Menu className="list-control__menu list-control__menu--sort">
        {sortOptions}
      </Dropdown.Menu>
    </Dropdown>
  );
}

// export default class ListControlSort extends Component {
//   constructor() {
//     super();
//     this.state = { sort: sortKeys[0].value };
//   }

//   handleChange = ({ target: { value } }) => {
//     const { applyControl } = this.props;

//     applyControl({ sort: value });
//   };

//   createSortOptions(data, currentValue) {
//     return data.map(({ label, value }) => (
//       <Form.Check
//         key={value}
//         type="radio"
//         id={label}
//         label={label}
//         name="sort"
//         value={value}
//         checked={currentValue === value}
//         onChange={this.handleChange}
//       />
//     ));
//   }

//   render() {
//     const { sort } = this.props;

//     const sortOptions = this.createSortOptions(sortKeys, sort);

//     return (
//       <Dropdown className="list-control__dropdown list-control__dropdown--filter">
//         <Dropdown.Toggle
//           variant="primary"
//           id="list-sort"
//           className="list-control__btn"
//         >
//           <FontAwesomeIcon icon="sort-alpha-down" /> Sort
//         </Dropdown.Toggle>
//         <Dropdown.Menu className="list-control__menu list-control__menu--sort">
//           {sortOptions}
//         </Dropdown.Menu>
//       </Dropdown>
//     );
//   }
// }
