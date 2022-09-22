function printDOM(node, prefix = '') {
    console.log(prefix + node.nodeName)
    node.childNodes.forEach((currentNode) => {
        printDOM(currentNode, prefix + '\t')
    })
}
