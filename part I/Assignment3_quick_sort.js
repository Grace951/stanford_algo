import * as fs from 'node:fs/promises';

function getMedianOfThree(array, start, end) {
  if (end - start < 2) {
    return start;
  }
  const middle = Math.floor((end + start) / 2);

  let middleIndex = start;

  if (
    (array[start] > array[middle] && array[middle] > array[end]) ||
    (array[end] > array[middle] && array[middle] > array[start])
  ) {
    middleIndex = middle;
  } else if (
    (array[start] > array[end] && array[end] > array[middle]) ||
    (array[middle] > array[end] && array[end] > array[start])
  ) {
    middleIndex = end;
  }
  // console.log(middleIndex, start, middle, end, [
  //   array[start],
  //   array[middle],
  //   array[end],
  // ]);
  return middleIndex;
}

function swap(array, x, y) {
  let t = array[x];
  array[x] = array[y];
  array[y] = t;
}

function partation(array, pivotIndex, start, end) {
  if (end - start < 2) {
    return 0;
  } else if (end - start == 2) {
    if (array[start] > array[start + 1]) {
      swap(array, start, start + 1);
    }
    return end - start - 1;
  }

  let p = array[pivotIndex];
  swap(array, start, pivotIndex);
  let i = start + (array[start + 1] > p ? 1 : 2),
    j = start + 2;

  while (j < end) {
    if (array[j] < p) {
      swap(array, i, j);
      i++;
    }
    j++;
  }
  swap(array, start, i - 1);
  // // last
  // const pivotIndexLeft = i - 2;
  // const pivotIndexRight = end - 1;

  // // first
  // const pivotIndexLeft = start;
  // const pivotIndexRight = i;

  // median-of-three
  const pivotIndexLeft = getMedianOfThree(array, start, i - 2);
  const pivotIndexRight = getMedianOfThree(array, i, end - 1);

  return (
    end -
    start -
    1 +
    partation(array, pivotIndexLeft, start, i - 1) +
    partation(array, pivotIndexRight, i, end)
  );
}

function quicksort(array) {
  let pivotIndex = getMedianOfThree(array, 0, array.length - 1); // median-of-three,138382
  // let pivotIndex = 0; // first, 162085
  // let pivotIndex = array.length - 1; //last, 164123
  const compCnt = partation(array, pivotIndex, 0, array.length);

  return compCnt;
}

try {
  const content = await fs.readFile('Assignment3_input.txt', 'utf8');
  // const content = await fs.readFile('Assignment3_test.txt', 'utf8');
  const data = content?.split('\n').map((number) => Number(number));
  const count = quicksort(data);
  console.log(count);
  // console.log(data);
} finally {
}
