class Union {
  clusters = {};
  nodes = [];
  clusterCount = 0;
  constructor(nodes) {
    this.nodes = nodes;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].leader = i;
      this.clusters[i] = { count: 1 };
    }
    this.clusterCount = nodes.length;
  }

  find(idx) {
    let leader = this.nodes[idx].leader;
    while (this.nodes[leader].leader !== leader) {
      leader = this.nodes[leader].leader;
    }
    return leader;
  }

  isInTheSameUnion(idx1, idx2) {
    let leader1 = this.find(idx1);
    let leader2 = this.find(idx2);
    return leader1 === leader2;
  }

  getClusterCount() {
    return this.clusterCount;
  }
  printCluster() {
    console.log(this.clusters);
  }
  merge(idx1, idx2) {
    let leader1 = this.find(idx1);
    let leader2 = this.find(idx2);
    if (leader1 === leader2) {
      return;
    }

    if (this.clusters[leader1].count < this.clusters[leader2].count) {
      // point this.clusters[leader1]'s leader to this.clusters[leader2]
      this.nodes[leader1].leader = leader2;
      this.clusters[leader2].count += this.clusters[leader1].count;
      this.clusters[leader1] = undefined;
    } else {
      this.nodes[leader2].leader = leader1;
      this.clusters[leader1].count += this.clusters[leader2].count;
      this.clusters[leader2] = undefined;
    }
    this.clusterCount--;
  }
}

module.exports.Union = Union;
