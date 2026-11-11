import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Workshops } from "../components/Workshops";

const item = { _id: "one", title: "Sample workshop", role: "Guest lecturer", description: "Sample description" };
const render = (items: typeof item[]) => renderToStaticMarkup(<Workshops items={items} title="Workshops" intro="Teaching" />);
assert.equal(render([]), "");
assert.equal((render([item]).match(/<h3>Sample workshop<\/h3>/g) || []).length, 1);
assert.equal((render([item, { ...item, _id: "two" }]).match(/<h3>Sample workshop<\/h3>/g) || []).length, 2);
console.log("Workshop rendering checks passed.");
