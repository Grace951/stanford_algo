const HeapType = {
  minHeap: 'minHeap',
  maxHeap: 'maxHeap',
};

class Heap {
  name = '';
  values = [];
  constructor(compareFun = (a, b) => a - b, name) {
    this.name = name;
    this.compareFun = compareFun;
  }
  pop() {
    let idx = this.values.length - 1;
    const value = this.values[0];
    this.values[0] = this.values[idx];
    this.values.pop();
    this.postHeapPop();
    return value;
  }
  peek() {
    return this.values[0];
  }
  print() {
    console.log(this.values);
  }
  push(value) {
    let idx = this.values.length;
    this.values[idx] = value;
    this.postHeapInsert();
  }
  size() {
    return this.values.length;
  }

  _swap(i, j) {
    let temp = this.values[i];
    this.values[i] = this.values[j];
    this.values[j] = temp;
  }

  postHeapPop() {
    let idx = 0;
    let childIdx1 = 2 * idx + 1;
    let childIdx2 = 2 * idx + 2;

    let swapIdx = childIdx1;
    if (childIdx2 < this.values.length) {
      swapIdx =
        this.compareFun(this.values[childIdx1], this.values[childIdx2]) < 0
          ? childIdx1
          : childIdx2;
    }

    // sink down
    while (
      swapIdx < this.values.length &&
      this.compareFun(this.values[swapIdx], this.values[idx]) < 0
    ) {
      this._swap(idx, swapIdx);

      idx = swapIdx;
      childIdx1 = 2 * idx + 1;
      childIdx2 = 2 * idx + 2;
      swapIdx = childIdx1;
      if (childIdx2 < this.values.length) {
        swapIdx =
          this.compareFun(this.values[childIdx1], this.values[childIdx2]) < 0
            ? childIdx1
            : childIdx2;
      }
    }
  }

  postHeapInsert() {
    if (this.values.length < 2) {
      return;
    }
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);

    // bubble up
    while (
      parentIdx >= 0 &&
      idx >= 0 &&
      this.compareFun(this.values[idx], this.values[parentIdx]) < 0
    ) {
      this._swap(parentIdx, idx);
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
}

module.exports.Heap = Heap;
module.exports.HeapType = HeapType;
