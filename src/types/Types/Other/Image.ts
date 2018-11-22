import { IRakkitPackageAttribute } from '../..'

export interface IImage extends IRakkitPackageAttribute {
  readonly placeholder?: string
  readonly sizeUnit?: string
  readonly maxSize?: number
  readonly acceptedMime?: string[]
}
