class Heap {
  private isMaxHeap: boolean;
  heap: number[];
  constructor(array: number[] = [], isMaxHeap: boolean = false) {
    this.isMaxHeap = isMaxHeap;
    this.heap = [];
    array.forEach((num) => this.push(num));
  }

  private swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  top(): number {
    if (this.isEmpty()) throw new Error("Heap is empty");
    return this.heap[0];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  push(num: number) {
    this.heap.push(num);
    let index = this.heap.length - 1;
    if (index === 0) return;

    let parent = Math.floor((index + 1) / 2) - 1;
    while (
      parent >= 0 &&
      (this.isMaxHeap
        ? this.heap[parent] < this.heap[index]
        : this.heap[parent] > this.heap[index])
    ) {
      this.swap(parent, index);
      index = parent;
      parent = Math.floor((parent + 1) / 2) - 1;
    }
  }

  pop(): number {
    if (this.isEmpty()) throw new Error("Heap is empty");
    const n = this.heap.length;
    const val = this.heap[0];
    this.heap[0] = this.heap[n - 1];
    this.heap.pop();

    let index = 0;
    let left = index * 2 + 1,
      right = index * 2 + 2;

    while (left < n - 1 || right < n - 1) {
      if (right >= n - 1) {
        if (
          this.isMaxHeap
            ? this.heap[left] > this.heap[index]
            : this.heap[left] < this.heap[index]
        )
          this.swap(left, index);
        break;
      }
      if (
        this.isMaxHeap
          ? this.heap[left] > this.heap[right]
          : this.heap[left] < this.heap[right]
      ) {
        this.swap(left, index);
        index = left;
      } else {
        this.swap(right, index);
        index = right;
      }
      left = index * 2 + 1;
      right = index * 2 + 2;
    }

    return val;
  }
}

const minHeap = new Heap([6, 7, 1, 1, 3, 4, 2, 5, 2]);
const maxHeap = new Heap([6, 7, 1, 1, 3, 4, 2, 5, 2], true);
