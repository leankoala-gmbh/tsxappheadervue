type TCallback = string | ((data: any) => boolean) | boolean
const urlParams = new URLSearchParams(window.location.search)

const debugEcho = (key: string, message: any) => {
  if (urlParams.has('debugAppHeader')) {
    console.log(key, message)
  }
}

const returnCallback = <T>(callback: TCallback, data: T): boolean => {
  if (typeof callback === 'string') {
    const funcDetails = JSON.parse(callback)
    const f = new Function(funcDetails.args, funcDetails.body)
    return f(data)
  }
  if (typeof callback === 'function') return callback(data)
  return callback
}

export {
  returnCallback,
  debugEcho
}

