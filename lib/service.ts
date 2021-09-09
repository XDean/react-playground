import {isValidHttpUrl} from "./util";
import * as path from 'path'
import {promises as fs} from 'fs'
import {decompressFromEncodedURIComponent} from 'lz-string'

export async function fetchResource(url: string): Promise<string> {
  if (url.startsWith('cmp:')) {
    return decompressFromEncodedURIComponent(url.substr(3)) ||
      decompressFromEncodedURIComponent(decodeURIComponent(url.substr(3))) || ''
  } else if (isValidHttpUrl(url)) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      const resp = await fetch(url, {
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      if (resp.ok) {
        return await resp.text()
      } else {
        return `Resource [${url}] not correct, response ${resp.status}`
      }
    } catch (e) {
      return `Fail to fetch [${url}]: ${e.toString()}`
    }
  } else if (path.isAbsolute(url)) {
    try {
      return (await fs.readFile(url)).toString()
    } catch (e) {
      return `Fail to read file [${url}]: ${e.toString()}`
    }
  } else {
    return `Not a valid resource [${url}], should be HTTP resource or file path.`
  }
}