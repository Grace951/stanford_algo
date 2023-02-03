class Node {
  children = [];
  value = null;
  constructor(value, left = null, right = null) {
    this.value = value;
    left !== null && (this.children[0] = left);
    right !== null && (this.children[1] = right);
  }
  addLeftChild(value) {
    this.children[0] = value;
  }
  addRightChild(value) {
    this.children[1] = value;
  }
  getValue() {
    return this.value;
  }
  getChildren() {
    return this.children;
  }
}

class Tree {
  root = null;
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  getMinLength() {
    return this.getNodeMinLength(this.root);
  }
  getMaxLength() {
    return this.getNodeMaxLength(this.root);
  }
  getNodeMaxLength(node) {
    if (!node) {
      return 0;
    }
    let maxLegth = 1;
    const children = node.getChildren();
    if (children.length) {
      const leftLength = this.getNodeMaxLength(children[0]);
      const rightLength = this.getNodeMaxLength(children[1]);
      maxLegth += Math.max(leftLength, rightLength);
    }
    return maxLegth;
  }
  getNodeMinLength(node) {
    if (!node) {
      return 0;
    }
    let minLegth = 1;
    const children = node.getChildren();
    if (children.length) {
      const leftLength = this.getNodeMinLength(children[0]);
      const rightLength = this.getNodeMinLength(children[1]);
      minLegth += Math.min(leftLength, rightLength);
    }
    return minLegth;
  }
}

module.exports.Tree = Tree;
module.exports.Node = Node;
