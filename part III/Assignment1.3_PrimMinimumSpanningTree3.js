var fs = require('node:fs');

let NODE_COUNT = 0;
let EDGE_COUNT = 0;

function primMinimumSpanningTree(graph) {
  let totalCost = 0;
  for (let i = 0; i < graph.length; i++) {
    graph[i].spanned = false;
  }
  graph[0].spanned = true;
  let leftCnt = graph.length - 1;
  while (leftCnt) {
    let min = Infinity,
      idx = -1;
    for (let i = 1; i < graph.length; i++) {
      if (graph[i].spanned) {
        continue;
      }
      const edges = graph[i].edges;
      let minLocal = Infinity;
      for (let j = 0; j < edges.length; j++) {
        const v = graph[edges[j].vertixIdx];
        if (v.spanned && minLocal > edges[j].cost) {
          minLocal = edges[j].cost;
        }
      }
      if (min > minLocal) {
        min = minLocal;
        idx = i;
      }
    }
    graph[idx].spanned = true;
    totalCost += min;
    leftCnt--;
  }
  return totalCost;
}

try {
  // const content = fs.readFileSync('1.3_test3.txt', 'utf8'); //14
  // const content = fs.readFileSync('1.3_test2.txt', 'utf8'); //7
  const content = fs.readFileSync('1.3_input.txt', 'utf8'); // -3612829
  // const content = fs.readFileSync('1.3_test.txt', 'utf8'); //3
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

  const counts = content?.split('\n')?.[0].split(' ');
  NODE_COUNT = Number(counts[0]);
  EDGE_COUNT = Number(counts[1]);

  const cost = primMinimumSpanningTree(graph);
  console.log('cost', cost);
} finally {
}
