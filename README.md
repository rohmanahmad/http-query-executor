# Http Query Executor
Server http (base on expressjs) yg digunakan untuk menjalankan query dari sisi frontend dengan payload yg sudah menggunakan e2e encryption.
Aplikasi ini pada dasarnya di peruntukan untuk para Frontend Developer (pemula/mahir) untuk membuat mereka lebih memudahkan mereka dalam 
membuat aplikasi tanpa perlu khawatir memikirkan *backend code* yang mungkin mereka kurang memahami / menguasai penerapannya.
Akan tetapi pada prakteknya ini juga bisa dikatakan sebagai *Framework* yg dapat digunakan oleh *Backend Developer* untuk membuat aplikasi/service
dengan dapat menambahkan *Model* atau sejenisnya didalam folder */core/providers* untuk membantu eksekusi query agar tidak tercampur dengan controller.

Aplikasi ini memungkinkan Frontend Developer untuk *mempelajari* beberapa script SQL maupun NoSQL dan bisa langsung mengeksekusinya.
Saya tidak menjamin penerapan daripada perintah code(sql/nosql) yg di kirimkan akan membuat performa server bisa down. maka dari itu, sebisa mungkin untuk
melihat *best practice* pada setiap script/code yg dijalankan.

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
    touch .env
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

- ### *app.js*
Berisikan Semua Config yg dibutuhkan oleh sistem untuk keperluan **booting** maupun pendefinisian kunci app
- ### *providers.js*
Berisikan Semua Config dari semua provider yg terdaftar pada **/core/providers**. Key pada file config ini **Mengacu pada nama file dari provider tsb**.
Sebagai contoh anda membuat sebuah provider dengan nama **mysqldb.js** maka buat key baru pada file /configs/providers.js degan key **mysqldb**,
dalam key tsb masukkan semua config yg dipakai oleh provider anda.


## CORE
Folder *Core*  Digunakan untuk menyimpan berkas-berkas core spt *helpers*, *middlewares*, *providers* serta file server

- ### *server.js*
File ini Dipanggil pertama kali oleh */index.js*. Didalamnya terdapat fungsi-fungsi untuk inisiasi dan implementasi dari *middleware*, *providers* dan *helpers*.

- ### *routes.js*
File ini hanya berisi fungsi untuk memanggil file *routes.js* dari masing-masing *modules* pada folder */modules*

- ### Helpers
Didalam folder ini terdapat file helpers yang akan dipanggil otomatis dari */core/server.js* serta dapat diakses dari semua controllers dan middlewares dengan keyword *this*.

- ### Middlewares
Pada Folder ini terdapat file middleware yg berfungsi sebagai middle script pada *http request* sebelum sampai kepada *controller* tujuan.
Middleware ini juga akan di *load otomatis* sesuai dengan apa yang telah didaftarkan pada */configs/app.js* dengan aliasing.

- ### Providers
Folder ini berisi semua file *Provider* yg berfungsi sebagai library khusus spt koneksi *database*, *lib-exporter*, dll.
Provider ini akan diload otomatis dengan config yg sesuai dengan *nama file* dari provider tsb.

Contoh:
Anda membuat sebuah file provider dengan nama *"mysqldb.js"* maka jika anda membutuhkan config yang diperlukan, anda cukup menambahkan *config key* pada */configs/providers.js* dengan key *mysqldb:{}*.

## Modules
Pada Bagian ini developer bisa menambahkan sendiri 