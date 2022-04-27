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
  images: [Image],
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
  images: ['Images'], // List of Images.
  description: 'Nana is a good kid. She behaves well with your children to give them good memories.'
  author: 'User' // User information object.
}
```

### User

```
{
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
  path: String,
  filename: String
}
```

Example:

```javascript
{
  _id: 123,
  path: '/link/to/image.png',
  filename: 'image.png'
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
  path: String,
  filename: String
}
```

Example:

```javascript
{
  path: '/link/to/image.png',
  filename: 'image.png'
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
        path
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
          { path: '/link/to/image01.png' },
          { path: '/link/to/image02.png' },
          { path: '/link/to/image03.png' },
        ]
      },
      {
        _id: 124,
        name: 'Mike',
        breed: 'Poodle',
        images: [
          { path: '/link/to/image01.png' },
          { path: '/link/to/image02.png' },
          { path: '/link/to/image03.png' },
        ]
      },
      {
        _id: 125,
        name: 'Dusky',
        breed: 'Shepherd',
        images: [
          { path: '/link/to/image01.png' },
          { path: '/link/to/image02.png' },
          { path: '/link/to/image03.png' },
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
      path
      filename
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
      { path: '/link/to/image01.png', filename: 'image01.png' },
      { path: '/link/to/image02.png', filename: 'image02.png' },
      { path: '/link/to/image03.png', filename: 'image03.png' }
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
        path
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
          { path: '/link/to/image01.png' },
          { path: '/link/to/image02.png' },
          { path: '/link/to/image03.png' },
        ]
      },
      {
        _id: 124,
        name: 'Mike',
        breed: 'Poodle',
        images: [
          { path: '/link/to/image01.png' },
          { path: '/link/to/image02.png' },
          { path: '/link/to/image03.png' },
        ]
      },
      {
        _id: 125,
        name: 'Dusky',
        breed: 'Shepherd',
        images: [
          { path: '/link/to/image01.png' },
          { path: '/link/to/image02.png' },
          { path: '/link/to/image03.png' },
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

### User registration

```
route: '/user/register',
method: 'POST',
'content-type': 'application/json',
body: {
  user: {
    name: 'Joe Marcotti',
    username: 'joe',
    email: 'joe@mail.com',
    password: 'password'
  }
}
```

- Response

```javascript
{
  success: true,
  user: {
    name: 'Joe Marcotti',
    username: 'joe',
    email: 'joe@mail.com',
    // Phone and address is empty upon first registration.
    phone: '',
    address: ''
  }
}
```

### User sign in

```
route: '/user/signin',
method: 'POST',
'content-type': 'application/json',
body: {
  username: 'BigJoe',
  password: 'password',
}
```

- Response

```javascript
{
  success: true,
  user: {
    name: 'Joe Marcotti',
    username: 'joe',
    email: 'joe@mail.com',
    phone: '+1 2309 2994',
    address: 'South Dakota'
  }
}
```

### User sign out

```
route: '/user/signout',
method: 'POST',
```

- Response

```javascript
{
  success: true;
}
```
