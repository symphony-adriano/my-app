import './LayoutExample.css'

const LayoutExample = () => {
  const layout = ['1', '2', ['B', [['C', 'F'], 'D']]]

  const recursive = (element, direction) =>
    Array.isArray(element) ?
      renderLayout(element, direction) :
      renderLeaf(element)

  const renderLayout = (module, direction = 'horizontal') =>
    <div className={`module cell ${direction}`}>
      {module.map(e => recursive(e, invertDirection(direction)))}
    </div>

  const renderLeaf = (element) => (
    <div className={`module content`}>
      <p>{element}</p>
    </div>
  )

  const invertDirection = (arrayDirection) =>
    arrayDirection === 'horizontal' ? 'vertical' : 'horizontal';

  return (
    <>
      <h1 className='title'>Layout Example</h1>
      <div className="container">
        {renderLayout(layout)}
      </div>
    </>
  )
}

export default LayoutExample
