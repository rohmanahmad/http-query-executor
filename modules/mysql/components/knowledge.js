'use strict'

const knowledge = async function knowledge(request, response) {
    const { version, last_restart, author } = this.config.app.server
    response.json({
        version,
        last_restart,
        author
    })
}

const knowledgeRouteController = {
    name: 'knowledge',
    path: '/',
    method: 'GET',
    middlewares: ['auth'],
    controller: knowledge
}

module.exports = knowledgeRouteController