const { useEffect } = require("react")

const handleKeyPress = event => {
  console.log(`Key pressed: ${event.key}`)
}

const Hello = () => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.addEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default Hello
