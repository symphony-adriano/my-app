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
  changeListeners = null

  constructor() {

  }

  addChangeListener = (changeListener) => {
    this.changeListeners = changeListener
  }

  removeChangeListener = () => {
    this.changeListeners = null
  }

  update = () => {
    this.comments.push({ id: 3, text: 'salut' })
    this.changeListeners(this.comments)
  }

  getComments = () => {
    console.log('getComments')
    return this.comments
  }
}
