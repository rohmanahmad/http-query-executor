'use strict'

const env = process.env

const getEnv = (key) => {
    return env['PROVIDER_' + key]
}

module.exports = {
    mongodb: {
        dsn: getEnv('MONGODB_DSN')
    },
    mysql: {
        connection: {
            host: getEnv('MYSQL_HOST'),
            port: getEnv('MYSQL_PORT'),
            user: getEnv('MYSQL_USER'),
            password: getEnv('MYSQL_PASS'),
            database: getEnv('MYSQL_DB'),
            connectionLimit: getEnv('MYSQL_POOL_LIMIT', 10),
            queueLimit: 0,
        }
    },
    e2e: {
        mode: 'asymmetric', // ['asymmetric', 'symmetric']
    }
}