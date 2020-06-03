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
### Application flow

![app_diagram](/server/diagrams/app.png)

![authentication diagram](/server/diagrams/authentication.png)
