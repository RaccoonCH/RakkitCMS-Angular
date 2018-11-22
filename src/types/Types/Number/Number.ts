import { IRakkitPackageAttribute } from '../..'

export interface INumber extends IRakkitPackageAttribute {
  readonly min?: number
  readonly max?: number
}
