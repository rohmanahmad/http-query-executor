# http-query-executor
server http (base on expressjs) yg digunakan untuk melaksanakan query dari frontend dengan payload yg sudah menggunakan end-to-end encription

## INSTALL
- Clone Repo

    ```bash
    git clone https://github.com/rohmanahmad/http-query-executor
    ```
- install dependencies

    ```bash
    npm install
    ```

## FOLDER STRUCTURE

    ```js
    |__ configs
       |___ app.js
       |___ providers.js
    |__ core
       |___ helpers
           |___ logger.js
       |___ middlewares
           |___ auth.js
           |___ collector.js
       |___ providers
           |___ mongodb.js
       |___ response.js
       |___ routes.js
       |___ server.js
    |__ modules
       |___ main
           |___ components
               |___ home.js
           |___ routes.js
    |_ .env
    |_ index.js
    |_ package.json
    ```