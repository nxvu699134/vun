import { Node, Element } from "domhandler";

abstract class Visitor {
  private root: Node;

  constructor(root: Node) {
    this.root = root;
  }

  walk(node: Node | null = null) {
    if (node === null) {
      node = this.root;
    }

    if (this.open(node)) {
      (<Element>node).children.forEach((child) => {
        this.walk(child);
      });
    }
    this.close(node);
  }

  abstract open(node: Node): boolean;

  abstract close(node: Node): void;
}

export default Visitor;
