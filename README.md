
# User Management

This is a frontend coding exam that aims to build a CRUD for User Management using React and API.


## Run Locally

Clone the project

```bash
  git clone https://github.com/orayanics/ithinkweb-exam
```

Go to the project directory

```bash
  cd ithinkweb-exam
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Get list of all users

```http
  GET https://reqres.in/api/users?page=1
```

This will return a JSON object with a response of 200.
#### Get user by ID

```http
  GET https://reqres.in/api/users/{id}
```
This will return a JSON object with a response of 200.
#### Create User
```http
  POST https://reqres.in/api/users
```
This will return a JSON object with a response of 201.
#### Update user by ID

```http
  PUT https://reqres.in/api/users/{id}
```
This will return a JSON object with a response of 201.
#### Delete user by ID

```http
  DELETE https://reqres.in/api/users/{id}
```
This will return a JSON object with a response of 204.
