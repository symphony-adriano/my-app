import React from 'react'

import './LayoutExample.css'

const LayoutCell = ({ numero, onFocus, isActive }) => {

  const ref = React.useRef() 

  React.useEffect(() => {
    if (isActive) {
      ref.current.focus()
    }
  }, [isActive])

  const handleFocus = () => {
    onFocus(numero)
  }

  return (
    <div ref={ref} onClick={handleFocus} className={`module content ${isActive ? 'stocazzo' : ''}`}>
      <p>{numero}</p>
    </div>
  )
}

const LayoutExample = () => {
  const [activeCell, setActiveCell] = React.useState();
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
    <LayoutCell key={element} numero={element} onFocus={onCellFocus} isActive={element === activeCell} />
  )

  const onCellFocus = (numero) => {
    setActiveCell(numero)
  }

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
