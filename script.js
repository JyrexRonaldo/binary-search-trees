import tree from "./tree.js";

function getArray() {
  const array = [];
  for (let index = 0; index < 100; index++) {
    array.push(Math.floor(Math.random() * 101));
  }
  return array;
}

console.log(getArray());

const currentTree = tree(getArray());

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

prettyPrint(currentTree.getRoot());

console.log({isbalanced: currentTree.isBalanced()});

function getLevelOrderedElements() {
  const levelOrderedElements = [];

  const printLevelOrder = (value) => {
    levelOrderedElements.push(value);
  };

  currentTree.levelOrderForEach(printLevelOrder);

  return levelOrderedElements;
}

console.log({ levelOrder: getLevelOrderedElements() });

function getPreOrderedElements() {
  const elements = [];
  const printOrder = (value) => {
    elements.push(value);
  };
  currentTree.preOrderForEach(printOrder);
  return elements;
}

console.log({ preOrder: getPreOrderedElements() });

function getInOrderedElements() {
  const elements = [];
  const printOrder = (value) => {
    elements.push(value);
  };
  currentTree.inOrderForEach(printOrder);
  return elements;
}

console.log({ inOrder: getInOrderedElements() });

function getPostOrderedElements() {
  const elements = [];
  const printOrder = (value) => {
    elements.push(value);
  };
  currentTree.postOrderForEach(printOrder);
  return elements;
}

console.log({ postOrder: getPostOrderedElements() });

currentTree.insert(33331);
currentTree.insert(33332);
currentTree.insert(33333);
currentTree.insert(33343);
currentTree.insert(33335);
currentTree.insert(33336);
currentTree.insert(43331);
currentTree.insert(43332);
currentTree.insert(43333);
currentTree.insert(43343);
currentTree.insert(43335);
currentTree.insert(53336);
currentTree.insert(53331);
currentTree.insert(53332);
currentTree.insert(53333);
currentTree.insert(53343);
currentTree.insert(53335);

prettyPrint(currentTree.getRoot());

console.log({isbalanced: currentTree.isBalanced()});

currentTree.rebalance();

prettyPrint(currentTree.getRoot());

console.log({isbalanced: currentTree.isBalanced()});

function getLevelOrderedElementsInsert() {
  const levelOrderedElements = [];

  const printLevelOrder = (value) => {
    levelOrderedElements.push(value);
  };

  currentTree.levelOrderForEach(printLevelOrder);

  return levelOrderedElements;
}

console.log({ levelOrder: getLevelOrderedElementsInsert() });

function getPreOrderedElementsInsert() {
  const elements = [];
  const printOrder = (value) => {
    elements.push(value);
  };
  currentTree.preOrderForEach(printOrder);
  return elements;
}

console.log({ preOrder: getPreOrderedElementsInsert() });

function getInOrderedElementsInsert() {
  const elements = [];
  const printOrder = (value) => {
    elements.push(value);
  };
  currentTree.inOrderForEach(printOrder);
  return elements;
}

console.log({ inOrder: getInOrderedElementsInsert() });

function getPostOrderedElementsInsert() {
  const elements = [];
  const printOrder = (value) => {
    elements.push(value);
  };
  currentTree.postOrderForEach(printOrder);
  return elements;
}

console.log({ postOrder: getPostOrderedElementsInsert() });