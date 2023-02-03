var fs = require('node:fs');
const { Union } = require('./union.js');

let NODE_COUNT = 0;

function kClustering(edges, nodes, k) {
  let clusterCount = nodes.length,
    idx = 0,
    maxSpacing = 0;

  const union = new Union(nodes);
  while (clusterCount >= k) {
    const edge = edges[idx];
    const nodeIdx1 = edge.node1;
    const nodeIdx2 = edge.node2;

    if (!union.isInTheSameUnion(nodeIdx1, nodeIdx2)) {
      union.merge(nodeIdx1, nodeIdx2);
      clusterCount = union.getClusterCount();
      maxSpacing = edges[idx].cost;
    }
    idx++;
  }
  return maxSpacing;
}

try {
  const content = fs.readFileSync('2.1_input.txt', 'utf8'); // 106
  // const content = fs.readFileSync('2.1_test.txt', 'utf8');
  // For K = 2 -> 8
  // For K = 3 -> 4
  // For K = 4 -> 1

  // const content = fs.readFileSync('2.1_test2.txt', 'utf8');
  // K = 3 : Ans = 3
  // K = 2 : Ans = 5

  // https://www.coursera.org/learn/algorithms-greedy/discussions/forums/N2idJHblEeag2QpBph2LIw/threads/FW9on3eUEeuMZA7-NsypQw
  // https://www.coursera.org/learn/algorithms-greedy/discussions/forums/N2idJHblEeag2QpBph2LIw/threads/Ds7RXKbkEemCnRLO1W1bOg

  const graph = [];
  const edges = content
    ?.split('\n')
    .slice(1)
    .map((str) => {
      const v = str.trim().split(' ');
      const node1 = Number(v[0]) - 1,
        node2 = Number(v[1]) - 1,
        cost = Number(v[2]);
      if (!graph[node1]) {
        graph[node1] = { edges: [], idx: node1 };
      }
      if (!graph[node2]) {
        graph[node2] = { edges: [], idx: node2 };
      }
      graph[node1].edges.push({ cost, vertixIdx: node2 });
      graph[node2].edges.push({ cost, vertixIdx: node1 });

      return { node1, node2, cost };
    });

  const NODE_COUNT = Number(content?.split('\n')?.[0].trim());

  edges.sort((a, b) => a.cost - b.cost);
  console.log('edges', edges[0], edges[1]);

  const maxSpacing = kClustering(edges, graph, 2);
  console.log('maxSpacing', maxSpacing);
} finally {
}
