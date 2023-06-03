export const parseRequestURL = function () {
  const url = location.hash.slice(1).toLowerCase() || ''
  const r = url.substring(0, url.indexOf('?') >= 0 ? url.indexOf('?') : url.length).split("/")
  const queryString = url.indexOf('?') >= 0 ? url.substring(url.indexOf('?')) : ''
  return {
      resource    : r[1],
      verb        : r[2] ? r[2] : '',
      id          : r[3] ? r[3] : '',
      queryString : queryString
  }
}