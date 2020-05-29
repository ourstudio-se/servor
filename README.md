# Servør

> A dev server for modern web application development

A very compact but capable static file server with gzip and other useful features to support modern web app development on localhost and over a local network..

Servør can be invoked via the command line or programmatically using the node API.



Most features are disabled by default but you can customize behaviour by passing positional arguments and flags to enable features.

<hr>

## Features

- 🗂 Serves static content like scripts, styles, images from a given directory
- 🗜 Uses gzip on common filetypes like html, css, js and json
- 🖥 Redirects all path requests to a single file for frontend routing
- 📦 Accepts both HTML and JavaScript files as the root file for a directory

## CLI Usage

Run as a terminal command without adding it as a dependency using `npx`:

```s
npx servor <root> <port>
```

- `<root>` path to serve static files from (defaults to current directory `.`)
- `<port>` what port you want to serve the files from (defaults to `8080`)

Example usage with npm scripts in a `package.json` file after running `npm i servor -D`:

```json
{
  "devDependencies": {
    "servor": "4.0.0"
  },
  "scripts": {
    "start": "servor . 8080"
  }
}
```

## API Usage

Use servor programmatically with node by requiring it as a module in your script:

```js
const servor = require('servor');
const instance = await servor({
  root: '.',
  inject: ''
  port: 8080,
});
```

The `servor` function accepts a config object with optional props assigned the above default values if none are provided. Calling the `servor` function starts up a new server and returns an object describing its configuration.

```js
const { url, root, protocol, port, ips } = await servor(config);
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

## Notes

Thanks to all the contributors to this projects so far. If you find a bug please create an issue or if you have an idea for a new feature then fork the project and create a pull request. Let me know how you are using servør [on twitter](https://twitter.com/lukejacksonn).
