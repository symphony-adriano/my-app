interface LabeledValue {
    label: string;
}

function printLabel2(labeledObj: LabeledValue) {
    console.log(labeledObj.label)
}

const myObj2 = { size: 10, label: "Size 10 Object"}

printLabel2(myObj2)
