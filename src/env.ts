interface Var {
  name: string;
  value: any;
}

export class Frame {
  private container: Record<string, any>;

  constructor(init: object) {
    this.container = { ...init };
  }

  add(name: string, value: any): void {
    this.container[name] = value;
  }

  remove(name: string): void {
    delete this.container[name];
  }

  has(name: string): Var | null {
    if (!this.container[name]) return null;
    return { name: name, value: this.container[name] };
  }
}

export class Env {
  private stack: Frame[];

  constructor(init: Frame) {
    this.stack = [];
    this.push(init);
  }

  push(frame: Frame) {
    this.stack.push(frame);
  }

  pop() {
    this.stack.pop();
  }

  find(name: string) {
    for (let i = 0; i < this.stack.length; i++) {
      const v = this.stack[i].has(name);
      if (v) {
        return v;
      }
    }
    return null;
  }

  toString() {
    return JSON.stringify(this.stack);
  }
}
