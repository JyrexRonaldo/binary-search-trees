const node = (data) => {
  let left = null;
  let right = null;
  return { data, right, left };
};

const data = (node, start, end) => {
  return { node, start, end };
};

const queue = () => {
  const items = {};
  let headIndex = 0;
  let tailIndex = 0;

  const enqueue = (item) => {
    items[tailIndex] = item;
    tailIndex++;
  };

  const isEmpty = () => {
    return tailIndex === headIndex;
  };

  const size = () => {
    return tailIndex - headIndex;
  };

  const dequeue = () => {
    if (isEmpty()) return null;
    let item = items[headIndex];
    delete items[headIndex];
    headIndex++;
    return item;
  };

  return {
    enqueue,
    isEmpty,
    size,
    dequeue,
  };
};

const tree = (arr) => {
  const buildTree = (arr) => {
    arr = Array.from(new Set(arr)).sort((a, b) => (a > b ? 1 : -1));
    let n = arr.length;
    if (n === 0) return null;

    let mid = Math.floor((n - 1) / 2);
    let root = node(arr[mid]);

    let q = queue();
    q.enqueue(data(root, 0, n - 1));

    while (!q.isEmpty()) {
      let d = q.dequeue();
      let curr = d.node;
      let st = d.start,
        en = d.end;
      mid = Math.floor((st + en) / 2);

      // if left subtree exists
      if (st < mid) {
        let leftVal = Math.floor((st + mid - 1) / 2);
        let left = node(arr[leftVal]);
        curr.left = left;
        q.enqueue(data(left, st, mid - 1));
      }

      // if right subtree exists
      if (en > mid) {
        let rightVal = Math.floor((mid + 1 + en) / 2);
        let right = node(arr[rightVal]);
        curr.right = right;
        q.enqueue(data(right, mid + 1, en));
      }
    }

    return root;
  };

  let root = buildTree(arr);

  const includes = (value) => {
    if (root === null) return;

    let q = queue();

    q.enqueue(root);

    while (!q.isEmpty()) {
      let currentNode = q.dequeue();
      if (currentNode.data === value) {
        return true;
      }
      if (currentNode.left !== null) q.enqueue(currentNode.left);
      if (currentNode.right !== null) q.enqueue(currentNode.right);
    }
    return false;
  };

  const insert = (key) => {
    if (includes(key)) {
      return;
    }
    const temp = node(key);

    // If tree is empty
    if (root === null) return temp;

    // Find the node who is going to have
    // the new node as its child
    let curr = root;
    while (curr !== null) {
      if (curr.data > key && curr.left !== null) {
        curr = curr.left;
      } else if (curr.data < key && curr.right !== null) {
        curr = curr.right;
      } else break;
    }

    // If key is smaller, make it left
    // child, else right child
    if (curr.data > key) curr.left = temp;
    else curr.right = temp;

    return root;
  };

  const getSuccessor = (curr) => {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  };

  const deleteNode = (root, x) => {
    if (root === null) return root;

    if (root.data > x) root.left = deleteNode(root.left, x);
    else if (root.data < x) root.right = deleteNode(root.right, x);
    else {
      // Node with 0 or 1 child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Node with 2 children
      const succ = getSuccessor(root);
      root.data = succ.data;
      root.right = deleteNode(root.right, succ.data);
    }
    return root;
  };

  const deleteItem = (x) => {
    root = deleteNode(root, x);
  };

  const getRoot = () => {
    return root;
  };

  const levelOrderForEach = (callback) => {
    if (root === null) return;

    if (!callback) {
      throw new Error("Parameter is not a number!");
    }

    let q = queue();

    q.enqueue(root);

    while (!q.isEmpty()) {
      let currentNode = q.dequeue();
      // if (currentNode.data === value) {
      //   return true;
      // }
      callback(currentNode.data);
      if (currentNode.left !== null) q.enqueue(currentNode.left);
      if (currentNode.right !== null) q.enqueue(currentNode.right);
    }
  };

  const inorderTraversal = (root, callback) => {
    if (root === null) {
      return;
    }
    inorderTraversal(root.left, callback);
    callback(root.data);
    inorderTraversal(root.right, callback);
  };

  const inOrderForEach = (callback) => {
    inorderTraversal(root, callback);
  };

  const preOrderTraversal = (root, callback) => {
    if (root === null) {
      return;
    }
    callback(root.data);
    preOrderTraversal(root.left, callback);
    preOrderTraversal(root.right, callback);
  };

  const preOrderForEach = (callback) => {
    preOrderTraversal(root, callback);
  };

  const postOrderTraversal = (root, callback) => {
    if (root === null) {
      return;
    }
    postOrderTraversal(root.left, callback);
    postOrderTraversal(root.right, callback);
    callback(root.data);
  };

  const postOrderForEach = (callback) => {
    postOrderTraversal(root, callback);
  };

  const getHeight = (root, h) => {
    if (root === null) return h - 1;
    return Math.max(getHeight(root.left, h + 1), getHeight(root.right, h + 1));
  };

  const depth = (value) => {
    let q = queue();
    q.enqueue([root, 0]);

    let lastLevel = 0;

    // function to get the height of tree
    let height = getHeight(root, 0);

    // printing the level order of tree
    while (!q.isEmpty()) {
      let [currentNode, lvl] = q.dequeue();

      if (lvl > lastLevel) {
        lastLevel = lvl;
      }

      // all levels are printed
      if (lvl > height) break;

      // printing null node
      // process.stdout.write((node.data === -1 ? "N" : node.data) + " ");
      if (currentNode.data === value) {
        return lvl;
      }

      // null node has no children
      if (currentNode.data === -1) continue;

      if (currentNode.left === null) q.enqueue([node(-1), lvl + 1]);
      else q.enqueue([currentNode.left, lvl + 1]);

      if (currentNode.right === null) q.enqueue([node(-1), lvl + 1]);
      else q.enqueue([currentNode.right, lvl + 1]);
    }
  };

  const height = (value) => {
    let q = queue();
    q.enqueue([root, 0]);

    let lastLevel = 0;

    // function to get the height of tree
    let height = getHeight(root, 0);

    // printing the level order of tree
    while (!q.isEmpty()) {
      let [currentNode, lvl] = q.dequeue();

      if (lvl > lastLevel) {
        lastLevel = lvl;
      }

      // all levels are printed
      if (lvl > height) break;

      // printing null node
      if (currentNode.data === value) {
        return height - lvl;
      }

      // null node has no children
      if (currentNode.data === -1) continue;

      if (currentNode.left === null) q.enqueue([node(-1), lvl + 1]);
      else q.enqueue([currentNode.left, lvl + 1]);

      if (currentNode.right === null) q.enqueue([node(-1), lvl + 1]);
      else q.enqueue([currentNode.right, lvl + 1]);
    }
  };

  const rebalance = () => {
    const allNodevalues = [];
    const getValue = (value) => {
      allNodevalues.push(value);
    };
    inOrderForEach(getValue);

    root = buildTree(allNodevalues);
  };

  const getLeftLength = (node, l) => {
    if (node === null) return l - 1;
    return getLeftLength(node.left, l + 1);
  };

  const getRightLength = (node, l) => {
    if (node === null) return l - 1;
    return getRightLength(node.right, l + 1);
  };

  const isBalanced = () => {
    let q = queue();
    q.enqueue(root);

    while (!q.isEmpty()) {
      let currentNode = q.dequeue();

      const leftLength = getLeftLength(currentNode, 0);

      const rightLength = getRightLength(currentNode, 0);

      const difference = leftLength - rightLength;
      if (difference > 1 || difference < -1) {
        return false;
      }
      if (currentNode.left !== null) q.enqueue(currentNode.left);
      if (currentNode.right !== null) q.enqueue(currentNode.right);
    }

    return true;
  };

  return {
    getRoot,
    includes,
    insert,
    deleteItem,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    depth,
    height,
    rebalance,
    isBalanced,
  };
};


export default tree