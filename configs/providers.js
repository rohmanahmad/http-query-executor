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
        host: getEnv('MYSQL_HOST'),
        port: getEnv('MYSQL_PORT'),
        user: getEnv('MYSQL_USER'),
        pass: getEnv('MYSQL_PASS')
    },
    e2e: {
        mode: 'asymmetric', // ['asymmetric', 'symmetric']
    }
}