class Foo {
  private _age: number

  public getBar = () => 'Fortunate Son'

  public get age() {
    return this._age
  }

  public set age(theAge: number) {
    if (theAge <= 0 || theAge >= 130) {
      throw new Error('The age is invalid')
    }
    this._age = theAge
  }
}

export default Foo
