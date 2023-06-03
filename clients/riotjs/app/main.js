import { component, register } from 'riot'
import layoutModule, { layoutComponents } from 'layoutModule'
import tagModule, { tagComponents } from 'components'
import appModule from 'appModule'

import { app_version } from '../package.json'
import MainLayout from './layouts/main-layout.riot'
import routes from './services/routes'
import { formatNumber, parseRequestURL, logInfo, logError } from './helpers/utilities.js'
import { eraseCookie, getCookie } from 'helpers/cookie'
import { goTo } from 'helpers/ma'
import { kebabCase } from 'lodash'
/* plugins app */
import 'services/app-plugins.js'

import { LogoutAgent } from 'appModule/agents/agents.sdk'

const guestRoutes = ['register', 'login']

const needLogin = (route) => {
    if (guestRoutes.indexOf(route) < 0) {
        return isLogin() ? false : true
    } else {
        return false
    }
}

const isLogin = () => {
    return getCookie('token') ? true : false
}

const initApp = () => {
    /* register all components */
    routes.forEach((item) => {
        // debugLog('routes', item)
        register(kebabCase(item.hash), appModule(item.component))
    })

    layoutComponents.forEach((item) => {
        // debugLog('layout', item)
        register(kebabCase(item), layoutModule(item))
    })

    tagComponents.forEach((item) => {
        // debugLog('components', item)
        register(kebabCase(item), tagModule(item))
    })

}

const router = (e) => {

    App.currentUrl = location.href
    let request = parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    // let getUrl = (request.resource ? '/' + request.resource : '/') + (request.id ? '/' + ':id' : '') + (request.verb ? '/' + request.verb : '')
    let getUrl = (request.resource ? '/' + request.resource : '/') + (request.verb ? '/' + request.verb : '') + (request.id ? '/:id' : '')
    let parsedURL = getUrl.slice(1) === '' ? 'dashboard' : getUrl.slice(1)
    /* logout */
    if(parsedURL === 'logout') {
        LogoutAgent()
            .then((res)=>{
                eraseCookie('name')
                eraseCookie('userid')
                eraseCookie('token')
                eraseCookie('refresh')
                // localStorage.removeItem("access")
                // localStorage.removeItem("token")
                localStorage.clear()
            })
            .catch((err)=>{
                logError(err)
            })
            goTo('login')
    }

    let routeHash = routes.findIndex( item => {
        return item.hash === parsedURL
    })

    if (!isLogin()) goTo('login')

    let authPage = needLogin(parsedURL)
    const objRoute = routes[routeHash] || {menu: true}
    const pUrl = kebabCase(parsedURL)
    // debugLog({parsedURL, routeHash, pUrl, authPage, objRoute})
    if(routeHash >= 0) {
        if(!authPage) {
            appComponent.setModuleActive(pUrl, objRoute.menu)
        }else {
            goTo('logout')
        }
    } else {
        if (parsedURL === 'login') {
            appComponent.setModuleActive(pUrl, false)
        } else {
            appComponent.setModuleActive(pUrl, true)
        }
    }

}

initApp()
const appComponent = component(MainLayout)(document.getElementById('page'))
window.cekData = appComponent
window.addEventListener('hashchange', router)
window.addEventListener('load', router)