export class RateLimitQueue {

    private items: { (): any }[] = [];
    private numDone: number = 0;
    private poolPromise: Promise<void> = undefined;

    constructor(private cap: number, private poolMs: number) { }

    public limit(func: () => any): Promise<any> {
        this.items.push(func);
        return this.process();
    }

    public getItemCount(): number {
        return this.items.length;
    }

    private process(): Promise<any> {
        if (!this.poolPromise) {
            this.poolPromise = new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    this.poolPromise = undefined;
                    this.numDone = 0;
                    resolve();
                }, this.poolMs);
            });
        }
        if (this.numDone >= this.cap) {
            return this.poolPromise.then(() => this.process());
        }

        const nextItem = this.items.shift();
        this.numDone++;
        return nextItem();
    }
}