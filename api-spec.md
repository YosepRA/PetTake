# PetTake API Specification

Written using per-page basis.

---

## Data structure

### **Pet**

```
{
  createdDate: String,
  name: String,
  breed: String,
  age: String,
  gender: String,
  coatLength: String,
  preferHomeWith: [String],
  preferHomeWithout: [String],
  health: [String],
  images: [String],
  description: String,
  author: User,
}
```

Example:

```javascript
{
  createdDate: '2021-04-05T13:33:17.008Z',
  name: 'Nana',
  breed: 'Terrier',
  age: 'Puppy',
  gender: 'Female',
  coatLength: 'Medium',
  preferHomeWith: ['Other dogs', 'Children'],
  preferHomeWithout: ['Other cats'],
  health: ['Vaccinated', 'Spayed/neutered'],
  images: ['/link/to/image1.png', '/link/to/image2.png']
  description: 'Nana is a good kid. She behaves well with your children to give them good memories.'
  author: 'User' // User information object.
}
```

### **User**

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

---

## Queries

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
) {
  petList(
    breed: $breed,
    age: $age,
    gender: $gender,
    coatLength: $coatLength,
    preferHomeWith: $preferHomeWith,
    preferHomeWithout: $preferHomeWithout,
    health: $health,
  ) {
    name
    breed
  }
}
```

- Response:

```javascript
{
  petList: [
    { name: 'Nana', breed: 'Terrier' },
    { name: 'Mike', breed: 'Poodle' },
    { name: 'Dusky', breed: 'Shepherd' },
  ];
}
```

### Details

- Query string:

```
query pet(
  $id: ID!
) {
  pet(
    id: $id
  ) {
    name
    breed
    age
    gender
    coatLength
    preferHomeWith
    preferHomeWithout
    health
    images
    description
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
    images: ['/link/to/image1.png', '/link/to/image2.png']
    description: 'Nana is a good kid. She behaves well with your children to give them good memories.'
  }
}
```

### User pet list

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
) {
  petList(
    breed: $breed
    age: $age
    gender: $gender
    coatLength: $coatLength
    preferHomeWith: $preferHomeWith
    preferHomeWithout: $preferHomeWithout
    health: $health
  ) {
    name
    breed
  }
}
```

- Response:

```javascript
{
  petList: [
    { name: 'Nana', breed: 'Terrier' },
    { name: 'Mike', breed: 'Poodle' },
    { name: 'Dusky', breed: 'Shepherd' },
  ];
}
```

### User pet edit

- Query string:

```
query pet(
  $id: ID!
) {
  pet(
    id: $id
  ) {
    name
    breed
    age
    gender
    coatLength
    preferHomeWith
    preferHomeWithout
    health
    images
    description
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
    images: ['/link/to/image1.png', '/link/to/image2.png']
    description: 'Nana is a good kid. She behaves well with your children to give them good memories.'
  }
}
```

---

## Mutation

### User pet new

- New pet input type:

```
name: String!
breed: String!
age: String!
gender: String!
coatLength: String!
preferHomeWith: [String]
preferHomeWithout: [String]
health: [String]
images: [String]! // Direct upload to server on image addition.
description: String! // Depends on how the text editor works.
```

- Mutation string:

```
mutation petAdd(
  $pet: PetInputs!
) {
  petAdd(
    pet: $pet
  ) {
    id
  }
}
```

- Response:

```javascript
{
  petAdd: {
    id: 'asd0asdsd8ssd8sad'; // MongoDB generated IDs.
  }
}
```

### User pet update

- Update pet input type (Only the the changes):

```
name: String
breed: String
age: String
gender: String
coatLength: String
preferHomeWith: [String]
preferHomeWithout: [String]
health: [String]
images: [String] // Direct upload to server on image addition.
description: String // Depends on how the text editor works.
```

- Mutation string:

```
mutation petUpdate(
  $changes: PetUpdateInputs!
) {
  petUpdate(
    changes: $changes
  )
}
```

- Response:

```javascript
{
  petUpdate: true; // Boolean based on successful change.
}
```

### User registration

- User input type

```
username: String!
email: String!
password: String!
name: String!
phone: String!
address: String!
```

- Mutation string:

```
mutation userRegistration(
  $user: User!
) {
  userRegistration(
    user: $user
  ) {
    username
  }
}
```

- Response:

```javascript
{
  userRegistration: {
    username: 'BigJoe"
  }
}
```

### User change password

- Mutation string:

```
mutation userChangePassword(
  $oldPassword: String!
  $newPassword: String!
) {
  userChangePassword(
    oldPassword: $oldPassword
    newPassword: $newPassword
  )
}
```

- Response:

```javascript
{
  userChangePassword: true; // Throws error if old password is invalid.
}
```

---

## REST API

### User sign in

```
route: '/signin',
method: 'POST',
'content-type': 'application/json',
body: {
  username: 'BigJoe',
  password: 'secretvalue',
}
```

- Response

```javascript
{
  success: true;
}
```

### User sign out

```
route: '/signout',
method: 'POST',
```

- Response

```javascript
{
  success: true;
}
```
