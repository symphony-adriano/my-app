import "./LayoutExample.css"

import { invertDirection } from "./utils"

const LayoutExample = () => {
  const layout = ["1", "2", ["B", [["C", "F"], "D"]]]

  const renderLayout = (layout, direction) =>
    Array.isArray(layout) ?
      <div className={`module cell ${direction}`}>
        {layout.map((inner) => renderLayout(inner, invertDirection(direction)))}
      </div> :
      renderLeaf(layout)

  const renderLeaf = (element) =>
    <div key={element} className={`module content`}>
      <p>{element}</p>
    </div>

  return (
    <>
      <h1 className="title">Layout Example</h1>
      <div className="container">{renderLayout(layout, 'horizontal')}</div>
    </>
  )
}

export default LayoutExample;
