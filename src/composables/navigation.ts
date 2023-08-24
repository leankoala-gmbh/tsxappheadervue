
import { TApplication } from './../types/general.interfaces'
import { IConfigNavigationDetails } from '@/types/general.interfaces'

const cleanObj = (obj: any) => Object.entries(obj).reduce((a, [k, v]) => (v ? (a[k]=v, a) : a), {})


export function useLinkHelper (usage: TApplication) {
  const clickCache = ref('')

  const isAbsoluteUrl = (url: string) => url.match(/^(http|mailto|tel)/)

  const clickLink = (entry: IConfigNavigationDetails) => {
    let response
    if (entry.sendEvent) {
      response = entry.sendEvent
    } else {
      clickCache.value = entry.id
      const url = isAbsoluteUrl(entry.path || '')
        ? entry.path
        : null
      const target = url && entry.newTab ? '_blank' : null
      const path = !url && entry.path ? entry.path : null
      const destination = entry.path
        ? usage === entry.application
          ? 'internal'
          : 'external'
        : null

      response = cleanObj({ action: 'click', id: entry.id, path, url, target, destination })
    }

    window.mitt.emit('tsxAppHeader', response)
  }

  const customLink = (action: string, payload: any) => {
    window.mitt.emit('tsxAppHeader', { action, ...cleanObj(payload) })
  }

  const labelStyle = (entry: IConfigNavigationDetails) => {
    const style = entry.labelStyle || 'marketing'
    const matrix: {[key:string]: string} = {
      marketing: 'text-white bg-secondary',
      info: 'text-white bg-primary'
    }
    return matrix[style]
  }

  const detectActiveHref = (entry: any) => {
    if (entry.searchPathRegEx) {
      const regex = new RegExp(entry.searchPathRegEx)
      return regex.test(window.location.pathname)
    }
    return window.location.pathname.includes(entry.searchPath || entry.path)
  }

  const setActiveLink = (entry: any) => {
    return clickCache.value.length
      ? clickCache.value === entry.id
      : detectActiveHref(entry)
  }

  return {
    customLink,
    clickLink,
    labelStyle,
    clickCache,
    setActiveLink
  }
}
