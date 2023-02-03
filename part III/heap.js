const HeapType = {
  minHeap: 'minHeap',
  maxHeap: 'maxHeap',
};

class Heap {
  name = '';
  values = [];
  dict = {};
  constructor(
    compareFun = (a, b) => a - b,
    getIdxFun = (item) => item.id,
    name
  ) {
    this.name = name;
    this.compareFun = compareFun;
    this.getIdxFun = getIdxFun;
  }

  pop() {
    if (!this.values.length) {
      return;
    }
    const value = this.values[0];
    if (this.values.length > 1) {
      this._swap(0, this.values.length - 1);
    }

    this.dict[this.getIdxFun(this.values[this.values.length - 1])] = undefined;
    this.values.pop();
    if (this.values.length > 1) {
      this._sinkDown(0);
    }
    return value;
  }

  peek() {
    return this.values[0];
  }

  delete(idx) {
    let arrayIdx = this.dict[idx];
    if (arrayIdx === undefined) {
      return;
    } else if (arrayIdx === this.values.length - 1) {
      this.dict[this.getIdxFun(this.values[this.values.length - 1])] =
        undefined;
      this.values.pop();
      return;
    }

    this._swap(this.values.length - 1, arrayIdx);
    this.dict[this.getIdxFun(this.values[this.values.length - 1])] = undefined;
    this.values.pop();
    this._heapify(arrayIdx);
  }

  print() {
    console.log(this.values);
  }

  push(value) {
    if (this.dict[this.getIdxFun(value)]) {
      return;
    }
    let idx = this.values.length;
    this._set(idx, value);
    if (this.values.length < 2) {
      return;
    }
    this._bubbleUp(this.values.length - 1);
  }

  size() {
    return this.values.length;
  }

  _heapify(idx) {
    let parentIdx = Math.floor((idx - 1) / 2);
    let swapIdx = this._getChildSwapIdx(idx);

    if (
      parentIdx > 0 &&
      this.compareFun(this.values[parentIdx], this.values[idx]) > 0
    ) {
      this._bubbleUp(idx);
    } else if (
      swapIdx !== -1 &&
      swapIdx < this.values.length &&
      this.compareFun(this.values[swapIdx], this.values[idx]) < 0
    ) {
      this._sinkDown(idx);
    }
  }

  _bubbleUp(idx) {
    if (idx <= 0 || idx > this.values.length - 1) {
      return;
    }
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

  _sinkDown(idx) {
    let swapIdx = this._getChildSwapIdx(idx);

    if (swapIdx === -1) {
      return;
    }

    // sink down
    while (
      swapIdx < this.values.length &&
      swapIdx !== -1 &&
      idx >= 0 &&
      this.compareFun(this.values[swapIdx], this.values[idx]) < 0
    ) {
      this._swap(idx, swapIdx);

      idx = swapIdx;
      swapIdx = this._getChildSwapIdx(idx);
    }
  }

  _getChildSwapIdx(idx) {
    let childIdx1 = 2 * idx + 1;
    let childIdx2 = 2 * idx + 2;
    if (childIdx1 >= this.values.length) {
      return -1;
    }
    let swapIdx = childIdx1;
    if (childIdx2 < this.values.length) {
      swapIdx =
        this.compareFun(this.values[childIdx1], this.values[childIdx2]) < 0
          ? childIdx1
          : childIdx2;
    }
    return swapIdx;
  }

  _swap(i, j) {
    let temp = this.values[i];
    this._set(i, this.values[j]);
    this._set(j, temp);
  }

  _set(id, v) {
    this.values[id] = v;
    this.dict[this.getIdxFun(v)] = id;
  }
}

module.exports.Heap = Heap;
module.exports.HeapType = HeapType;
