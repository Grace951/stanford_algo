import * as fs from 'node:fs/promises';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function unique(array) {
  return array.filter((v, i) => array.indexOf(v) === i);
}

function getRootVertix(vertices, idx) {
  let pointer = idx;

  while (
    isMergedVertix(vertices, pointer) &&
    vertices[pointer - 1].root !== 0
  ) {
    pointer = vertices[pointer - 1].root;
  }

  return pointer;
}

function joinTwoVertices(vertices, start, end) {
  // console.log('joinTwoVertices==================', start, end);
  // console.log('end.root', end.root);

  const prevEndRoot = end.root === 0 ? end.idx : end.root;
  const indices = [
    start.idx,
    start.children,
    vertices[prevEndRoot - 1].idx,
    vertices[prevEndRoot - 1].children,
  ].flat();
  start.adjacents = start.adjacents.filter((value) => !indices.includes(value));
  start.children = [...start.children, end.idx];

  end.merged = true;
  end.root = getRootVertix(vertices, start.idx);
  end.adjacents = end.adjacents.filter((value) => !indices.includes(value));

  // console.log('joinTwoVertices 2: ', indices, start, end);
}

function getReaminVertices(vertices) {
  return vertices.filter((v) => !v.merged);
}

function isMergedVertix(vertices, idx) {
  return vertices[idx - 1].merged;
}

function getVertixFromRandomIndex(vertices, idx) {
  return vertices.filter((v, i) => !isMergedVertix(vertices, i + 1))[idx];
}

function getAllAdjacents(vertices, idx) {
  const start = vertices[idx - 1];
  return [
    ...start.adjacents.map((v) => getRootVertix(vertices, v)),
    ...start.children.map((v) => getAllAdjacents(vertices, v)).flat(),
  ];
}
function edgeContraction(vertices) {
  const remain = getReaminVertices(vertices).length;
  const randomIdx = getRandomInt(remain);
  const start = getVertixFromRandomIndex(vertices, randomIdx);
  const edgeArray = unique(getAllAdjacents(vertices, start.idx)).filter(
    (v) => v !== start.idx
  );
  const pointer = getRandomInt(edgeArray.length);
  const end = vertices[edgeArray[pointer] - 1];
  joinTwoVertices(vertices, start, end);
}

function minCut(vertices) {
  const toContractVertices = vertices.slice();
  let remain = toContractVertices;
  while (remain.length > 2) {
    // console.log('remain', remain.length);

    edgeContraction(toContractVertices);
    remain = getReaminVertices(toContractVertices);
  }
  // console.log(remain);
  const first = remain[0];
  const minCut = getAllAdjacents(vertices, first.idx).filter(
    (v) => v !== first.idx
  );

  //17
  return minCut.length;
}

try {
  const content = await fs.readFile('Assignment4_input.txt', 'utf8');
  let min = 200;
  for (let i = 0; i < 10000; i++) {
    const vertices = content?.split('\n').map((string) => {
      const array = string
        .split('\t')
        .filter((v) => v !== '')
        .map((v) => Number(v));
      return {
        idx: array[0],
        adjacents: array.slice(1),
        merged: false,
        root: 0,
        children: [],
      };
    });
    const current = minCut(vertices);
    console.log(current);
    if (min > current) {
      min = current;
    }
  }
  console.log('-----------', min);
} finally {
}
