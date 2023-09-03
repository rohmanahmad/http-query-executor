module.exports = async function collector(request, response, next) {
    const queries = request.query
    const body = request.body
    const params = request.params
    this.input = { queries, body, params }
    next()
}