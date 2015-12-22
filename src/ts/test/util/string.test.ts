import { format } from "../../util/string";
import * as chai from "chai";

const expect = chai.expect;

describe("util.string", () => {
    describe("format", () => {
        it("replaces placeholders with values", () => {
            let result = format("{0}:{1}", 42, "baz");
            expect(result).to.equal("42:baz");
        });

        it("handles missing placeholders", () => {
            let result = format("{0}:{1}", 42);
            expect(result).to.equal("42:");
        });
    });
});
