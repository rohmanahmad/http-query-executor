const modeDOM = document.getElementById("mode")
const keyPairDOM = document.getElementById("key-pair")
const sharedKeyDOM = document.getElementById("shared-key")
const textDataDOM = document.getElementById("text-data")

const encryptedFromClientDOM = document.getElementById("encrypted-from-client")
const decryptedFromClientDOM = document.getElementById("decrypted-from-client")

const encryptedFromServerDOM = document.getElementById("encrypted-from-server")
const decryptedFromServerDOM = document.getElementById("decrypted-from-server")

let mode = modeDOM.value
const naclImpl = new window.NaClImpl({ mode })
keyPairDOM.innerHTML = naclImpl.generateKeyPair()

function postData (url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(res => {
            resolve(res.json())
        })
    })
}

function getSharedKey (keyPair) {
    const data = JSON.stringify({
        public_key: keyPair.publicKey.join(),
        secret_key: keyPair.secretKey.join()
    })
    return postData('/e2e/key/pair', data)
}

function reset () {
    keyPairDOM.innerHTML = ''
    sharedKeyDOM.innerHTML = ''
    encryptedFromClientDOM.innerHTML = ''
    decryptedFromClientDOM.innerHTML = ''
    encryptedFromServerDOM.innerHTML = ''
    decryptedFromServerDOM.innerHTML = ''
}

function modeChanged () {
    reset()
    mode = modeDOM.value
    const newKeyPair = naclImpl.generateKeyPair(mode)
    keyPairDOM.innerHTML = (mode === 'asymmetric') ? JSON.stringify(newKeyPair, null, 4) : newKeyPair
    if (mode === 'asymmetric') 
        getSharedKey(newKeyPair)
            .then(res => {
                sharedKeyDOM.innerHTML = res.final
            })
}

function getEncryptedFromServer (payload) {
    return postData('/e2e/encrypt', JSON.stringify(payload))
}

function getDecryptedFromServer (payload) {
    return postData('/e2e/decrypt', JSON.stringify(payload))
}

async function start () {
    let key = keyPairDOM.innerHTML
    let finalKey = sharedKeyDOM.innerHTML
    const payload = textDataDOM.value.trim()
    if (mode === 'asymmetric') {
        key = null
        finalKey = new Uint8Array(finalKey.split(','))
    }
    const encryptedPayload = naclImpl.encrypt(finalKey, payload, key, mode)
    const decryptedPayload = naclImpl.decrypt(finalKey, encryptedPayload, key, mode)
    encryptedFromClientDOM.innerHTML = encryptedPayload
    decryptedFromClientDOM.innerHTML = decryptedPayload
    if (mode === 'asymmetric') finalKey = finalKey.join(',') // Uint8Array to String
    getEncryptedFromServer({finalKey, payload, key, mode})
        .then(res => {
            encryptedFromServerDOM.innerHTML = res.encrypted
        })
    getDecryptedFromServer({finalKey, payload: encryptedPayload, key, mode})
        .then(res => decryptedFromServerDOM.innerHTML = res.decrypted)
}