
const url = '/mysql/execute'

class SQL extends FetchExtend {
    constructor (sql) {
        super()
        this.params = {}
        this.sql = sql
    }
    setParams (params={}) {
        for (const p in params) {
            this.params[p] = params[p]
        }
        return this
    }
    async execute() {
        try {
            const sqlCode = this.sql.trim()
            const sqlParams = this.params
            await this.post(url, {sql: sqlCode, params: sqlParams})
            return true
        } catch (err) {
            throw err
        }
    }
}
