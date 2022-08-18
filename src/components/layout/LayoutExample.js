import './LayoutExample.css'

const LayoutExample = () => {
  const layout = ['A', ['B', [['C', 'F'],  'D']]]

  const renderLayout = (module, direction) =>
    <div className={`module ${direction}`}>
      {module.map(e => recursive(e, invertDirection(direction)))}
    </div>

  const recursive = (element, direction) =>
    Array.isArray(element) ?
      renderLayout(element, direction) :
      renderLeaf(element)

  const renderLeaf = (element) => (
    <div className={`module`}>
      <p>{element}</p>
    </div>
  )

  const invertDirection = (arrayDirection) =>
    arrayDirection === 'horizontal' ? 'vertical' : 'horizontal';

  return (
    <>
      <h1>Layout Example</h1>
      <div className="container">
        <div className='module'>
          {renderLayout(layout, 'horizontal')}
        </div>
      </div>
    </>
  )
}

export default LayoutExample
