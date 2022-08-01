interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  peak: () => T | null;
  isEmpty: () => void;
  toArray: () => (T | null)[];
}

interface IQueueOptions<T> {
  container: (T | null)[];
  head: number;
  tail: number;
  size: number;
  length: number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor({ size, options }: { size: number; options?: IQueueOptions<T> }) {
    if (options) {
      const { container, head, tail, size, length } = options;
      this.container = container;
      this.head = head;
      this.tail = tail;
      this.size = size;
      this.length = length;
    } else {
      this.size = size;
      this.container = Array(size).fill(null);
    }
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.tail += 1;
    this.length += 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    this.head += 1;
    this.length -= 1;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container.length = 0;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;

  getHead = () => this.head;

  getTail = () => this.tail;

  getSize = () => this.size;

  getLength = () => this.length;

  toArray = () => [...this.container];
}
