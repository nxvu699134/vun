import { describe, it, expect, beforeEach } from "vitest";
import { parseDocument } from "htmlparser2";
import Expander from "@src/expander";
import { Frame } from "@src/env";
import { Element } from "domhandler";

describe("Expander", () => {
  let expander: Expander;

  beforeEach(() => {
    const template = `<html>
        <body>
          <p>
            <span v-var="testVar"></span>
            <span v-var="testVar2"></span>
          </p>
        </body>
      </html>`;
    const doc = parseDocument(template).firstChild;

    const vars = new Frame({
      testVar: "This is value of testVar",
      testVar2: "Fucking 2",
    });

    expander = new Expander(<Element>doc, vars);
  });

  it("open should call for all tags", () => {
    expander.walk();
    const expectTemplate = `<html>
        <body>
          <p>
            <span>This is value of testVar</span>
            <span>Fucking 2</span>
          </p>
        </body>
      </html>`;
    expect(expander.getResult()).toBe(expectTemplate);
  });
});
