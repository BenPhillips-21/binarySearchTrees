const linkedList = (...initialNodes) => {
    const list = {
      nodes: [...initialNodes],

      prepend: function (value) {
        const newNode = node(value);
        newNode.nextNode = initialNodes[0];
        initialNodes.unshift(newNode);
      },
      append: function (value) {
        const newNode = node(value);
        const lastNode = initialNodes.length - 1;
        initialNodes[lastNode].nextNode = newNode;
        initialNodes.push(newNode);
      },
      size: function () {
        console.log(
          `The size of the linked list is ${initialNodes.length} nodes`
        );
      },
      head: function () {
        console.log(initialNodes[0]);
      },
      tail: function () {
        const lastNode = initialNodes.length - 1;
        console.log(initialNodes[lastNode]);
      },
      at: function (index) {
        console.log(initialNodes[index]);
      },
      pop: function () {
        initialNodes.pop();
        const lastNode = initialNodes.length - 1;
        initialNodes[lastNode].nextNode = null;
        console.log(initialNodes);
      },
      contains: function (input) {
        for (const element of initialNodes) {
          if (element.value === input) {
            return true;
          }
        }
        return false;
      },
      find: function (input) {
        for (const [index, element] of initialNodes.entries()) {
          if (element.value === input) {
            return index;
          }
        }
        return null;
      },
      toString: function () {
        console.log(
          initialNodes
            .map(
              (node, index) =>
                `(${node.value})${
                  index < initialNodes.length - 1 ? " --> " : " --> null"
                }`
            )
            .join("")
        );
      },
      display: function () {
        console.log(
          initialNodes.map((node) => ({
            value: node.value,
            nextNode: node.nextNode ? { value: node.nextNode.value } : null,
          }))
        );
      },
    };
    return list;
};

const node = (value = null, nextNode = null) => {
  const node = {
    value: value,
    nextNode: nextNode,
  };
  return node;
};

const node1 = node("A");
const node2 = node("B");
const node3 = node("C");
const node4 = node("D");

node1.nextNode = node2;
node2.nextNode = node3;
node3.nextNode = node4;

const theList = linkedList(node1, node2, node3, node4);

theList.prepend('Z?')
theList.append('Poo')
theList.display()
theList.size();
theList.head()
theList.tail()
theList.at(2)
theList.pop()
let result = theList.contains('D')
console.log(result)
let found = theList.find('chungus')
console.log(found)
theList.toString()
