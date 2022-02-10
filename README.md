# **DexMovies API**

DexMovies API is a RESTful API developed by Lucas 'Kodex' using NodeJS and MongoDB. The DexMovies API was developed with learning in mind. Current API features are documented below.

_Elements_ are understood as _Documents_ of the database like a Movie or a Character.

---

## DexMovies work with the following HTTP methods to manipulate elements
+ **POST** - Create a new element
+ **GET** - Read various elements or just a single one
+ **PUT** - Update informations of a specified element
+ **DELETE** - Delete a specified element

Always using the same endpoint for all operations for the specific element collection. You can also use a query string with **GET** and **DELETE** method to retrieve only one element.

---

## The default response is always in the following **JSON** format:

+ **apiName** -> It will always be "DexMovies". It is only for information
+ **apiVersion**
    + **major** -> Major version of the API
    + **minor** -> Minor version of the API
    + **patch** -> Patch version of the API
+ **status** -> HTTP satus code of request
+ **message** -> Message for the requested operation like "Movie not found", "Character successfully created"
+ **authorized** -> Notifies if the client is actually authorized by OAuth 2.0. (There's no difference between an authorized client and a not authorized client)
+ **data** -> Data response for request. Always an Array of elements correctly structured in the way documented. It will be an Array of elements even if there's only one or no one element

**Example of a Default Response:**

```json
{
    "apiName":"DexMovies",
    "apiVersion":{
        "major":0,
        "minor":0,
        "patch":0
    },
    "status":200,
    "message":"OK",
    "authorized":false,
    "data":[{}]
}
```

---

# **JSON Element Format**

## _Movies_

```json
{
    "title":"Title",
    "description":"Description of the movie",
    "releaseDate":"Timestamp"
}
```

---

## _Characters_

```json
{
    "name":"Name",
    "actor":"Actor Name",
    "movie":"Movie ID"
}
```

---

# **Enviroment Variables**
You will need to configure the enviroment variables.

_.env_
```.env
API_NAME=DexMovies
API_MAJOR=0
API_MINOR=0
API_PATCH=0

DB_NAME=dexmoviesDB
DB_HOST=localhost
DB_PORT=27017

DB_USER=user
DB_PASS=password

SRV_HOST=localhost
SRV_PORT=8080
```

---

# **Endpoints**

Endpoint | Method | Description
:--------|:------:|------------
/characters | **POST** | Create a new character, one per request
/characters | **GET** | Retrieve all the characters
/characters?id={id} | **GET** | Retrieve a specific character
/characters?movie={id} | **GET** |  Retrieve all the characters from a specified movie
/characters | **PUT** | Edit a existent character (You need to pass the field "id" in the body)
/characters?id={id} | **DELETE** | Delete an existent character

Endpoint | Method | Description
:--------|:------:|------------
/movies | **POST** | Create a new movie, one per request
/movies | **GET** | Retrieve all the movies
/movies?id={id} | **GET** | Retrieve all the movies
/movies | **PUT** | Edit an existent movie (You need to pass the field "id" in the body)
/movies?id={id} | **DELETE** | Delete an existent character

