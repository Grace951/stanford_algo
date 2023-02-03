var fs = require('node:fs');

let NODE_COUNT = 0;

function knapsack(capacity, iuputs) {
  const A = [];

  A.push([]);
  for (let x = 0; x <= capacity; x++) {
    A[0].push(0);
  }
  for (let i = 0; i < iuputs.length; i++) {
    const idxOfI = i + 1;
    A.push([0]);
    const item = iuputs[i];
    const v = item.value;
    const w = item.weight;
    for (let x = 1; x <= capacity; x++) {
      if (x < w) {
        A[idxOfI][x] = A[idxOfI - 1][x];
      } else {
        const include = A[idxOfI - 1][x - w] + v;
        const exclude = A[idxOfI - 1][x];
        A[idxOfI][x] = Math.max(include, exclude);
      }
    }
  }
  let x = capacity,
    sum = 0;
  const items = [];
  for (let i = iuputs.length - 1; i >= 0; i--) {
    const item = iuputs[i];
    const v = item.value;
    const w = item.weight;
    const include = A[i][x - w] + v;
    const exclude = A[i][x];
    if (include > exclude) {
      x -= w;
      sum += v;
      items.push(i);
    }
  }
  return { items, sum };
}

try {
  // const content = fs.readFileSync('4.2_input.txt', 'utf8'); // FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
  const content = fs.readFileSync('4.1_input.txt', 'utf8'); // 2493893
  // const content = fs.readFileSync('4.1_test1.txt', 'utf8'); // 539
  // const content = fs.readFileSync('4.1_test2.txt', 'utf8'); // 51
  // const content = fs.readFileSync('4.1_test.txt', 'utf8'); // 202
  // const content = fs.readFileSync('4.1_test3.txt', 'utf8'); // 150
  // const content = fs.readFileSync('4.1_test4.txt', 'utf8'); // 8

  const iuputs = content
    ?.split('\n')
    .slice(1)
    .map((str) => {
      const v = str.trim().split(' ');
      return {
        value: Number(v[0].trim()),
        weight: Number(v[1].trim()),
      };
    });

  const SIZE = Number(content?.split('\n')?.[0].split(' ')[0].trim());
  console.log('SIZE', SIZE);
  const { items, sum } = knapsack(SIZE, iuputs);
  console.log(items, sum);
} finally {
}
