[![Travis CI](https://img.shields.io/travis/havsar/limit-queue.svg)](https://travis-ci.org/havsar/limit-queue) 
[![David](https://img.shields.io/david/havsar/limit-queue.svg)](https://david-dm.org/havsar/limit-queue)
[![npm](https://img.shields.io/npm/v/limit-queue.svg)](https://www.npmjs.org/package/limit-queue)
[![The MIT License](https://img.shields.io/npm/l/limit-queue.svg)](http://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/limit-queue.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/limit-queue/)

# limit-queue
Limit function calls with a timeout. Useful for rate limiting against services (e.g. TMDB). Supports promises.

<!-- TOC depthTo:2 -->

- [limit-queue](#limit-queue)
- [Install](#install)
- [Usage](#usage)
- [RateLimitQueue](#ratelimitqueue)
- [Test](#test)

<!-- /TOC -->

# Install
```bash
npm install --save limit-queue
```
or
```bash
yarn add limit-queue
```

# Usage
With promises or async/await
```ts
import { RateLimitQueue } from "limit-queue";

const queue = new RateLimitQueue(1, 5000);

async function doSomething(): Promise<void> { 
    // Pool will start on first call
    await queue.limit(function () {
         return "Response One";  
    }); 

    await queue.limit(function () {
         return MyService.getUsers(); 
    }); 

    console.log("Done");
}
```

# RateLimitQueue
Use this Queue as rate limit pool. *cap* function calls are allowed within *poolMs* milliseconds.
- `cap`: Amount of function calls within *poolMs*
- `poolMs`: If the cap is reached, wait for *poolMs* milliseconds 
# Test
```bash
npm test
```