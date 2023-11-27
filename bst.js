// Function to generate an array of unique random numbers less than 100
function generateRandomArray(length) {
  const randomArray = [];
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < length) {
    const randomNumber = Math.floor(Math.random() * 100);
    if (!uniqueNumbers.has(randomNumber)) {
      uniqueNumbers.add(randomNumber);
      randomArray.push(randomNumber);
    }
  }

  return randomArray;
}

// Node creation functions
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

// Function to build a binary search tree from a sorted array
function buildTree(array, start = 0, end = array.length - 1) {
  array.sort((a, b) => a - b);
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const rootNode = tree(array[mid]);

  rootNode.left = buildTree(array, start, mid - 1);
  rootNode.right = buildTree(array, mid + 1, end);

  return rootNode;
}

// Function to insert a node into the binary search tree
function insertNode(nodeToInsert, array) {
  array.push(nodeToInsert);
  let result = buildTree(array);
  return result;
}

// Function to delete a node from the binary search tree
function deleteNode(nodeToDelete, array) {
  let index = array.indexOf(nodeToDelete);
  if (index !== -1) {
    array.splice(index, 1);
  }
  let result = buildTree(array);
  return result;
}

// Pretty print the binary search tree
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

// Function to find a node in the binary search tree
function find(nodeToFind, node, isLeft = true) {
  if (node === null) {
    return null;
  }
  if (node.value === nodeToFind) {
    return node;
  }
  if (node.right !== null) {
    const result = find(nodeToFind, node.right, false);
    if (result !== null) {
      return result;
    }
  }
  if (node.left !== null) {
    const result = find(nodeToFind, node.left, true);
    if (result !== null) {
      return result;
    }
  }
  return null;
}

// Callback object for listNode functions
let list = [];
function listNodeCallback() {
  return {
    listNode(node) {
      if (node !== null) {
        list.push(node.value);
        return list;
      } else {
        return list;
      }
    },
    empty() {
      while (list.length > 0) {
        list.pop(list);
      }
      return list;
    },
    print() {
      console.log(list);
    },
  };
}

// Function to create a queue
function createQueue() {
  const items = [];
  return {
    // Add an element to the queue
    enqueue(element) {
      items.push(element);
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
      console.log("Printed Queue ^^^");
    },
  };
}

// Function for level order traversal of the binary search tree
function levelOrder(queueFactory, node, listNode, nodeQueue, currentList = []) {
  if (nodeQueue === undefined) {
    nodeQueue = queueFactory();
    nodeQueue.enqueue(node);
    return levelOrder(queueFactory, node, listNode, nodeQueue, currentList);
  } else {
    let listNodeFactory = listNodeCallback();
    let currentList = listNodeFactory.listNode(node);
    nodeQueue.dequeue(node);
    nodeQueue.enqueue(node.left);
    nodeQueue.enqueue(node.right);
    while (!nodeQueue.isEmpty() && nodeQueue.front() === null) {
      nodeQueue.dequeue();
    }
    if (!nodeQueue.isEmpty()) {
      return levelOrder(
        queueFactory,
        nodeQueue.front(),
        listNode,
        nodeQueue,
        currentList
      );
    } else {
      return currentList;
    }
  }
}

// Functions for different tree traversals
function preorder(node, listNodeCallback) {
  {
    listNodeFactory = listNodeCallback();
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

// Function to calculate the height of a node
function height(leNode, side = "left", currentHeight = 0) {
  if (leNode === null) {
    return currentHeight;
  }

  if (leNode.left === null && leNode.right === null) {
    return currentHeight;
  }
  let childNode = side === "left" ? leNode.left : leNode.right;
  let childHeight = height(childNode, side, (currentHeight += 1));

  return childHeight;
}

// Function to calculate the depth of a given node in the tree
function depth(givenNode, rootNode, isLeft = true, currentDepth = 0) {
  if (givenNode.value === rootNode.value) {
    return currentDepth;
  }
  let rightDepth = 0;
  let leftDepth = 0;
  if (rootNode.right !== null) {
    rightDepth = depth(givenNode, rootNode.right, false, currentDepth + 1);
  }
  if (rootNode.left !== null) {
    leftDepth = depth(givenNode, rootNode.left, true, currentDepth + 1);
  }
  return Math.max(leftDepth, rightDepth);
}

// Function to check if the tree is balanced
function isBalanced(node, height) {
  if (node === null) {
    return true;
  }
  let leftHeight = height(node, "left");
  let rightHeight = height(node, "right");
  let difference = Math.abs(leftHeight - rightHeight);
  if (difference > 1) {
    return false;
  }
  let leftBalanced = isBalanced(node.left, height);
  let rightBalanced = isBalanced(node.right, height);

  return leftBalanced && rightBalanced;
}

// Generate a random array and build a binary search tree
let randomArray = generateRandomArray(25);
let result = buildTree(randomArray);
prettyPrint(result);

// Check if the tree is balanced
let balancedResult = isBalanced(result, height);
console.log('Is the tree balanced?', balancedResult);

// Find and print the height of a specific node
let nodeToFind = find(randomArray[5], result);
let leftHeightResult = height(nodeToFind, "left");
let rightHeightResult = height(nodeToFind, "right");
console.log(`Height of Node ${randomArray[5]}:`, Math.max(leftHeightResult, rightHeightResult));

// Find and print the depth of a specific node
let givenNode = find(randomArray[2], result);
let depthResult = depth(givenNode, result);
console.log(`Depth of Node ${randomArray[2]}:`, depthResult);

// Perform different tree traversals and print the results
let preorderResult = preorder(result, listNodeCallback);
console.log("Preorder traversal:");
console.log(preorderResult);

let chungus = listNodeCallback();
chungus.empty();

let inorderResult = inorder(result, listNodeCallback);
console.log("Inorder traversal:");
console.log(inorderResult);
chungus.empty();

let postorderResult = postorder(result, listNodeCallback);
console.log("Postorder traversal:");
console.log(postorderResult);
chungus.empty();

let levelOrderResult = levelOrder(createQueue, result, listNodeCallback);
console.log("Levelorder traversal:");
console.log(levelOrderResult);
chungus.empty();

// Find a specific node and print its information
const foundNode = find(randomArray[7], result);
if (foundNode !== null) {
  console.log(`Node ${randomArray[7]} found!`, foundNode);
} else {
  console.log("Node not found");
}

// Insert a new node into the tree and print the updated tree
let newTree = insertNode(10, randomArray);
console.log('New tree after adding 10:');
prettyPrint(newTree);

// Delete a specific node from the tree and print the updated tree
console.log(`New tree after removing ${randomArray[3]}:`);
let newerTree = deleteNode(randomArray[3], randomArray);
prettyPrint(newerTree);

