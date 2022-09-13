import { useState } from 'react'
import "./LayoutExample.css"

import { invertDirection } from "./utils"

const Leaf = ({ element, handleClick }) =>
  <div
    key={element}
    className={`module content`}
    onClick={() => handleClick(element)}>
    <p>{element}</p>
  </div>

const LayoutExample = () => {
  const [selectedElement, setSelectedElement] = useState('')
  const layout = ["1", "2", ["B", [["C", "F"], "D"]]]

  const renderLayout = (layout, direction) =>
    Array.isArray(layout) ?
      <div className={`module cell ${direction}`}>
        {layout.map((inner) => renderLayout(inner, invertDirection(direction)))}
      </div> :
      <Leaf element={layout} handleClick={setSelectedElement} />

  return (
    <>
      <h1 className="title">Selected Element: {selectedElement}</h1>
      <div className="container">{renderLayout(layout, 'horizontal')}</div>
    </>
  )
}

export default LayoutExample;
