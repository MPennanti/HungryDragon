import * as chai from "chai";
import { format } from "./string";

const expect = chai.expect;

describe("util.string", () => {
    describe("format", () => {
        it("replaces placeholders with values", () => {
            const result = format("{0}:{1}", 42, "baz");
            expect(result).to.equal("42:baz");
        });

        it("handles missing placeholders", () => {
            const result = format("{0}:{1}", 42);
            expect(result).to.equal("42:");
        });
    });
});
