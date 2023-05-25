import Visitor from "./visitor";
import { Env, Frame } from "./env";
import { HANDLERS, IHandler } from "./handler";
import { Node, Element, isText, isTag } from "domhandler";

export class Expander extends Visitor {
  public env: Env;
  private handlers;
  private result: string[];

  constructor(root: Node, vars: Frame) {
    super(root);
    this.env = new Env(vars);
    this.handlers = HANDLERS;
    this.result = [];
  }

  hasHandler(node: Node): boolean {
    if (!isTag(node)) {
      return false;
    }

    for (const attr in node.attribs) {
      if (attr in this.handlers) {
        return true;
      }
    }
    return false;
  }

  getHandler(node: Element): IHandler {
    const possible = Object.keys(node.attribs).filter(
      (name) => name in this.handlers
    );
    return this.handlers[possible[0]];
  }

  showTag(node: Element, closing: boolean) {
    if (closing) {
      this.output(`</${node.name}>`);
      return;
    }

    this.output(`<${node.name}`);
    for (const attr in node.attribs) {
      if (!attr.startsWith("v-")) {
        this.output(` ${attr}="${node.attribs[attr]}"`);
      }
    }
    this.output(">");
  }

  output(text: string | undefined) {
    this.result.push(text === undefined ? "UNDEF" : text);
  }

  getResult() {
    return this.result.join("");
  }

  open(node: Node): boolean {
    if (isText(node)) {
      this.output(node.data);
      return false;
    }

    // this node contain our handlers
    if (this.hasHandler(node)) {
      return this.getHandler(<Element>node).open(this, <Element>node);
    }

    // HTML Tag node
    this.showTag(<Element>node, false);
    return true;
  }

  close(node: Node): void {
    if (isText(node) || !isTag(node)) {
      return;
    }

    if (this.hasHandler(node)) {
      this.getHandler(node).close(this, node);
    }

    this.showTag(node, true);
  }
}

export default Expander;
