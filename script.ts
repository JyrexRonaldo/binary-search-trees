import tree from "./tree.ts";

type NodeType = {
  left: NodeType | null;
  right: NodeType | null;
  data: number;
} | null;

const prettyPrint = (node: NodeType, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let testArr: number[] = Array.from({ length: 20 }).map(() =>
  Math.floor(Math.random() * 100),
);



const testTree = tree(testArr);

prettyPrint(testTree.getRoot())

console.log(testTree.isBalanced())

console.log("levelOrderForEach")
testTree.levelOrderForEach(console.log)
console.log("preOrderForEach")
testTree.preOrderForEach(console.log)
console.log("inOrderForEach")
testTree.inOrderForEach(console.log)
console.log("postOrderForEach")
testTree.postOrderForEach(console.log)


testTree.insert(101)
testTree.insert(102)
testTree.insert(103)
testTree.insert(104)
testTree.insert(105)

prettyPrint(testTree.getRoot())


console.log(testTree.isBalanced())

testTree.rebalance()

console.log(testTree.isBalanced())

prettyPrint(testTree.getRoot())

console.log("levelOrderForEach")
testTree.levelOrderForEach(console.log)
console.log("preOrderForEach")
testTree.preOrderForEach(console.log)
console.log("inOrderForEach")
testTree.inOrderForEach(console.log)
console.log("postOrderForEach")
testTree.postOrderForEach(console.log)

