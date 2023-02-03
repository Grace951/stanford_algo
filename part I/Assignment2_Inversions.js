import * as fs from 'node:fs/promises';

function getInversions(array) {
  if (array.length == 1) {
    return { count: 0, array };
  } else if (array.length == 2) {
    return array[1] < array[0]
      ? { count: 1, array: [array[1], array[0]] }
      : { count: 0, array };
  }

  const half = Math.floor(array.length / 2);
  // console.log(half);

  const { array: sortedLeftArray, count: l } = getInversions(
    array.slice(0, half)
  );
  const { array: sortedRightArray, count: r } = getInversions(
    array.slice(half, array.length)
  );

  let sortedArray = [],
    idx = 0,
    i = 0,
    j = 0,
    split = 0;
  // console.log(l, r, sortedLeftArray, sortedRightArray);

  while (idx < array.length) {
    if (
      sortedLeftArray[i] <= sortedRightArray[j] ||
      typeof sortedRightArray[j] === 'undefined'
    ) {
      sortedArray[idx++] = sortedLeftArray[i++];
      split += j;
    } else {
      sortedArray[idx++] = sortedRightArray[j++];
    }
  }

  return { array: sortedArray, count: l + r + split };
}

try {
  const content = await fs.readFile('Assignment2_input.txt', 'utf8');
  // const content = await fs.readFile('Assignment2_test.txt', 'utf8'); // answer: 6
  // const content = await fs.readFile('Assignment2_test2.txt', 'utf8'); // answer: 5
  const data = content?.split('\n').map((number) => Number(number));
  const { count } = getInversions(data);
  console.log(count);
} finally {
}
