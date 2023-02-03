const HeapType = {
  minHeap: 'minHeap',
  maxHeap: 'maxHeap',
};

class Heap {
  type = HeapType.minHeap;
  name = '';
  values = [];
  constructor(type = HeapType.minHeap, name) {
    this.type = type;
    this.name = name;
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
    let swapIdx =
      this.type === HeapType.minHeap
        ? this.values[childIdx1] < this.values[childIdx2]
          ? childIdx1
          : childIdx2
        : this.values[childIdx1] >= this.values[childIdx2]
        ? childIdx1
        : childIdx2;

    let condition =
      this.type === HeapType.minHeap
        ? this.values[swapIdx] < this.values[idx]
        : this.values[swapIdx] >= this.values[idx];

    while (condition && swapIdx < this.values.length) {
      this._swap(idx, swapIdx);

      idx = swapIdx;
      childIdx1 = 2 * idx + 1;
      childIdx2 = 2 * idx + 2;
      swapIdx =
        this.type === HeapType.minHeap
          ? this.values[childIdx1] < this.values[childIdx2]
            ? childIdx1
            : childIdx2
          : this.values[childIdx1] >= this.values[childIdx2]
          ? childIdx1
          : childIdx2;

      condition =
        this.type === HeapType.minHeap
          ? this.values[swapIdx] < this.values[idx]
          : this.values[swapIdx] >= this.values[idx];
    }
  }

  postHeapInsert() {
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);

    let condition =
      this.type === HeapType.minHeap
        ? this.values[parentIdx] > this.values[idx]
        : this.values[parentIdx] <= this.values[idx];

    while (condition && parentIdx >= 0) {
      this._swap(parentIdx, idx);
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
      condition =
        this.type === HeapType.minHeap
          ? this.values[parentIdx] > this.values[idx]
          : this.values[parentIdx] <= this.values[idx];
    }
  }
}

module.exports.Heap = Heap;
module.exports.HeapType = HeapType;
