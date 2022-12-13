const mode = 'asymmetric'
const naclImpl = new window.NaClImpl({ mode })
naclImpl.generateKeyPair()

function start () {
    alert('starting...')
}