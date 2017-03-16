import * as Assert from "assert";
import { RateLimitQueue } from "./RateLimitQueue";

function one(): Promise<string[]> {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(["1", "2", "3"]), 10);
    });
}

function two(name: string): Promise<string> {
    return Promise.resolve("Hello " + name);
}

function getRand(): number {
    return Math.random() * 100;
}

describe("LimitingQueue", () => {

    it("Should limit correctly without capping", async () => {
        const queue = new RateLimitQueue(2, 1000);

        await queue.limit(function () { return one() });
        Assert.equal(queue.getItemCount(), 0);
        await queue.limit(function () { return two("Max Mustermann") });
        Assert.equal(queue.getItemCount(), 0);
    }); 

    it("Should cap one call", async () => {
        const queue = new RateLimitQueue(2, 100);

        await queue.limit(function () { return one() });
        Assert.equal(queue.getItemCount(), 0);

        await queue.limit(function () { return two("Max Mustermann") });
        queue.limit(function () { return one() }); 
        Assert.equal(queue.getItemCount(), 1);

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                Assert.equal(queue.getItemCount(), 0); resolve();
            }, 101);
        });
    });

    it("Should work with non-promise returning function", async () => {
        const queue = new RateLimitQueue(2, 1000);

        await queue.limit(function () { return getRand() });
        Assert.equal(queue.getItemCount(), 0);

        queue.limit(function () { return getRand() });
        Assert.equal(queue.getItemCount(), 0);
    });
});