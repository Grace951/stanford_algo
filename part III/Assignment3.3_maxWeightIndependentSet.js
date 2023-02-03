var fs = require('node:fs');

let NODE_COUNT = 0;
const WIS = [];
function mwis(nodes) {
  WIS[0] = 0;
  WIS[1] = nodes[1].value;
  for (let i = 2; i < nodes.length; i++) {
    const w = WIS[i - 2] + nodes[i].value;
    const wo = WIS[i - 1];
    WIS[i] = w > wo ? w : wo;
  }

  let i = nodes.length - 1;
  while (i > 0) {
    const include = WIS[i - 1] < (i - 2 < 0 ? 0 : WIS[i - 2]) + nodes[i].value;
    nodes[i].inIS = include;
    if (i < 10) console.log(i, include);
    i -= include ? 2 : 1;
  }

  return WIS[nodes.length - 1];
}

try {
  const content = fs.readFileSync('3.3_input.txt', 'utf8'); // 10100110 2955353732
  // const content = fs.readFileSync('3.3_test.txt', 'utf8');
  // const content = fs.readFileSync('3.3_test2.txt', 'utf8');
  // Max sum: 2616
  // Chosen points (position): [2, 4, 6, 8, 10]

  const nodes = content
    ?.split('\n')
    .slice(1)
    .map((str, id) => {
      const value = Number(str.trim());
      return { value, inIS: false };
    });

  nodes.unshift({ value: 0, inIS: false });
  const NODE_COUNT = Number(content?.split('\n')?.[0].trim());

  const weight = mwis(nodes);
  const ids = [1, 2, 3, 4, 17, 117, 517, 997];
  // const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(ids.map((id) => (nodes[id].inIS ? '1' : '0')).join(''), weight);
} finally {
}
