Simple SSR with Serverless and Handlebars
=

This is a simple project/boilerplate that put Serverless and Handlebars together in order to do simple Server Side Rendering.

It's probably the perfect fit if you just need a bit of SSR for powering a react application or other kind-of-static content but still need a pre-fetch databse or stuff like that.

Routes are handled server side and not client side.

# Getting started (TL;DR)

- `nvm use` (if you use nvm, or make sure you're on node 6.10.x)
- `npm i`
- `npm start`
- Open `http://localhost:3000/status` and `http://localhost:3000`

---

# Requirements

- Node 6.10.x, see [.nvmrc](./.nvmrc)
- Need AWS account if you want to test it against AWS

# Limitations

- Only works with AWS provider (due to the plugin `serverless-offline` which only works for AWS), 
but other provider could be added if you remove that particular dependency. (And optionally remove the AWS-specific env variables used)
- Aimed at small projects, especially SPA, etc.
- Could potentially host many pages for a bigger app since there is a built-in partials and helpers


# Features

- Development environment (much faster than testing against AWS) using `serverless-offline`
- Renders HTML based on `hbs` (Handlebars) templates
- Ability to use partials/helpers and alike
- Error handling (server side) using [stacktrace-js](https://www.stacktracejs.com/#!/docs/stacktrace-js)
- Built-in helper and example to send JSON from server to client and use it with JavaScript
- `hbs` files are packaged by webpack and usable through `const template = import './path/to/template''`
- `hbs` templates automatically come with partials/helpers attached
- Simple partial/helper example
- Source maps support (basically shows the right line when errors arise, even though it's webpacked) _Beware: multiple webpack rebuilds mess it up, line number gets wrong, but works fine if you restart serverless, and works fine in production_
- Additional helpers to programmatically figure out if code is running on AWS or not
- Babel transpilation to node 6.10
- A `status` page with interesting information for debug
- _No test (oops)_

# External documentation

- Handlebars: https://github.com/pcardune/handlebars-loader (very much needed)
- Serverless Offline: https://github.com/dherault/serverless-offline

# Error handling example:

Manually added a `throw new Error('dieee')` in [./src/functions/status/status.js:7](./src/functions/status/status.js)

Browser returns I"nternal server error" (like always on AWS)

```json
{"message": "Internal server error"}
```

You need to use `sls logs -f status` to see logs for the `status` function

```
START RequestId: 22906516-1ca5-11e8-9f36-f9b1957a11c4 Version: $LATEST
2018-02-28 17:33:41.818 (+01:00)        22906516-1ca5-11e8-9f36-f9b1957a11c4    error Error: dieee
    at /var/task/src/functions/status/webpack:/src/functions/status/status.js:7:11
    at next (native)
    at step (/var/task/node_modules/babel-runtime/helpers/asyncToGenerator.js:17:30)
    at /var/task/node_modules/babel-runtime/helpers/asyncToGenerator.js:35:14
    at Promise.F (/var/task/node_modules/core-js/library/modules/_export.js:35:28)
    at /var/task/node_modules/babel-runtime/helpers/asyncToGenerator.js:14:12
    at handler (/var/task/src/functions/status/status.js:130:17)
    at invoke (/var/runtime/node_modules/awslambda/index.js:285:5)
    at InvokeManager.start (/var/runtime/node_modules/awslambda/index.js:151:9)
    at Object.awslambda.waitForInvoke (/var/runtime/node_modules/awslambda/index.js:479:52)
2018-02-28 17:33:41.819 (+01:00)        22906516-1ca5-11e8-9f36-f9b1957a11c4    stackTrace { columnNumber: 11,
  lineNumber: 7,
  fileName: '/var/task/src/functions/status/webpack:/src/functions/status/status.js',
  source: '    at /var/task/src/functions/status/webpack:/src/functions/status/status.js:7:11' }
END RequestId: 22906516-1ca5-11e8-9f36-f9b1957a11c4
REPORT RequestId: 22906516-1ca5-11e8-9f36-f9b1957a11c4  Duration: 228.39 ms     Billed Duration: 300 ms         Memory Size: 256 MB     Max Memory Used: 26 MB  
```

# Status page

Renders the following (on AWS)

```json
{
  "status": "running",
  "isHostedOnAWS": true,
  "aws": {
    "region": "us-east-1",
    "root": "/var/task",
    "runtimeDir": "/var/runtime",
    "function": {
      "name": "serverless-ssr-hbs-development-status",
      "memory": "256",
      "version": "$LATEST"
    }
  },
  "env": "development",
  "time": "2018-02-28T16:28:27.801Z",
  "projectRoot": "/var/task",
  "__dirname": "src/functions/status",
  "absoluteDirname": "/var/task/src/functions/status"
}
```

Renders the following (local)

```json
{
  "status": "running",
  "isHostedOnAWS": false,
  "aws": {
    "function": {}
  },
  "env": "development",
  "time": "2018-02-28T16:45:05.753Z",
  "projectRoot": "/Users/vadorequest/dev/serverless-ssr-hbs",
  "__dirname": "src/functions/status",
  "absoluteDirname": "/Users/vadorequest/dev/serverless-ssr-hbs/src/functions/status"
}
```