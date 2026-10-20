# Project structure

```
.
├── app.js                 Express server: routes, view engine, static assets
├── Dockerfile             Container definition (node:20-alpine, EXPOSE 3000)
├── gulpfile.mjs           Build pipeline that produces dist/
├── package.json           Dependencies and the start/build scripts
├── package-lock.json      Locked dependency tree
├── data/
│   └── inventory.json     The car inventory rendered on the home page
├── public/
│   ├── css/               reset.css and main.css (bundled by the build)
│   ├── js/                main.js (bundled by the build)
│   └── images/            Hero car, brand marks, inventory thumbnails
└── views/
    ├── index.html         Home page: hero, search bar, brands, inventory table
    └── order.html         Order confirmation page
```

## The build

`gulp` produces a self-contained `dist/`:

| Task         | What it does                                                          |
| ------------ | --------------------------------------------------------------------- |
| `clean`      | Deletes the previous `dist/`                                          |
| `styles`     | Concatenates and minifies the CSS to `app.min.css`                    |
| `scripts`    | Concatenates and minifies the JavaScript to `app.min.js`              |
| `images`     | Copies the images across                                              |
| `views`      | Rewrites the templates to reference the bundled assets                |
| `server`     | Copies `app.js`, `Dockerfile`, `data/`, and the manifests into `dist/` |
| `npmInstall` | Installs dependencies inside `dist/`                                  |

Because `dist/` carries its own `package.json`, `package-lock.json`, and `node_modules`,
changing a dependency in the project root is **not** reflected in the build until you re-run
`gulp`.
