var fs = require('node:fs');
const { Union } = require('./union.js');

let BIT_COUNT = 0;

function getDistantValues(value, bitCount) {
  const bits = value.split('');
  const values = [];
  for (let i = 0; i < bitCount; i++) {
    const n = bits[i] === 1 ? 0 : 1;
    values.push(
      [...bits.slice(0, i), n, ...bits.slice(i + 1, bits.length)].join('')
    );
  }
  return values;
}

function kClustering(nodes, hash, maxSpacing) {
  let spacing = 0;

  const union = new Union(nodes);

  // for spaceing == 0
  Object.keys(hash).forEach((key) => {
    for (let i = 1; i < hash[key].members.length; i++) {
      union.merge(i - 1, i);
    }
  });

  // for spaceing > 0
  while (spacing < maxSpacing) {
    spacing++;
    for (let i = 0; i < nodes.length; i++) {
      const value = nodes[i].value;
      const distantValues = getDistantValues(value, BIT_COUNT);
      // if (i == 0) {
      //   console.log(nodes[i], getDistantValues(value, BIT_COUNT));
      // }
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
  // const content = fs.readFileSync('2.2_test.txt', 'utf8'); // Expected result = 6
  const content = fs.readFileSync('2.2_input.txt', 'utf8'); // 170579, 170581

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

  // console.log(' hash', hash);
  // console.log(' nodes', nodes);

  const clusterCount = kClustering(nodes, hash, 1);
  console.log('clusterCount', clusterCount);

  const mergedClusters = Object.values(hash).filter(
    (item) => item.spacing >= 1
  );
  // console.log(' hash', hash);
  // console.log('mergedClusters', mergedClusters, mergedClusters.length);
} finally {
}
