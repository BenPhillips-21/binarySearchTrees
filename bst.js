const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const node = (value, leftChild = null, rightChild = null) => {
  return {
    value: value,
    left: leftChild,
    right: rightChild,
  };
};

const tree = (mid, left = null, right = null) => {
  return node(mid, left, right);
};

function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const rootNode = tree(array[mid]);

  rootNode.left = buildTree(array, start, mid - 1);
  rootNode.right = buildTree(array, mid + 1, end);

  return rootNode;
}

function insertNode(nodeToInsert, array) {
  array.push(nodeToInsert)
  let result = buildTree(array);
  return result
}

function deleteNode(nodeToDelete, array) {
  let index = array.indexOf(nodeToDelete);
  if (index !== -1) {
    array.splice(index, 1);
  }
  let result = buildTree(array);
  return result;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function find(nodeToFind, node, isLeft = true) {
  if (node === null) {
    return null;
  }
  if (node.value === nodeToFind) {
    console.log('goteem')
    return node
  }
  if (node.right !== null) {
    const result = find(nodeToFind, node.right, false);
    if (result !== null) {
      return result
    }
  }
  if (node.left !== null) {
    const result = find(nodeToFind, node.left, true);
    if (result !== null) {
      return result;
    }
  }
  return null
} 

let list = [];

function listNodeCallback() {
return {
  listNode(node) {
  if (node !== null) {
    list.push(node.value)
    return (list)
  } else {
    return (list)
  }
}, empty() {
    while (list.length > 0) {
      list.pop(list)
    }
    return (list)
  }, print () {
    console.log(list)
  }
}
}

function createQueue() {
  const items = [];
  return {
    // Add an element to the queue
    enqueue(element) {
      items.push(element);
      // console.log(items)
    },
    // Remove and return the front element from the queue
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return items.shift();
    },
    // Return the front element of the queue without removing it
    front() {
      if (this.isEmpty()) {
        return null;
      }
      return items[0];
    },
    // Check if the queue is empty
    isEmpty() {
      return items.length === 0;
    },
    // Return the size of the queue
    size() {
      return items.length;
    },
    print() {
      console.log(items);
      console.log('Printed Queue ^^^')
    },
  };
}

function levelOrder(queueFactory, node, listNode, nodeQueue, currentList = []) {
  if (nodeQueue === undefined) {
  nodeQueue = queueFactory()
  nodeQueue.enqueue(node)
  return levelOrder(queueFactory, node, listNode, nodeQueue, currentList);
  } else {
    let listNodeFactory = listNodeCallback()
    let currentList = listNodeFactory.listNode(node);
    nodeQueue.dequeue(node);
    nodeQueue.enqueue(node.left);
    nodeQueue.enqueue(node.right)
    while (!nodeQueue.isEmpty() && nodeQueue.front() === null) {
      nodeQueue.dequeue();
    } if (!nodeQueue.isEmpty()) {
      return levelOrder(queueFactory, nodeQueue.front(), listNode, nodeQueue, currentList);
    } else {
      return currentList;
      }
    }
  }

function preorder(node, listNodeCallback) { 
  {
  listNodeFactory = listNodeCallback()
  let currentList = listNodeFactory.listNode(node);
  if (node === null) {
    return;
  }
    preorder(node.left, listNodeCallback);
    preorder(node.right, listNodeCallback);
    return currentList;
  }
}

function inorder(node, listNodeCallback) {
  {
    listNodeFactory = listNodeCallback();
    if (node === null) {
      return;
    }
    inorder(node.left, listNodeCallback);
    let currentList = listNodeFactory.listNode(node);
    inorder(node.right, listNodeCallback);
    return currentList;
  }
}

function postorder(node, listNodeCallback) {
  {
    listNodeFactory = listNodeCallback();
    if (node === null) {
      return;
    }
    postorder(node.left, listNodeCallback);
    postorder(node.right, listNodeCallback);
    let currentList = listNodeFactory.listNode(node);
    return currentList;
  }
}

function height(node) {
  console.log("bello")
}

let result = buildTree(array);
prettyPrint(result);

let preorderResult = preorder(result, listNodeCallback)
console.log(preorderResult);

let chungus = listNodeCallback()
chungus.empty()

let inorderResult = inorder(result, listNodeCallback)
console.log(inorderResult);
chungus.empty()

let postorderResult = postorder(result, listNodeCallback);
console.log(postorderResult);
chungus.empty()

let levelOrderResult = levelOrder(createQueue, result, listNodeCallback);
console.log(levelOrderResult);
chungus.empty()

// const foundNode = find(9, result)
// if (foundNode !== null) {
// console.log(foundNode);
// } else {
//   console.log('Node not found')
// }

// let newTree = insertNode(10, array)
// prettyPrint(newTree);

// let newerTree = deleteNode(3, array);
// prettyPrint(newerTree);


