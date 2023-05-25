import { readFileSync } from "fs";
import { parseDocument } from "htmlparser2";
import path from "path";
import Expander from "./expander";
import { Frame } from "./env";
import { Element } from "domhandler";

const main = () => {
  const vars = new Frame({
    testVar: "This is value of testVar",
    show: true,
    dontShow: false,
    names: ["This is", "freaking", "awesome"],
  });

  const text = readFileSync(path.resolve() + "/index.vu", "utf8");
  const doc = parseDocument(text).firstChild;

  const expander = new Expander(<Element>doc, vars);
  expander.walk();
  console.log(expander.getResult());
};

main();
