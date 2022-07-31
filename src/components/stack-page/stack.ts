interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  toArray: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[];

  constructor(container?: T[]) {
    this.container = container || [];
  }

  toArray = () => [...this.container];

  pop = (): void => {
    this.container.pop();
  };

  push = (item: T): void => {
    this.container.push(item);
  };

  peak = (): T | null => {
    return this.container[this.container.length - 1];
  };

  getSize = () => this.container.length;
}
