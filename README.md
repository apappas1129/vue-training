# ![](public/vite.svg) vue-e-learning

[![](https://img.shields.io/badge/made%20with-vue-4FC08D?style=for-the-badge&logo=vuedotjs)](https://vuejs.org/) [![](https://img.shields.io/badge/powered%20by-vite-B242FE?style=for-the-badge&logo=vite&logoColor=FFD42C)](https://vitejs.dev/guide/)

This project serves as an exercise for my Vue 3 Training program. **eLearning Platform** is a Content Management System (CMS) for a basic MOOC platform that allows "Instructors" to deliver learning content online to any "Student" who wish to register and subscribe to their "Course". Refer to [User Stories](#documents) and [content-diagram.drawio](docs/content-diagram.drawio) for details.


## Prerequisite

### Front-end

- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/guide/) (introductory/fundamentals)
- [SSR](https://vuejs.org/guide/scaling-up/ssr.html), [(Vite) SSR](https://vitejs.dev/guide/ssr.html)
- [`vite-plugin-ssr`](https://vite-plugin-ssr.com/) - important to go through all in the docs since everything else that aren't out-of-the-box were set up manually (for educational purposes).
- [Tailwind CSS](https://tailwindcss.com/docs) and [Vite Integration](https://tailwindcss.com/docs/guides/vite).
- [Pinia](https://pinia.vuejs.org/) and [`vite-plugin-ssr` Integration](https://vite-plugin-ssr.com/pinia)
- [Vuelidate](https://vuelidate-next.netlify.app/)
- [Iconify](https://iconify.design/docs/icon-components/vue/) (Not yet impemented)
- [Webfont DL](https://github.com/feat-agency/vite-plugin-webfont-dl) (Not yet impemented)

#### Documents

- [User Stories](https://docs.google.com/document/d/1JsGsiNg07R9YdC7NnHcfoiwxikiIcznCF4tCBQXY_YI/edit) - request access to Google Drive
- [e-Learning Portal UI - Figma](https://www.figma.com/file/GWF1nhwVVyf9yBfpnPUnYv/eLearning?node-id=446%3A188) - request access to Figma

### Back-end

The Web API endpoints are mocked with the following tools:

- [faker.js](https://github.com/marak/Faker.js/) for seeders
- [JSON Server](https://github.com/typicode/json-server) to host db.json
- [Docker](https://www.docker.com/) to host dockerized [redis](https://redis.io/).

#### Documents

- [API Specs](https://docs.google.com/document/d/1L0hdRgWpCUyc0EigpzBTy65xjDudIaS3opKrboPwCaQ/edit) - request access to Google Drive
- You can refer to [`docs/erd.drawio`](docs/erd.drawio) for a quick access to the ERD using [VS Code Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) plugin.

## Running the Project

#### For newly cloned repo

- `npm i` or `yarn` to install dependencies.
- `npm run seeder` or `yarn seeder` to run seeders for the mocked db.
- `docker-compose up -d` to create and run a redis server

Run applications

- `npm run dev` or `yarn dev` to run the SSR Web application and mocked Web API concurrently.

## Environment

### VS Code Setup

Some VS Code Extensions Recommendations are already defined in `.vscode/extensions.json`. Also, `./vscode/settings.json` is included for a few prettier & eslint configurations.

### Code Comments

- Please utilize [JSDoc](https://devhints.io/jsdoc) as much as possible.
- Consider using the common [Comment Tags](<https://en.wikipedia.org/wiki/Comment_(computer_programming)#Tags>) to prefix your comments appropriately. You may refer to Python's _[PEP 350 -- Codetags: Mnemonics](https://www.python.org/dev/peps/pep-0350/#mnemonics)_ for more about this.
- **Install the [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) extension** as recommended in the `.vscode/extensions.json`. The `settings.json` already includes a configuration for this plugin.

> Note that the idea behind the vibrant colors is to poke your eyes with its brightness, ensuring that they capture the reader's attention and provide a slight discomfort to motivate cleanup. Feel free to **modify the hex values to prevent any significant discomfort or potential risks such as photosensitive epilepsy**.

### Tailwind CSS on VS Code

Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) Plugin and Follow their official _Recommended VS Code Settings_

VS Code has built-in CSS validation which may display errors when using Tailwind-specific syntax, such as `“Unknown at rule @tailwind”` warning or `@apply`. To fix this, open the CSS file where you are using Tailwind CSS and Press `Ctrl` + `Shift` + `P`, then search for "Change language mode". Inside the search bar, type “tailwindcss” and select it. Now your CSS file is associated with Tailwind CSS and the warnings should be gone.

By default, VS Code will not trigger completions when editing "string" content, for example within JSX attribute values. Updating the editor.quickSuggestions setting may improve your experience:

```
"editor.quickSuggestions": {
  "strings": true
}
```

### Project Directory Structure

The current file structure is mainly based on `vite-ssr-plugin`'s [Basic File Structre](https://vite-plugin-ssr.com/file-structure#basic-apps). Mainly, the `pages` folder for [Filesystem Routing](https://vite-plugin-ssr.com/filesystem-routing). And `renderer` folder, although not explicitly required, is where SSR related files (such as your SSR entrypoints) should be in. The [Domain Driven Structure](https://vite-plugin-ssr.com/file-structure#domain-driven) scales better for large applications but for this project, the "basic" or "flat" structure will suffice and file navigation should not be that hard.

The rest is personal preference that attempts to emulate some parts of [Nuxt's directory structure](https://nuxt.com/docs/guide/directory-structure/nuxt).

## Implementation Details

### Routing
The application uses the **Client-side Routing** method (DOM mutations upon page navigation). See [*#Server Routing or Client Routing?*](https://vite-plugin-ssr.com/routing#server-routing-or-client-routing).

As [documented](https://vite-plugin-ssr.com/filesystem-routing), creating a landing page can either be done with `pages/module/index.page.vue` or `pages/module.page.vue`. Organizing our page files according to available features of the current File System Routing will inevitably make multiple `index` files. *Attow.*, there is no simple way around this if you find the `Ctrl` + `P` + `"index"` results unbearable. Best we can do is do something like:
```
pages/products.page.vue             (outside "products" folder)
pages/products/page/@id.page.vue
```
As suppose to:
```
pages/products/page/index.page.vue  (inevitable repitition)
pages/products/page/@id.page.vue
```

### Accessibility (a11y)
Please follow standard accessibility guidelines and Tailwind accessibility features and guidelines such as `[role="list"]`, `.sr-only`, `.not-sr-only`, and using `[aria-hidden="true"]`.

//TODOC: Route Guards / CASL

//TODOC: Prefetching data with [`onBeforeRender()` hook in `.page.server`](https://vite-plugin-ssr.com/onBeforeRender-isomorphic) to alleviate the workload from the browser for the first page (i.e., of a paginated list). Further pagination is fetched client-side as usual.
