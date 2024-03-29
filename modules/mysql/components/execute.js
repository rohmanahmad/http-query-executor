'use strict'

const availableActions = {
    'table-create': 'CREATE TABLE', // √ tested on postman
    'table-list': 'SHOW TABLE', // √ tested on postman
    'table-drop': 'DROP TABLE', // √ tested on postman
    'table-rename': 'RENAME TABLE', // √ tested on postman
    'table-alter': 'ALTER TABLE', // √ tested on postman
    'table-columns': 'SHOW COLUMNS', // tested on postman
    'table-truncate': 'TRUNCATE', // √ tested on postman
    'data-insert': 'INSERT INTO', // √ tested on postman
    'data-list': 'SELECT', // √ tested on postman
    'data-delete': 'DELETE', // √ tested on postman
    'data-update': 'UPDATE', // √ tested on postman
}

const validateAction = function (action, sql) {
    const aC = Object.keys(availableActions)
    if (aC.indexOf(action) === -1) throw new Error('Invalid Action! Available Actions Are: [' + aC.join('|') + ']')
    const prefix = availableActions[action]
    if (sql.indexOf(prefix) !== 0) throw new Error('SQL Doesnt Match With Action!') // jika sql tidak sesuai dengan ketentuan maka tertolak
    return true
}

const execute = async function execute(request, response, next) {
    try {
        const { action } = request.params
        const { sql, params, options={} } = this.input.body
        validateAction(action, sql)
        const { compiled, rows, fields } = await this.providers.mysql.runQuery(sql, params)
        let result = { rows }
        if (options.show_field_list === true) result['fields'] = fields
        response.json({
            request: {
                sql,
                params,
            },
            compiled,
            result
        })
    } catch (err) {
        next(err)
    }
}

const executeRouteController = {
    name: 'execute',
    path: '/execute/:action', // action > see "availableActions" var
    method: 'POST',
    middlewares: ['auth'],
    controller: execute
}

module.exports = executeRouteController