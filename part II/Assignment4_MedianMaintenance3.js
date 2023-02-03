var fs = require('node:fs');
var MinHeap = require('mnemonist/heap').MinHeap;
var MaxHeap = require('mnemonist/heap').MaxHeap;
// import Heap, { HeapType } from './heap.js';

const leftHeap = new MaxHeap();
const rightHeap = new MinHeap();
// const leftHeap = new Heap(HeapType.maxHeap, 'leftHeap, maxHeap', false);
// const rightHeap = new Heap(HeapType.minHeap, 'rightHeap, minHeap', false);

function getMedian(current) {
  if (leftHeap.size === 0) {
    leftHeap.push(current);
  } else if (leftHeap.peek() < current) {
    rightHeap.push(current);
    if (leftHeap.size < rightHeap.size) {
      leftHeap.push(rightHeap.pop());
    }
  } else {
    leftHeap.push(current);
    if (leftHeap.size > rightHeap.size + 1) {
      rightHeap.push(leftHeap.pop());
    }
  }

  return leftHeap.peek();
}

try {
  const content = fs.readFileSync('Assignment3_input.txt', 'utf8');
  const values = content?.split('\n').map((str) => Number(str.trim()));
  console.log(values.length, values[0]);

  let sum = 0;

  for (let i = 0; i < values.length; i++) {
    const current = values[i];
    let median = getMedian(current);
    console.log(i, median);
    sum = sum + median;
    sum %= 10000;
  }
  console.log('sum', sum % 10000);
} finally {
}
