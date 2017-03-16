[![TRAVIS](https://travis-ci.org/havsar/queue-limit.svg?branch=master)](https://travis-ci.org/havsar/queue-limit)

[![NPM](https://nodei.co/npm/queue-limit.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/queue-limit/)

# queue-limit
Limit function calls with a timeout. Useful for rate limiting against services (e.g. TMDB). Supports promises.

<!-- TOC depthTo:2 -->

- [queue-limit](#queue-limit)
- [Install](#install)
- [Usage](#usage)
- [RateLimitQueue](#ratelimitqueue)
- [Test](#test)

<!-- /TOC -->

# Install
```bash
npm install --save node-ts-cache
```
or
```bash
yarn add queue-limit
```

# Usage
With promises or async/await
```ts
import { RateLimitQueue } from "limit-queue";

const queue = new RateLimitQueue(2, 5000);

async function doSomething(): Promise<void> { 
    // poolMs will start on first Call
    await queue.limit(function () => {
         return "Response One";  
    }); 

    await queue.limit(function () => {
         return MyService.getUsers(); 
    }); //Stopped here for 5000 ms

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