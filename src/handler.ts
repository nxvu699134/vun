import Expander from "./expander";
import { Element } from "domhandler";

export interface IHandler {
  open: (expander: Expander, node: Element) => boolean;
  close: (expander: Expander, node: Element) => void;
}

class VarHandler implements IHandler {
  open(expander: Expander, node: Element) {
    expander.showTag(node, false);
    expander.output(expander.env.find(node.attribs["v-var"])?.value);
    return true;
  }

  close(expander: Expander, node: Element) {
    expander.showTag(node, true);
  }
}

class IfHandler implements IHandler {
  open(expander: Expander, node: Element) {
    const shouldExpand = !!expander.env.find(node.attribs["v-if"]);
    if (shouldExpand) {
      expander.showTag(node, false);
    }
    return shouldExpand;
  }

  close(expander: Expander, node: Element) {
    const didExpand = !!expander.env.find(node.attribs["v-if"]);
    if (didExpand) {
      expander.showTag(node, true);
    }
  }
}

export const HANDLERS: Record<string, IHandler> = {
  "v-var": new VarHandler(),
  "v-if": new IfHandler(),
};
