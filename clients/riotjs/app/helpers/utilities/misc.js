export const randomString = function (size=3, opt={ onlyNums: false, onlyChars: false }) {
  let result           = ''
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if (opt.onlyNums) characters = '0123456789'
  else if (!opt.onlyChars) characters += '0123456789'
  let charactersLength = characters.length
  for ( var i = 0; i < size; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
 }
 return result
}

export const copyTextInSelector = function (selectorId) {
  const sel = document.getElementById(selectorId)
  const text = sel.html()
  if (!navigator) alert('copy text doesn\'t supported')
  navigator.clipboard.writeText(text)
}

export const sendToClipboard = function (text) {
  if (!navigator) alert('copy text doesn\'t supported')
  navigator.clipboard.writeText(text)
}