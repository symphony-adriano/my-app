const handleParent = (event) => {
    logTargets(event)
    console.log('PARENT')
    // console.log(event.eventPhase)
}

const handleChild = (event) => {
    // event.stopPropagation()

    logTargets(event)
    console.log('CHILD')
    // console.log(event.eventPhase)
}

const logTargets = event => {
    logTarget(event)
    logCurrentTarget(event)
}
const logTarget = event => console.log('event.target: ', event.target)
const logCurrentTarget = event => console.log('event.currentTarget: ', event.currentTarget)

const parent = document.getElementsByClassName('parent')[0]
const child = document.getElementsByClassName('child')[0]

parent.addEventListener('click', handleParent)
child.addEventListener('click', handleChild)

