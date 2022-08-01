interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  getSize: () => number;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[];

  constructor(container?: T[]) {
    this.container = container || [];
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = () => {
    this.container.length = 0;
  };

  peak = (): T | null => {
    return this.container[this.container.length - 1];
  };

  toArray = () => [...this.container];

  getSize = () => this.container.length;
}
