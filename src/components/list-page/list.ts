export class Node<T> {
  value: T;
  previous: Node<T> | null;
  next: Node<T> | null;
  constructor(value: T, previous?: Node<T> | null, next?: Node<T> | null) {
    this.value = value;
    this.previous = previous === undefined ? null : previous;
    this.next = next === undefined ? null : next;
  }
}

interface IList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getElementByIndex: (index: number) => T | null;
  getSize: () => number;
  toArray: () => T[];
}

export class List<T> implements IList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(elements?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (elements) {
      for (let element of elements) {
        this.append(element);
      }
    }
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head) {
      this.head.previous = node;
    }
    node.next = this.head;
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size += 1;
  }

  append(element: T) {
    const node = new Node(element);

    if (this.tail) {
      this.tail.next = node;
    }
    node.previous = this.tail;
    this.tail = node;

    if (!this.head) {
      this.head = node;
    }

    this.size += 1;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size -= 1;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    if (this.tail.previous) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.size -= 1;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      if (index === 0) {
        this.prepend(element);
        return;
      }

      if (index === this.size) {
        this.append(element);
        return;
      }

      let previousNode = this.head as Node<T>;
      for (let i = 0; i < index - 1; i++) {
        previousNode = previousNode.next as Node<T>;
      }

      const node = new Node(element);
      const nextNode = previousNode.next as Node<T>;
      node.next = nextNode;
      previousNode.next = node;
      node.previous = previousNode;
      nextNode.previous = node;

      this.size += 1;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log(`Invalid index. Current length is ${this.size}.`);
      return;
    } else {
      if (index === 0) {
        this.deleteHead();
        return;
      }
      if (index === this.size - 1) {
        this.deleteTail();
        return;
      }
    }

    let previousNode = this.head as Node<T>;
    for (let i = 0; i < index - 1; i++) {
      previousNode = previousNode.next as Node<T>;
    }
    const deletingNode = previousNode.next as Node<T>;
    const nextNode = deletingNode.next as Node<T>;
    previousNode.next = nextNode;
    nextNode.previous = previousNode;

    this.size -= 1;
  }

  getElementByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log(`Invalid index. Current length is ${this.size}.`);
      return null;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current?.next || null;
      }

      return current?.value || null;
    }
  }

  toArray() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  getSize() {
    return this.size;
  }
}
