var fs = require('node:fs');

function getShortestPaths(sourceIdx, graph) {
  const paths = [];
  paths[sourceIdx] = 0;
  graph[sourceIdx].computed = true;
  const computed = [];

  while (computed.length < graph.length) {
    const candidateShortestPaths = graph.map((vertix) => {
      let min = 1000000;
      if (!vertix.computed) {
        for (let j = 0; j < vertix.adjs.length; j++) {
          const idx = vertix.adjs[j].index;
          if (graph[idx].computed) {
            const pathLength = paths[idx] + vertix.adjs[j].length;
            if (min > pathLength) {
              min = pathLength;
            }
          }
        }
      }
      return min;
    });
    let min = 1000000,
      idx = -1;

    for (let i = 0; i < candidateShortestPaths.length; i++) {
      if (min >= candidateShortestPaths[i]) {
        min = candidateShortestPaths[i];
        idx = i;
      }
    }
    paths[idx] = min;
    graph[idx].computed = true;
    computed.push(idx);
  }

  return paths;
}

try {
  const content = fs.readFileSync('Assignment2_input.txt', 'utf8');
  const vertices = content?.split('\n').map((str) => {
    const v2 = str.trim().split('\t');
    return {
      adjs: v2.slice(1).map((pair) => {
        const v3 = pair.trim().split(',');
        return { index: Number(v3[0]) - 1, length: Number(v3[1]) };
      }),
    };
  });
  console.log(vertices.length, vertices[0]);

  const shortestPaths = getShortestPaths(0, vertices);
  console.log('shortestPaths', shortestPaths);
  const ids = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
  console.log(ids.map((item) => shortestPaths[item - 1]).join(','));
} finally {
}
