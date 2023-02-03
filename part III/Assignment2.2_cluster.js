var fs = require('node:fs');
const { Union } = require('./union.js');

let BIT_COUNT = 0;

function getDistantValues(value, distant = 1, bitCount) {
  const bits = value
    .split('')
    .map((v) => Number(v))
    .slice(0, bitCount);
  const values = [];
  let diffComp = [];

  for (let i = 0; i < bitCount; i++) {
    diffComp.push([i]);
  }
  distant--;

  let newDiffComp = [...diffComp];
  while (distant > 0) {
    newDiffComp = [];
    for (let i = 0; i < diffComp.length; i++) {
      const diff = diffComp[i];
      for (let j = 0; j < bitCount; j++) {
        if (!diff.includes(j)) {
          newDiffComp.push([...diff, j]);
        }
      }
    }
    diffComp = [...newDiffComp];
    distant--;
  }

  for (let i = 0; i < newDiffComp.length; i++) {
    const diffBits = newDiffComp[i];
    const newBits = [...bits];
    for (let j = 0; j < diffBits.length; j++) {
      newBits[diffBits[j]] = bits[diffBits[j]] === 1 ? 0 : 1;
    }
    values.push(newBits.join(''));
  }

  return values;
}

function kClustering(nodes, hash, maxSpacing) {
  let spacing = 0;

  const union = new Union(nodes);

  // for spaceing == 0
  Object.keys(hash).forEach((key) => {
    for (let i = 1; i < hash[key].members.length; i++) {
      union.merge(hash[key].members[i - 1], hash[key].members[i]);
    }
  });

  // for spaceing > 0
  while (spacing < maxSpacing) {
    spacing++;
    for (let i = 0; i < nodes.length; i++) {
      i % 10000 === 0 && console.log(spacing, i);
      const node = nodes[i];
      if (node.leader !== i) {
        continue;
      }
      const value = node.value;
      const distantValues = getDistantValues(value, spacing, BIT_COUNT);
      for (let j = 0; j < distantValues.length; j++) {
        const toTest = distantValues[j];
        if (!hash[toTest]) {
          continue;
        }

        const idx = hash[toTest].members[0];
        if (!union.isInTheSameUnion(i, idx)) {
          union.merge(i, idx);
        }
      }
    }
  }
  // union.printCluster();
  return union.getClusterCount();
}

try {
  // const content = fs.readFileSync('2.2_test4.txt', 'utf8'); // Expected result = 2549
  // const content = fs.readFileSync('2.2_test3.txt', 'utf8'); // Expected result = 1017
  // const content = fs.readFileSync('2.2_test2.txt', 'utf8'); // Expected result = 269
  // const content = fs.readFileSync('2.2_test.txt', 'utf8'); // Expected result = 6
  const content = fs.readFileSync('2.2_input.txt', 'utf8'); // 6118

  BIT_COUNT = Number(content?.split('\n')?.[0].split(' ')[1].trim());
  const hash = {};
  const nodes = content
    ?.split('\n')
    .slice(1)
    .map((str, idx) => {
      const bits = str
        .trim()
        .split(' ')
        .map((v) => Number(v));
      const value = bits.join('');
      if (hash[value] === undefined) {
        hash[value] = { members: [idx] };
      } else {
        hash[value].members.push(idx);
      }

      return { value, leader: hash[value].members[0] };
    });

  const start = new Date().getTime();
  console.log('start', new Date(start).toISOString());
  // console.log(' nodes', nodes);

  const clusterCount = kClustering(nodes, hash, 2);
  const end = new Date().getTime();
  console.log(
    'clusterCount',
    clusterCount,
    (end - start) / 1000,
    new Date(end).toISOString()
  );
} finally {
}
