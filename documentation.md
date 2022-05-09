# Documentation

## PetTake Technical Design

Main technologies that are used in the application.

### Server

- Node
- Express

### Database

- MongoDB
- Mongoose

### API

- GraphQL
- Apollo server
- REST

### Authentication

- Passport  
  Username-password.

### Front-end

- React  
  create-react-app
- SASS  
  Manual compile using VScode extension.

---

## PetTake API Specification

### **Data Structures**

### Pet

```
{
  _id: ID,
  createdDate: String,
  name: String,
  breed: String,
  age: String,
  gender: String,
  coatLength: String,
  preferHomeWith: [String],
  preferHomeWithout: [String],
  health: [String],
  images: [{
    publicId: String,
    url: String,
  }],
  description: String,
  author: User,
}
```

Example:

```javascript
{
  _id: '123',
  createdDate: '2021-04-05T13:33:17.008Z',
  name: 'Nana',
  breed: 'Terrier',
  age: 'Puppy',
  gender: 'Female',
  coatLength: 'Medium',
  preferHomeWith: ['Other dogs', 'Children'],
  preferHomeWithout: ['Other cats'],
  health: ['Vaccinated', 'Spayed/neutered'],
  images: [{
    publicId: 'some-public-id',
    url: 'https://link.to.image',
  }],
  description: 'Nana is a good kid. She behaves well with your children to give them good memories.'
  author: 'User' // User information object.
}
```

### User

```
{
  _id: ID,
  username: String,
  email: String,
  password: String,
  name: String,
  phone: String,
  address: String,
  pets: [Pet]
}
```

Example:

```javascript
{
  _id: '123',
  username: 'bigjoe',
  email: 'bigjoe@mail.com',
  password: 'aodoiasjdoasijdioasljdoiasjd',
  name: 'Big Joe',
  phone: '+1 123 1234',
  address: '3434 Bubby Drive Taylor, TX 76574',
  pets: ['Pet1', 'Pet2'] // Populated with Pet collection.
}
```

### Image

```
{
  _id: ID,
  publicId: String,
  url: String
}
```

Example:

```javascript
{
  _id: 123,
  publicId: 'some-public-id',
  filename: 'https://link.to.image',
}
```

### **Input Types**

### Pet

```
{
  name: String,
  breed: String,
  age: String,
  gender: String,
  coatLength: String,
  preferHomeWith: [String],
  preferHomeWithout: [String],
  health: [String],
  images: [ImageInput],
  description: String
}
```

Example:

```javascript
{
  name: 'Nana',
  breed: 'Terrier',
  age: 'Puppy',
  gender: 'Female',
  coatLength: 'Medium',
  preferHomeWith: ['Other dogs', 'Children'],
  preferHomeWithout: ['Other cats'],
  health: ['Vaccinated', 'Spayed/neutered'],
  images: ['ImageInput'], // List of ImageInputs.
  description: 'Nana is a good kid. She behaves well with your children to give them good memories.'
}
```

### Image

```
{
  publicId: String,
  url: String
}
```

Example:

```javascript
{
  publicId: 'some-public-id',
  url: 'https://link.to.image',
}
```

### UserInfoUpdate

```
{
  email: String
  name: String
  phone: String
  address: String
}
```

Example:

```javascript
{
  email: 'joe@mail.com',
  name: 'Joe Marcotti',
  phone: '+1 2344 3993',
  address: 'South Dakota'
}
```

### **Queries**

### Home

- Query string:

```
query petList(
  $breed: String
  $age: String
  $gender: String
  $coatLength: String
  $preferHomeWith: [String]
  $preferHomeWithout: [String]
  $health: [String]
  $sort: String
  $page: Int
) {
  petList(
    breed: $breed
    age: $age
    gender: $gender
    coatLength: $coatLength
    preferHomeWith: $preferHomeWith
    preferHomeWithout: $preferHomeWithout
    health: $health
    sort: $sort
    page: $page
  ) {
    page
    pages
    total
    docs {
      _id
      name
      breed
      images {
        url
      }
    }
  }
}
```

- Response:

```javascript
{
  petList: {
    page: 2,
    pages: 23,
    total: 230,
    docs: [
      {
        _id: 123,
        name: 'Nana',
        breed: 'Terrier',
        images: [
          { url: 'https://link.to.image01' },
          { url: 'https://link.to.image02' },
          { url: 'https://link.to.image03' },
        ]
      },
      {
        _id: 124,
        name: 'Mike',
        breed: 'Poodle',
        images: [
          { url: 'https://link.to.image01' },
          { url: 'https://link.to.image02' },
          { url: 'https://link.to.image03' },
        ]
      },
      {
        _id: 125,
        name: 'Dusky',
        breed: 'Shepherd',
        images: [
          { url: 'https://link.to.image01' },
          { url: 'https://link.to.image02' },
          { url: 'https://link.to.image03' },
        ]
      }
      // ...
    ]
  }
}
```

### Details

- Query string:

```
query pet($_id: ID!) {
  pet(_id: $_id) {
    name
    breed
    gender
    age
    coatLength
    preferHomeWith
    preferHomeWithout
    health
    description
    images {
      publicId
      url
    }
    author {
      email
      phone
      address
    }
  }
}
```

- Response:

