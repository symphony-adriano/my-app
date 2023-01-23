export class DataSource {

  comments = [
    {
      id: 1,
      text: 'ciao'
    },
    {
      id: 2,
      text: 'hola'
    },
  ]
  changeListeners = []

  constructor() {

  }

  addChangeListener = (changeListener) => {
    this.changeListeners.push(changeListener)
  }

  removeChangeListener = () => {
    this.changeListeners = []
  }

  update = () => {
    this.comments.push({id: 3, text: 'salut'})
    this.changeListeners[0]()
  }

  getComments = () => this.comments
}
