var fs = require('node:fs');
var s = null,
  stack = [],
  leaders = [];

function _1st_dfs(graph, i) {
  graph[i].explored = true;
  graph[i]?.adjVertices?.forEach((v, j) => {
    if (typeof graph[v] !== 'undefined' && !graph[v]?.explored) {
      _1st_dfs(graph, v);
    }
  });

  stack.push(i);
}

function _2nd_dfs(graph, i) {
  graph[i].explored = true;

  if (!leaders[s]) {
    leaders[s] = 0;
  }
  leaders[s]++;
  graph[i].leader = s;

  graph[i]?.adjVertices?.forEach((v, j) => {
    if (typeof graph[v] !== 'undefined' && !graph[v]?.explored) {
      _2nd_dfs(graph, v);
    }
  });
}

function SCC(graph, rGraph) {
  rGraph.forEach((_, i) => {
    if (!rGraph[i]?.explored) {
      _1st_dfs(rGraph, i);
    }
  });

  let idx;
  while (stack.length) {
    idx = stack.pop();
    if (typeof graph[idx] !== 'undefined' && !graph[idx]?.explored) {
      s = idx;
      _2nd_dfs(graph, idx);
    }
  }

  console.log('leaders', leaders.sort((a, b) => b - a).slice(0, 5));
}

try {
  // node --stack-size=65500  Assignmen1_StronglyConnectedComponents.js
  const content = fs.readFileSync('Assignment1_input.txt', 'utf8');
  const COUNT = 875714;

  // const content = fs.readFileSync('Assignment1_test2.txt', 'utf8');
  // const COUNT = 11;

  // const content = fs.readFileSync('Assignment1_test.txt', 'utf8');
  // const COUNT = 9;

  const vertices = [];
  const verticesR = [];
  for (let i = 0; i < COUNT; i++) {
    vertices[i] = { explored: false, adjVertices: [] };
    verticesR[i] = { explored: false, adjVertices: [] };
  }
  content?.split('\n').forEach((edge) => {
    const values = edge
      .trim()
      .split(' ')
      .map((v) => Number(v));
    const firstVertix = values[0] - 1;
    const secondVertix = values[1] - 1;
    vertices[firstVertix].adjVertices.push(secondVertix);
    verticesR[secondVertix].adjVertices.push(firstVertix);
  });
  console.log(vertices.length, vertices[0]);

  SCC(vertices, verticesR);
} finally {
}
