// Play with:
//
// onClickCapture
// event.stopPropagation()
// event.eventPhase


const handleParent = (event) => {
    logTargets(event)
    console.log('parent')
    // console.log(event.eventPhase)
}

const handleChild = (event) => {
    // event.stopPropagation()

    logTargets(event)
    console.log('child')
    // console.log(event.eventPhase)
}

const EventDelegation = () => (
    <div className="parent" onClick={handleParent}>
        <button>parent</button>
        <div className="child" onClick={handleChild}>
            <button>child</button>
        </div>
    </div>
)

const logTargets = event => {
    logTarget(event)
    logCurrentTarget(event)
}
const logTarget = event => console.log('event.target: ', event.target)
const logCurrentTarget = event => console.log('event.currentTarget: ', event.currentTarget)

export { EventDelegation, handleChild, handleParent }
