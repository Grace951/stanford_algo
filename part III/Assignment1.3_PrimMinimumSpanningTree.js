var fs = require('node:fs');
const { Heap } = require('./heap.js');

let NODE_COUNT = 0;
let EDGE_COUNT = 0;

function primMinimumSpanningTree(graph) {
  const heap = new Heap(
    (a, b) => a.cost - b.cost,
    (item) => item.idx,
    'heap, minHeap'
  ); // min heap

  for (let i = 0; i < graph.length; i++) {
    graph[i].spanned = false;
    graph[i].cost = Infinity;
    if (i !== 0) {
      heap.push(graph[i]);
    }
  }

  let totalCost = 0;
  let idx = 0;
  const current = graph[idx];
  current.spanned = true;
  current.cost = 0;
  for (let i = 0; i < current.edges.length; i++) {
    const vertixIdx = current.edges[i].vertixIdx;
    heap.delete(graph[vertixIdx].idx);
    graph[vertixIdx].cost = current.edges[i].cost;
    heap.push(graph[vertixIdx]);
  }
  graph[idx].spanned = true;
  let k = 0;
  while (heap.size() > 0) {
    const nextVertix = heap.pop();
    idx = nextVertix.idx;
    // console.log(idx, totalCost, nextVertix.cost);
    totalCost += nextVertix.cost;
    for (let i = 0; i < nextVertix.edges.length; i++) {
      const vertixIdx = nextVertix.edges[i].vertixIdx;
      const current = graph[vertixIdx];
      if (current.spanned) {
        continue;
      }
      let min = nextVertix.edges[i].cost;
      heap.delete(current.idx);
      // if (k < 5) console.log('delete', current.cost);
      for (let j = 0; j < current.edges.length; j++) {
        const edge = current.edges[j];
        if (graph[edge.vertixIdx].spanned && min > edge.cost) {
          min = edge.cost;
        }
      }
      current.cost = min;
      // if (k < 5) console.log(current.cost);
      heap.push(current);
    }
    k++;
    graph[idx].spanned = true;
  }
  console.log(graph.filter((item) => !item.spanned));
  return totalCost;
}

try {
  // const content = fs.readFileSync('1.3_test3.txt', 'utf8'); // 14
  // const content = fs.readFileSync('1.3_test2.txt', 'utf8'); // 7
  const content = fs.readFileSync('1.3_input.txt', 'utf8');
  // const content = fs.readFileSync('1.3_test.txt', 'utf8'); // 3
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
  console.log('cost', cost); //-3276, -3858474, -2926769 --> wrong
} finally {
}
