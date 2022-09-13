import { useEffect, useState, useRef } from "react"
import { invertDirection } from "./utils"
import "./LayoutExample.css"

const Leaf = ({value, handleClick, isActive}) => {
  const ref = useRef()

  useEffect(() => {
    if (isActive) {
      ref.current.focus()
    }
  }, [isActive])

  return (
    <div ref={ref} onClick={() => handleClick(value)} className={`module content ${isActive ? 'focus' : ''}`}>
      <p>{value}</p>
    </div>
  )
}

const LayoutExample = () => {
  const layout = ["1", "2", ["B", [["C", "F"], "D"]]]
  const [activeLeaf, setActiveLeaf] = useState()

  const renderLayout = (layout, direction) =>
    Array.isArray(layout) ?
      <div className={`module cell ${direction}`}>
        {layout.map((inner) => renderLayout(inner, invertDirection(direction)))}
      </div> :
      <Leaf value={layout} handleClick={layout => setActiveLeaf(layout)} isActive={layout === activeLeaf} />

  return (
    <>
      <h1 className="title">Layout Example</h1>
      <div className="container">{renderLayout(layout, 'horizontal')}</div>
    </>
  )
}

export default LayoutExample;
