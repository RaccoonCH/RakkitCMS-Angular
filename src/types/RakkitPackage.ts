import { IRakkitPackage, RakkitType } from '.'
import gql from 'graphql-tag'

export class RakkitPackage implements IRakkitPackage {
  public readonly id: string
  public readonly name: string
  public readonly description: string
  public readonly requiredRole: string
  public readonly attributes: RakkitType[]
  public readonly icon?: string
  public readonly mainQueryRoute: string  // The main query router (RP: Example = examples)

  /**
   * Convert an array of attributes to a graphql query
   */
  public get MainQuery() {
    const attributesToQuery = this.attributes.filter((attr) => attr.isInHeader).map((attr) => {
      switch (attr.type.name) {
        case 'password':
          return
        case 'object':
          return `${attr.name} { ${attr.propertyToShow} }`
        default:
          return attr.name
      }
    })
    return gql`
      query {
        ${this.mainQueryRoute} {
          ${attributesToQuery}
        }
      }
    `
  }

  constructor(rp: IRakkitPackage) {
    this.id = rp.id
    this.name = rp.name
    this.attributes = rp.attributes
    this.description = rp.description
    this.requiredRole = rp.requiredRole
    this.icon = rp.icon
    this.mainQueryRoute = rp.mainQueryRoute || this.name.toLowerCase() + 's'
  }
}
