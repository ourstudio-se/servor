# Our-server

> A small dev server for modern web application development
Forked from https://github.com/lukejacksonn/servor

## Features

- 🗂 Serves static content like scripts, styles, images from a given directory
- 🗜 Uses gzip on common filetypes like html, css, js and json
- 🖥 Redirects all path requests to a single file for frontend routing

## CLI Usage

Run as a terminal command without adding it as a dependency using `npx`:

```s
npx servor <root> <port>
```

- `<root>` path to serve static files from (defaults to current directory `.`)
- `<port>` what port you want to serve the files from (defaults to `8080`)

Example usage with npm scripts in a `package.json` file after running `npm i our-http -D`:

```json
{
  "devDependencies": {
    "our-http-server": "1.0.0"
  },
  "scripts": {
    "start": "ourHttpServer . 8080"
  }
}
```

## API Usage

Use `our-http-server` programmatically with node by requiring it as a module in your script:

```js
const ourHttpServer = require('our-http-server').default;
const instance = await ourHttpServer({
  root: '.',
  inject: ''
  port: 8080,
});
```

The `ourHttpServer` function accepts a config object with optional props assigned the above default values if none are provided. Calling the `ourHttpServer` function starts up a new server and returns an object describing its configuration.

```js
const { url, root, protocol, port, ips } = await ourHttpServer(config);
```

### Inject

The `inject` property accepts a string that gets appended to the servers root document (which is `index.html`). If no `index.html` exist, the injectet property will be served. This could be used to inject config or extend the development servers behavior and capabilities to suit specific environments.

```js
const config = require('package.json');
servor({ inject: `<script>window.pkg=${config}</script>` });
```

or inject a .html file
```js
const inject = fs.readFileSync(path.join(__dirname, "sample.html"), "binary")
servor({ inject });
```

