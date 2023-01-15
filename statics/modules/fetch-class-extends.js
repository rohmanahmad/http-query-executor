class FetchExtend {
    get (url, params) {
        return new Promise((resolve, reject) => {
            if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(url, {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                resolve(res.json())
            })
            .catch(err => {
                reject(err.json())
            })
        })
    }
    post (url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: typeof data !== 'string' ? JSON.stringify(data) : data
            })
            .then(res => {
                resolve(res.json())
            })
        })
    }
}