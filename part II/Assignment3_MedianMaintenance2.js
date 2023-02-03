var fs = require('node:fs');
const { Heap, HeapType } = require('./heap2.js');

const leftHeap = new Heap(HeapType.maxHeap, 'leftHeap, maxHeap', false);
const rightHeap = new Heap(HeapType.minHeap, 'rightHeap, minHeap', false);

function sortSmallArray(sorted) {
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i; j < sorted.length; j++) {
      if (sorted[i] > sorted[j]) {
        let temp = sorted[i];
        sorted[i] = sorted[j];
        sorted[j] = temp;
      }
    }
  }
}
function getMedian(prevMedian, current) {
  let mediam = prevMedian;
  const leftSize = leftHeap.size();
  const rightSize = rightHeap.size();
  if (leftSize === rightSize) {
    if (leftSize === 0) {
      mediam = current < prevMedian ? current : prevMedian;
      rightHeap.push(current >= prevMedian ? current : prevMedian);
    } else {
      const right = rightHeap.pop();
      const left = leftHeap.pop();
      const sorted = [left, mediam, current, right];
      sortSmallArray(sorted);
      leftHeap.push(sorted[0]);
      rightHeap.push(sorted[sorted.length - 2]);
      rightHeap.push(sorted[sorted.length - 1]);
      mediam = sorted[Math.floor((sorted.length - 1) / 2)];
    }
  } else if (leftSize < rightSize) {
    const right = rightHeap.pop();
    const sorted = [current, mediam];
    if (right) {
      sorted.push(right);
    }
    sortSmallArray(sorted);
    right && rightHeap.push(sorted[sorted.length - 1]);
    leftHeap.push(sorted[0]);
    mediam = sorted[Math.floor((sorted.length - 1) / 2)];
  } else if (leftSize > rightSize) {
    const left = leftHeap.pop();
    const sorted = [mediam, current];
    if (left) {
      sorted.push(left);
    }
    sortSmallArray(sorted);
    left && leftHeap.push(sorted[0]);
    rightHeap.push(sorted[sorted.length - 1]);
    mediam = sorted[Math.floor((sorted.length - 1) / 2)];
  }

  return mediam;
}

try {
  const content = fs.readFileSync('Assignment3_input.txt', 'utf8');
  const values = content?.split('\n').map((str) => Number(str.trim()));
  console.log(values.length, values[0]);

  let sum = 0;

  const medianArray = [];
  for (let i = 0; i < 5000; i++) {
    const current = values[i];

    if (i == 0) {
      medianArray.push(current);
      sum = sum + medianArray[i];
      continue;
    }
    const prevMedian = medianArray[i - 1];

    medianArray[i] = getMedian(prevMedian, current);
    console.log(i, medianArray[i]);
    sum = sum + medianArray[i];
  }
  console.log('sum', sum % 10000);
  //sum 1213
} finally {
}
