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

export const HANDLERS = {
  "v-var": new VarHandler(),
} as Record<string, IHandler>;
