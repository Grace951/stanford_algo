var fs = require('node:fs');
const { Tree, Node } = require('./tree.js');
const { Heap } = require('./heap.js');

let NODE_COUNT = 0;
const heap = new Heap(
  (a, b) => a.value - b.value,
  (item) => item.id,
  'minHeap'
);

function huffman(heap) {
  let root = null;
  let currentMaxIdx = heap.size();
  console.log(heap.size());
  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();
    // console.log(a.id, a.node.getValue(), b.id, b.node.getValue());
    const sum = a.node.getValue() + b.node.getValue();
    root = new Node(sum, a.node, b.node);
    heap.push({ id: currentMaxIdx++, node: root, value: sum });
  }
  const tree = new Tree(root);
  return tree;
}

try {
  const content = fs.readFileSync('3.1_input.txt', 'utf8'); // 9, 19
  // const content = fs.readFileSync('3.1_test.txt', 'utf8'); // 2, 3

  content
    ?.split('\n')
    .slice(1)
    .forEach((str, id) => {
      const value = Number(str.trim());
      heap.push({ id, node: new Node(value), value });
    });

  const NODE_COUNT = Number(content?.split('\n')?.[0].trim());

  const tree = huffman(heap);
  console.log(tree.getMinLength() - 1, tree.getMaxLength() - 1);
} finally {
}
