export interface IRakkitPackageAttribute {
  typeName: string
  isInHeader: boolean
  isEditable: boolean
  isSearchable: boolean
  placeHolder?: string
}

export interface IRakkitPackage {
  id: string
  name: string
  description: string
  icon?: string
  requiredRole: string
  attributes: {
    [key: string]: IRakkitPackageAttribute
  }
}
