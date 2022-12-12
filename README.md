# http-query-executor
server http (base on expressjs) yg digunakan untuk melaksanakan query dari frontend dengan payload yg sudah menggunakan end-to-end encription

## REQUIREMENTS
- *Nodejs & NPM* > Min Versi 12
- *.env File* > Berisi *Environment* Yang Dibutuhkan

## INSTALL
- Clone Repo

    ```bash
    git clone https://github.com/rohmanahmad/http-query-executor
    ```
- install dependencies

    ```bash
    cd http-query-executor
    npm install
    ```

## STRUKTUR FOLDER

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

## CONFIGS
Berfungsi sebagai tempat menyimpan file config dimana file tsb akan di load otomatis pada **(/core/server.js)** untuk sebagai acuan dalam pengoperasian sistem.
Config default sistem adalah **app.js** sedangkan yg lainnya adalah sebagai contoh dasar penggunaan dari **"helpers"** maupun **"providers"**.
Semua Config ini dapat diakses melalui *controllers* maupun *middlewares* dengan kata kunci ***this.config***. Jika Anda membuat file config baru,
anda bisa akses config value tsb dengan kata kunci ***this.config.NAMA_FILE.key*** pada controllers dan middlewares

### - *app.js*
Berisikan Semua Config yg dibutuhkan oleh sistem untuk keperluan **booting** maupun pendefinisian kunci app
### - *providers.js*
Berisikan Semua Config dari semua provider yg terdaftar pada **/core/providers**. Key pada file config ini **Mengacu pada nama file dari provider tsb**.
Sebagai contoh anda membuat sebuah provider dengan nama **mysqldb.js** maka buat key baru pada file /configs/providers.js degan key **mysqldb**,
dalam key tsb masukkan semua config yg dipakai oleh provider anda.
