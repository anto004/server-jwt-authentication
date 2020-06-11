# authentication

-   Run Server:

```sh
  node index.js
```

or

```sh
  npm run dev
```

-   To run MongoDB(mongod process):

```sh
  brew services start mongodb-community@4.2
```

-   To stop mongod:

```sh
  brew services stop mongodb-community@4.2
```

-   Create config.js file with secret key

```
   { secret: "your_secret_key"}
```

-   API:

    -   signup

        -   Post Request
        -   Expects an email and password
        -   Returns token

    -   login

        -   Post Request
        -   Expects an email and password
        -   Return token

    -   /

        -   Get Request
        -   Expects an email and password and
        -   Header authorization key with token

### Application flow

![app_diagram](/server/diagrams/app.png)

![authentication diagram](/server/diagrams/authentication.png)
