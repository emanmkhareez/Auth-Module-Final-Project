# ![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Auth-Module


[GitHub](https://github.com/emanmkhareez/Auth-Module-Final-Project)

[Heroku](https://lab09-project.herokuapp.com/)

## Collaborators

 Eman Mkhareez, Tariq Abu-Laban, Khaled Tahat.

---

## Overview

This App is a back end API. The back end allows a user to Sign up, sign in, create, update and delete based on the users authorization level. The four levels are user, writer, editor, and admin user.

---

## Configuration

Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.

-   **README.md** - contains documentation
-   **.env** - contains env variables (should be git ignored)
-   **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
-   **.eslintrc** - contains the course linter configuratoin
-   **.eslintignore** - contains the course linter ignore configuration
-   **.node.yml** - contains the course linter ignore configuration
-   **package.json** - contains npm package config
    -   create a `test` script for running tests
    -   create a `start` script for running your server
-   **index.js** - the entry point for your application
-   **src/** - contains your core application files and folders
-   **\_\_test\_\_/** - contains unit tests

---

## Authrization

-   users - READ

-   writers - READ/CREATE

-   editors - READ/CREATE/UPDATE

-   admin - READ/CREATE/UPDATE/DELETE

---

## Dependencies

-   base-64

-   bcrypt

-   cors

-   dotenv

-   express

-   jest

-   jsonwebtoken

-   pg

-   supertest

-   sequelize

---

## Data Models

This api supports a postgres 'user' model that is represented by the following:

```
const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    role: {
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
      required: true,
      defaultValue: 'user'
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    }
  });
```

---

## Server End Points

-   POST `/signup`

```
{ "username": "ETK", "password": "test"}
```

-   POST `/signin`

To sign in youd put the same as sign up, or you can use a token such as

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTg0ZDhmOGRkOWYwZDhlOTk2MmVjMSIsImlhdCI6MTUyODMxOTM3NX0.Pzg_k06Z7wGMi83g4QCM4Nr4AAYy8pinQqlfwj-mFEg

```

If your token is invalid you will recieve

```
{
    "error": "Invalid token"
}
```

-   GET `/users`

This route will show you a list of all the users.

```
[
    Tariq
    Khaled
    Eman
]
```

-   DELETE `/users/:id`

This route is used to delete users in the database

.