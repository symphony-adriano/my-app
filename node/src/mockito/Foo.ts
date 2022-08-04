class Foo {
  private _age: number
  // private _firstName: string;
  // private _lastName: string;

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
