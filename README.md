# Prime Motors

Sample car dealership web application used by the **Securing Cloud Development** lab.

It is an [Express](https://expressjs.com/) app that renders Mustache templates and serves a
small car inventory from `data/inventory.json`. A `gulp` build packages the app into `dist/`,
which is what the `Dockerfile` is built from in the CI/CD portion of the lab.

## Run it

```bash
npm install
node app.js
```

Then open <http://localhost:3000>.

## Build it

```bash
gulp
node dist/app.js
```

The build bundles and minifies the CSS and JavaScript, rewrites the templates to point at
those bundles, and copies the server, its data, the manifests, and the `Dockerfile` into
`dist/`.

See [structure.md](structure.md) for a tour of the layout.
