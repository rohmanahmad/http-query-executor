'use strict'

const knowledge = async function knowledge(request, response) {
    const { version, last_restart, author } = this.config.app.server
    response.json({
        knowledge: true
    })
}

const knowledgeRouteController = {
    name: 'knowledge',
    path: '/knowledge',
    method: 'GET',
    middlewares: ['auth'],
    controller: knowledge
}

module.exports = knowledgeRouteController