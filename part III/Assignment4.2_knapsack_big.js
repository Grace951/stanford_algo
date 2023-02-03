var fs = require('node:fs');

let NODE_COUNT = 0;
const A = [[]];
function knapsackSunProblem(inputs, idx, capacity) {
  // console.log('knapsackSunProblem', idx, capacity);
  if (
    typeof A[idx] !== 'undefined' &&
    Array.isArray(A[idx]) &&
    typeof A[idx][capacity] !== 'undefined'
  ) {
    // console.log('value', A[idx][capacity]);
    return A[idx][capacity];
  }

  const item = inputs[idx];
  const v = item.value;
  const w = item.weight;
  if (typeof A[idx] === 'undefined' || !Array.isArray(A[idx])) {
    A[idx] = [0];
  }
  if (capacity < w) {
    A[idx][capacity] = knapsackSunProblem(inputs, idx - 1, capacity);
    return A[idx][capacity];
  }
  const include = knapsackSunProblem(inputs, idx - 1, capacity - w) + v;
  const exclude = knapsackSunProblem(inputs, idx - 1, capacity);
  A[idx][capacity] = Math.max(include, exclude);
  // console.log('compare=============', A[idx][capacity], include, exclude);

  return A[idx][capacity];
}
function knapsack(capacity, inputs) {
  let x = capacity,
    sum = 0;
  const items = [];
  for (let i = inputs.length - 1; i > 0; i--) {
    const item = inputs[i];
    const v = item.value;
    const w = item.weight;
    const include =
      x - w < 0 ? 0 : knapsackSunProblem(inputs, i - 1, x - w) + v;
    const exclude = knapsackSunProblem(inputs, i - 1, x);
    // console.log('knapsack, i ---------------------------------------', i);
    if (include > exclude) {
      x -= w;
      sum += v;
      items.push(i);
    }
  }
  return { items, sum };
}

try {
  const content = fs.readFileSync('4.2_input.txt', 'utf8'); // 4243395
  // const content = fs.readFileSync('4.1_input.txt', 'utf8'); // 2493893
  // const content = fs.readFileSync('4.1_test4.txt', 'utf8'); // 8
  // const content = fs.readFileSync('4.1_test2.txt', 'utf8'); // 51
  // const content = fs.readFileSync('4.1_test.txt', 'utf8'); // 202
  // const content = fs.readFileSync('4.1_test1.txt', 'utf8'); // 539

  const inputs = content
    ?.split('\n')
    .slice(1)
    .map((str) => {
      const v = str.trim().split(' ');
      return {
        value: Number(v[0].trim()),
        weight: Number(v[1].trim()),
      };
    });

  inputs.unshift({
    value: 0,
    weight: 0,
  });
  const SIZE = Number(content?.split('\n')?.[0].split(' ')[0].trim());
  console.log('SIZE', SIZE);

  for (let x = 0; x <= SIZE; x++) {
    A[0].push(0);
  }
  const { items, sum } = knapsack(SIZE, inputs);
  console.log(sum);
} finally {
}
