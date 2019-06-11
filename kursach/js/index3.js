'use strict';
const getMatr = () => {
  const matr = document.getElementById('AdjacencyMatrix').value.split('\n');
  return matr
    .map(x => x.replace(/\s/g, ''))
    .map(x => x.split(',').map(num => Number(num)));
};

const getNode = () => {
  const node = Number(document.getElementById('Node').value) - 1;
  return node;
};

const options = {
  layout: {
    randomSeed: 1000
  },
  nodes: {
    color: {
      background: 'orange',
      border: '#09F8FF'
    },
    shape: 'circle',
    borderWidth: 5,
    font: {
      size: 30,
      color: 'black'
    },
    fixed: {
      x: true,
      y: true
    }
  },
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: 'arrow' }
    },
    width: 5,
    physics: false,
    smooth: false
  }
};

let xPos = [];
let yPos = [];

class Graph {
  buildGraph(x) {
    const nodes = [];
    const edges = [];

    for (let i = 0; i < x.length; i++) {
      if (xPos.length === 0 && yPos.length === 0) {
        const node = {
          id: i + 1,
          label: ' ' + (i + 1).toString()
        };
        nodes.push(node);
      } else {
        const node = {
          id: i + 1,
          label: ' ' + (i + 1).toString(),
          x: xPos[i],
          y: yPos[i]
        };
        nodes.push(node);
      }
    }

    //edges
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[i].length; j++) {
        if (x[i][j] === 1) {
          const edge = {
            from: i + 1,
            to: j + 1
          };
          edges.push(edge);
        }
      }
    }
    //Creating a network
    const container = document.getElementById('myNetwork');

    const data = {
      nodes,
      edges
    };

    const network = new vis.Network(container, data, options);
    if (xPos.length === 0 && yPos.length === 0) {
      const pos = network.getPositions();
      for (let positions in pos) {
        xPos.push(pos[positions]['x']);
        yPos.push(pos[positions]['y']);
      }
    }
  }
}

const graph = x => {
  xPos = [];
  yPos = [];

  //enabling buttons
  document.getElementById('second-button').disabled = false;
  document.getElementById('third-button').disabled = false;

  options.nodes.color.border = '#09F8FF';

  let graph = new Graph();
  graph.buildGraph(x);
};

const BFS = (x, node) => {
  const matrix2 = [];
  for (let i = 0; i < x.length; i++) {
    matrix2.push(Array(x.length).fill(0));
  }
  const visited = Array(x.length).fill(0);
  visited[node] = 1;

  const queue = [node];
  let currentNode = queue[0];

  while (queue.length !== 0) {
    for (let i = 0; i < x.length; i++) {
      if (x[currentNode][i] === 1 && visited[i] === 0) {
        visited[i] = 1;
        queue.unshift(i);
        matrix2[currentNode][i] = 1;
      }
    }
    if (queue.length === 0) {
      break;
    } else {
      queue.pop();
      currentNode = queue[queue.length - 1];
    }
  }
  options.nodes.color.border = 'green';

  const BFSgraph = new Graph();
  BFSgraph.buildGraph(matrix2);
};

const DFS = (x, node) => {
  const matrix2 = [];
  for (let i = 0; i < x.length; i++) {
    matrix2.push(Array(x.length).fill(0));
  }

  const visited = Array(x.length).fill(0);
  visited[node] = 1;

  const stack = [node];
  let currentNode = stack[0];

  while (stack.length !== 0) {
    for (let i = 0; i < x.length; i++) {
      if (x[currentNode][i] === 1 && visited[i] === 0) {
        visited[i] = 1;
        stack.push(i);
        matrix2[currentNode][i] = 1;
        break;
      }
    }
    if (stack.length === 0) {
      break;
    } else if (stack[stack.length - 1] === currentNode) {
      stack.pop();
      currentNode = stack[stack.length - 1];
    } else {
      currentNode = stack[stack.length - 1];
    }
  }
  options.nodes.color.border = 'purple';

  const DFSgraph = new Graph();
  DFSgraph.buildGraph(matrix2);
};
