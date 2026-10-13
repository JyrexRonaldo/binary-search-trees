type NodeType = {
  left: NodeType;
  right: NodeType;
  data: number;
} | null;

function node(value: number): NodeType {
  let data = value;
  let left: NodeType = null;
  let right: NodeType = null;
  return { left, right, data };
}

function tree(arr: number[]) {
  arr = arr.sort((a, b) => (a > b ? 1 : -1));
  arr = [...new Set(arr)];

  const buildTree = (arr: number[], start: number, end: number): NodeType => {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = node(arr[mid]);

    // Divide from middle element
    if (root) {
      root.left = buildTree(arr, start, mid - 1);
      root.right = buildTree(arr, mid + 1, end);
    }

    return root;
  };

  let root = buildTree(arr, 0, arr.length - 1);

  const getRoot = () => {
    return root;
  };

  const include = (value: number) => {
    let isContained = false;
    function search(searchRoot = root) {
      if (searchRoot == null) {
        return false;
      }
      if (searchRoot.data === value) {
        isContained = true;
      }
      search(searchRoot.left);
      search(searchRoot.right);
    }
    search();
    return isContained;
  };

  const insert = (value: number) => {
    const temp = node(value);
    // If tree is empty
    if (root === null) {
      return temp;
    }

    let curr = root;

    while (curr !== null) {
      if (curr.data === value) {
        return root;
      } else if (curr.data > value && curr.left !== null) {
        curr = curr.left;
      } else if (curr.data < value && curr.right !== null) {
        curr = curr.right;
      } else {
        break;
      }
    }

    // If key is smaller, make it left
    // child, else right child
    if (curr.data > value) {
      curr.left = temp;
    } else {
      curr.right = temp;
    }

    return root;
  };

  function getSuccessor(curr: NodeType) {
    if (curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) curr = curr.left;
      return curr;
    }
  }

  const deleteItem = (value: number, tmpRoot = root) => {
    if (tmpRoot === null) return tmpRoot;
    if (tmpRoot.data > value) tmpRoot.left = deleteItem(value, tmpRoot.left);
    else if (tmpRoot.data < value)
      tmpRoot.right = deleteItem(value, tmpRoot.right);
    else {
      // Node with 0 or 1 child
      if (tmpRoot.left === null) return tmpRoot.right;
      if (tmpRoot.right === null) return tmpRoot.left;

      // Node with 2 children
      const succ = getSuccessor(tmpRoot);
      if (succ) {
        tmpRoot.data = succ.data;
        tmpRoot.right = deleteItem(succ.data, tmpRoot.right);
      }
    }
    return tmpRoot;
  };

  const levelOrderForEach = (callback: Function) => {
    if (callback === null) {
      throw new Error("callback is required");
    }
    if (root === null) {
      return;
    }
    let queue = [];
    queue.push(root);
    while (queue.length !== 0) {
      let currentNode = queue.shift();
      callback(currentNode?.data);
      if (currentNode?.left !== null) {
        queue.push(currentNode?.left);
      }
      if (currentNode?.right !== null) {
        queue.push(currentNode?.right);
      }
    }
  };

  const inOrderForEach = (callback: Function, currentRoot = root) => {
    if (callback === null) {
      throw new Error("callback is required");
    }

    if (currentRoot === null) {
      return;
    }
    inOrderForEach(callback, currentRoot.left);
    callback(currentRoot.data);
    inOrderForEach(callback, currentRoot.right);
  };

  const preOrderForEach = (callback: Function, currentRoot = root) => {
    if (callback === null) {
      throw new Error("callback is required");
    }

    if (currentRoot === null) {
      return;
    }
    callback(currentRoot.data);
    preOrderForEach(callback, currentRoot.left);
    preOrderForEach(callback, currentRoot.right);
  };

  const postOrderForEach = (callback: Function, currentRoot = root) => {
    if (callback === null) {
      throw new Error("callback is required");
    }

    if (currentRoot === null) {
      return;
    }
    postOrderForEach(callback, currentRoot.left);
    postOrderForEach(callback, currentRoot.right);
    callback(currentRoot.data);
  };

  function getHeight(root: NodeType, h: number): number {
    if (root === null) return h - 1;
    return Math.max(getHeight(root.left, h + 1), getHeight(root.right, h + 1));
  }

  const depth = (value: number) => {
    let queue = [];
    queue.push([root, 0]);

    let lastLevel = 0;

    let treeHeight = getHeight(root, 0);

    while (queue.length !== 0) {
      let [queueNode, lvl] = queue.shift() as [NonNullable<NodeType>, number];

      if (lvl > lastLevel) {
        lastLevel = lvl;
      }

      if (lvl > treeHeight) {
        break;
      }

      if (queueNode.data === value) {
        return lvl;
      }

      if (queueNode.left === null) {
        queue.push([node(-1), lvl + 1]);
      } else {
        queue.push([queueNode.left, lvl + 1]);
      }

      if (queueNode.right === null) {
        queue.push([node(-1), lvl + 1]);
      } else {
        queue.push([queueNode.right, lvl + 1]);
      }
    }
  };

  const height = (value: number) => {
    let queue = [];
    queue.push([root, 0]);

    let lastLevel = 0;

    let treeHeight = getHeight(root, 0);

    while (queue.length !== 0) {
      let [queueNode, lvl] = queue.shift() as [NonNullable<NodeType>, number];

      if (lvl > lastLevel) {
        lastLevel = lvl;
      }

      if (lvl > treeHeight) {
        break;
      }

      if (queueNode.data === value) {
        return treeHeight - lvl;
      }

      if (queueNode.left === null) {
        queue.push([node(-1), lvl + 1]);
      } else {
        queue.push([queueNode.left, lvl + 1]);
      }

      if (queueNode.right === null) {
        queue.push([node(-1), lvl + 1]);
      } else {
        queue.push([queueNode.right, lvl + 1]);
      }
    }
  };

  const isBalanced = () => {
    let queue = [];
    queue.push([root, 0]);

    let lastLevel = 0;

    let treeHeight = getHeight(root, 0);

    while (queue.length !== 0) {
      let [queueNode, lvl] = queue.shift() as [NonNullable<NodeType>, number];

      if (lvl > lastLevel) {
        lastLevel = lvl;
      }

      if (lvl > treeHeight) {
        return true;
      }

      const leftNodeHeight = getHeight(queueNode.left, 0);
      const rightNodeHeight = getHeight(queueNode.right, 0);
      if (
        leftNodeHeight - rightNodeHeight > 1 ||
        leftNodeHeight - rightNodeHeight < -1
      ) {
        return false;
      }

      if (queueNode.left === null) {
        queue.push([node(-1), lvl + 1]);
      } else {
        queue.push([queueNode.left, lvl + 1]);
      }

      if (queueNode.right === null) {
        queue.push([node(-1), lvl + 1]);
      } else {
        queue.push([queueNode.right, lvl + 1]);
      }
    }
  };

  const rebalance = () => {
    const valueArray: number[] = [];
    const extractValues = (value: number) => {
      valueArray.push(value);
    };
    inOrderForEach(extractValues, root);
    root = buildTree(valueArray, 0, valueArray.length - 1);
  };

  return {
    getRoot,
    include,
    insert,
    deleteItem,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export default tree;
