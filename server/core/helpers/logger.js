const isDev = process.env.NODE_ENV == 'development'
const chalk = require('chalk')
const moment = require('moment')

const info = chalk.cyan
const warn = chalk.yellow
const success = chalk.green
const error = chalk.red

const getTime = () => {
    return moment().format('YYYY-MMM-DD HH:mm:ss')
}

const logInfo = function (...msg) {
    console.log(info(getTime() + ' >>'), `[PID: ${process.pid}]`, '[INFO]', ...msg)
}
const logWarning = function (...msg) {
    console.log(warn(getTime() + ' >>'), `[PID: ${process.pid}]`, '[WARN]', ...msg)
}
const logSuccess = function (...msg) {
    console.log(success(getTime() + ' >>'), `[PID: ${process.pid}]`, '[SUCCESS]', ...msg)
}
const logError = function (...msg) {
    console.log(error(getTime() + ' >>'), `[PID: ${process.pid}]`, '[ERR]', ...msg)
}

const debugInfo = function (...msg) {
    if (!isDev) return false
    logInfo(...msg)
    logWarning(this.SyntaxError().stack.replace('SyntaxError', 'Stack Trace'))
}
const debugWarning = function (...msg) {
    if (!isDev) return false
    logWarning(...msg)
    logWarning(this.SyntaxError().stack.replace('SyntaxError', 'Stack Trace'))
}
const debugSuccess = function (...msg) {
    if (!isDev) return false
    logSuccess(...msg)
    logWarning(this.SyntaxError().stack.replace('SyntaxError', 'Stack Trace'))
}
const debugError = function (...msg) {
    if (!isDev) return false
    logError(...msg)
    logWarning(this.SyntaxError().stack.replace('SyntaxError', 'Stack Trace'))
}

module.exports = {
    getTime,
    // logs
    logInfo,
    logWarning,
    logSuccess,
    logError,
    // debug
    debugInfo,
    debugWarning,
    debugSuccess,
    debugError,
}