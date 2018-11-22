import {
  IShorttext,
  IObject,
  INumber,
  IJson,
  IHtml,
  IDate,
  IId,
  IDouble,
  IImage,
  IInteger,
  IMap,
  ILongtext,
  IPassword
} from '.'

export type RakkitType = (
  IShorttext
  & IObject
  & INumber
  & IJson
  & IHtml
  & IDate
  & IId
  & IDouble
  & IImage
  & IInteger
  & IMap
  & ILongtext
  & IPassword
)

export interface IRakkitPackageAttribute {
  readonly name: string
  readonly type: {
    name: string,
    subject: string
  }
  readonly isInHeader: boolean
  readonly isEditable: boolean
  readonly isSearchable: boolean
  readonly placeOrder?: number
}

export interface IRakkitPackage {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly requiredRole: string
  readonly attributes: RakkitType[]
  readonly mainQueryRoute: string
  readonly icon?: string
}