```javascript
{
  pet: {
    name: 'Nana',
    breed: 'Terrier',
    age: 'Puppy',
    gender: 'Female',
    coatLength: 'Medium',
    preferHomeWith: ['Other dogs', 'Children'],
    preferHomeWithout: ['Other cats'],
    health: ['Vaccinated', 'Spayed/neutered'],
    images: [
      { publicId: 'some-public-id', url: 'https://link.to.image01' },
      { publicId: 'some-public-id', url: 'https://link.to.image02' },
      { publicId: 'some-public-id', url: 'https://link.to.image03' },
    ],
    description: 'Nana is a good kid. She behaves well with your children to give them good memories.',
    author: {
      email: 'joe@mail.com',
      phone: '+1 3232 4343',
      address: 'South Dakota'
    }
  }
}
```

### User pet list

- Query string:

```
query userPetList(
  $breed: String
  $age: String
  $gender: String
  $coatLength: String
  $preferHomeWith: [String]
  $preferHomeWithout: [String]
  $health: [String]
  $sort: String
  $page: Int
) {
  userPetList(
    breed: $breed
    age: $age
    gender: $gender
    coatLength: $coatLength
    preferHomeWith: $preferHomeWith
    preferHomeWithout: $preferHomeWithout
    health: $health
    sort: $sort
    page: $page
  ) {
    page
    pages
    total
    docs {
      _id
      name
      breed
      images {
        url
      }
    }
  }
}
```

- Response:

```javascript
{
  userPetList: {
    page: 2,
    pages: 23,
    total: 230,
    docs: [
      {
        _id: 123,
        name: 'Nana',
        breed: 'Terrier',
        images: [
          { url: 'https://link.to.image01' },
          { url: 'https://link.to.image02' },
          { url: 'https://link.to.image03' },
        ]
      },
      {
        _id: 124,
        name: 'Mike',
        breed: 'Poodle',
        images: [
          { url: 'https://link.to.image01' },
          { url: 'https://link.to.image02' },
          { url: 'https://link.to.image03' },
        ]
      },
      {
        _id: 125,
        name: 'Dusky',
        breed: 'Shepherd',
        images: [
          { url: 'https://link.to.image01' },
          { url: 'https://link.to.image02' },
          { url: 'https://link.to.image03' },
        ]
      }
      // ...
    ]
  }
}
```

---

### **Mutation**

### User pet new

- Mutation string:

```
mutation petCreate($pet: PetInput!) {
  petCreate(pet: $pet) {
    _id
  }
}
```

- Response:

```javascript
{
  petCreate: {
    _id: 'asd0asdsd8ssd8sad'; // MongoDB generated IDs.
  }
}
```

### User pet update

- Mutation string:

```
mutation petUpdate($_id: ID!, $changes: PetUpdateInput!) {
  petUpdate(_id: $_id, changes: $changes) {
    _id
  }
}
```

- Response:

```javascript
{
  petUpdate: {
    _id: 'asd0asdsd8ssd8sad';
  }
}
```

### User info update

- Mutation string:

```
mutation userInfoUpdate($changes: UserInfoUpdateInput!) {
  userInfoUpdate(changes: $changes) {
    username
    name
    email
    phone
    address
  }
}
```

- Response:

```javascript
{
  userInfoUpdate {
    username: 'joe',
    name: 'Joe Marcotti',
    email: 'joe@mail.com',
    phone: '+1 2309 2994',
    address: 'South Dakota'
  }
}
```

### User change password

- Mutation string:

```
mutation userChangePassword($oldPassword: String!, $newPassword: String!) {
  userChangePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
```

- Response:

```javascript
{
  userChangePassword true
}
```

---

## REST API

### **User Registration**

Register a new user.

### Endpoint

```
POST /user/register
```

### Parameters

_No parameter._

### Body

Type: JSON

- `user` **Required**  
  Type: `Object`  
  Default: {}  
  User data.
  - `name` **Required**  
    Type: `String`  
    Default: ''  
    User's full name.
  - `username` **Required**  
    Type: `String`  
    Default: ''  
    User's username. It will be used for login.
  - `email` **Required**  
    Type: `String`  
    Default: ''  
    User's email.
  - `password` **Required**  
    Type: `String`  
    Default: ''  
    User's password.

### Returns

A newly registered user data.

### Response Example

```js
{
  success: true,
  user: {
    name: 'Joe Marcotti',
    username: 'joe',
    email: 'joe@mail.com',
    phone: '',
    address: '',
  }
}
```

### **User Login**

Logs in a user.

### Endpoint

```
POST /user/login
```

### Parameters

_No parameter._

### Body

Type: JSON

- `username` **Required**  
  Type: `String`  
  Default: ''  
  User's username. It will be used for login.
- `password` **Required**  
  Type: `String`  
  Default: ''  
  User's password.

### Returns

Logged in user data.

### Response Example

```js
{
  success: true,
  user: {
    name: 'Joe Marcotti',
    username: 'joe',
    email: 'joe@mail.com',
    phone: '',
    address: '',
  }
}
```

### **User Logout**

Logs out a user.

### Endpoint

```
GET /user/logout
```

### Parameters

_No parameter._

### Body

_No body._

### Returns

_No return._

### Response Example

```js
{
  success: true,
}
```
