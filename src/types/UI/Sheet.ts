export class Sheet {
  private static readonly animationDuration: number = 500
  private _rp: Object
  private _leaving: boolean
  private _disabling: boolean
  private _entering: boolean
  private _active: boolean
  private _right: boolean
  private _enabling: boolean

  public get Rp() {
    return this._rp
  }

  public get Leaving() {
    return this._leaving
  }

  public get Disabling() {
    return this._disabling
  }

  public get Entering() {
    return this._entering
  }

  public get Active() {
    return this._active
  }

  public get Right() {
    return this._right
  }

  public get Enabling() {
    return this._enabling
  }

  public get Style() {
    return {
      transition: `right ${Sheet.animationDuration}ms`
    }
  }

  constructor(rp?: Object) {
    if (rp) {
      this._rp = rp
    }
    this._leaving = false
    this._disabling = false
    this._entering = false
    this._active = false
    this._right = true
  }

  private static animationDelay() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, Sheet.animationDuration)
    })
  }

  /**
   * Open the sheet from the right side
   */
  public async open(rp?: Object) {
    if (rp) {
      this._rp = rp
    }
    this._entering = true
    this._right = false
    this._active = true
    await Sheet.animationDelay()
    this._entering = false
  }

  /**
   * Close the sheet, it goes to the right
   */
  public async close() {
    this._right = true
    this._leaving = true
    this._active = false
    await Sheet.animationDelay()
    this._leaving = false
  }

  /**
   * Disable the sheet, put it into the left
   */
  public async disable() {
    this._disabling = true
    this._active = false
    await Sheet.animationDelay()
    this._disabling = false
  }

  /**
   * Enable the sheet, put it to the right and
   */
  public async enable() {
    this._active = true
    this._enabling = true
    await Sheet.animationDelay()
    this._enabling = false
  }
}
