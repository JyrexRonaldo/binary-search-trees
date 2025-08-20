function node(data) {
  let left = null;
  let right = null;
  return { data, left, right };
}

function tree(arr) {
  // Set is to remove duplicates
  arr = Array.from(new Set(arr)).sort((a, b) => a - b);

  let root = buildTree(arr);

  function buildTree(arr) {
    let n = arr.length;

    if (n === 0) return null;

    let mid = Math.floor((n - 1) / 2);
    let root = node(arr[mid]);

    let q = [{ node: root, range: [0, n - 1] }];
    let frontIndex = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let curr = front.node;
      let [s, e] = front.range;
      let index = s + Math.floor((e - s) / 2);

      if (s < index) {
        let midLeft = s + Math.floor((index - 1 - s) / 2);
        let left = node(arr[midLeft]);
        curr.left = left;
        q.push({ node: left, range: [s, index - 1] });
      }

      if (e > index) {
        let midRight = index + 1 + Math.floor((e - index - 1) / 2);
        let right = node(arr[midRight]);
        curr.right = right;
        q.push({ node: right, range: [index + 1, e] });
      }

      frontIndex++;
    }

    return root;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function insert(root, key) {
    if (root === null) return node(key);

    if (root.key === key) return root;

    if (key < root.key) root.left = insert(root.left, key);
    else if (key > root.key) root.right = insert(root.right, key);

    return root;
  }

  function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  function deleteItem(root, x) {
    if (root === null) {
      return root;
    }

    if (root.key > x) {
      root.left = deleteItem(root.left, x);
    } else if (root.key < x) {
      root.right = deleteItem(root.right, x);
    } else {
      if (root.left === null) return root.right;

      if (root.right === null) return root.left;

      let succ = getSuccessor(root);
      root.key = succ.key;
      root.right = deleteItem(root.right, succ.key);
    }
    return root;
  }

  function find(value) {
    if (root === null) {
      return;
    }

    const q = [root];

    let frontIndex = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let curr = front.node;
      if (curr.left !== null) {
        q.push(curr.left);
      }
      if (curr.right !== null) {
        q.push(curr.right);
      }
      frontIndex++;
    }

    return q.find((node) => node.data === value);
  }

  function levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (root === null) {
      return;
    }

    const q = [root];

    let frontIndex = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let curr = callback(front.node);
      if (curr.left !== null) {
        q.push(curr.left);
      }
      if (curr.right !== null) {
        q.push(curr.right);
      }
      frontIndex++;
    }
  }

  function inOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    if (root === null) {
      return;
    }
    inOrderForEach(root.left);
    callback(root.data);
    inOrderForEach(root.right);
  }
  function preOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    if (root === null) {
      return;
    }
    callback(root.data);
    preOrderForEach(root.left);
    preOrderForEach(root.right);
  }
  function postOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }
    if (root === null) {
      return;
    }
    postOrderForEach(root.left);
    postOrderForEach(root.right);
    callback(root.data);
  }

  function rebalance() {
    let arr = [];
    function sortArray(item) {
      arr.push(item);
    }
    inOrderForEach(sortArray);
    root = buildTree(arr);
  }

  return prettyPrint(root);
}

console.log(tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
