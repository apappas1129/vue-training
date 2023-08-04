# ![](public/vite.svg) vue-e-learning

[![](https://img.shields.io/badge/made%20with-vue-4FC08D?style=for-the-badge&logo=vuedotjs)](https://vuejs.org/) [![](https://img.shields.io/badge/powered%20by-vite-B242FE?style=for-the-badge&logo=vite&logoColor=FFD42C)](https://vitejs.dev/guide/)

This project serves as an exercise for my Vue 3 Training program. **eLearning Platform** is a Content Management System (CMS) for a basic MOOC platform that allows "Instructors" to deliver learning content online to any "Student" who wish to register and subscribe to their "Course". Refer to [User Stories](#documents) and [content-diagram.drawio](docs/content-diagram.drawio) for details.

## Table of Contents

- [Prerequisite](#prerequisite)
- [Running the Project](#running-the-project)
- [Environment](#environment)
- [Implementation Details](#implementationdetails)

## Prerequisite

### Front-end

- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/guide/) (introductory/fundamentals)
- [SSR](https://vuejs.org/guide/scaling-up/ssr.html), [(Vite) SSR](https://vitejs.dev/guide/ssr.html)
- [`vite-plugin-ssr`](https://vite-plugin-ssr.com/) - important to go through all in the docs since everything else that aren't out-of-the-box were set up manually (for educational purposes).
- [Tailwind CSS](https://tailwindcss.com/docs) and [Vite Integration](https://tailwindcss.com/docs/guides/vite).
- [Pinia](https://pinia.vuejs.org/) and [`vite-plugin-ssr` Integration](https://vite-plugin-ssr.com/pinia)
- [Vuelidate](https://vuelidate-next.netlify.app/)
- [CASL Vue](https://casl.js.org/v6/en/package/casl-vue)
- [Remixicon](https://remixicon.com/)
- [TanStack Table](https://tanstack.com/table/v8) (headless data-table)
- [Tiptap](https://tiptap.dev/) (headless rich text editor)
- [Webfont DL](https://github.com/feat-agency/vite-plugin-webfont-dl) (Not yet implemented)

#### Documents

- [User Stories](https://docs.google.com/document/d/1JsGsiNg07R9YdC7NnHcfoiwxikiIcznCF4tCBQXY_YI/edit) - request access to Google Drive
- [e-Learning Portal UI - Figma](https://www.figma.com/file/GWF1nhwVVyf9yBfpnPUnYv/eLearning?node-id=446%3A188) - request access to Figma

### Back-end

The Web API endpoints are mocked with the following tools:

- [faker.js](https://github.com/marak/Faker.js/) for seeders
- [JSON Server](https://github.com/typicode/json-server) to host db.json
- [Docker](https://www.docker.com/) to host dockerized [redis](https://redis.io/).
- [CASL](https://casl.js.org/v6/en)
- `express-session`

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

 I wanted experience a bit of the dirty low level jobs regarding SSR and overall boilerplating by cooking up my own vanilla Vue project before relying on Starter kits/boilerplates, or frameworks like Nuxt on my future Vue projects. I found `vite-plugin-ssr` from one of Vite's official recommended plugins for SSR and decided to try it out here. Integrating every tool I want such us Tailwind, `ofetch` to hopefully emulate and have a feel at Nuxt's `$fetch`, `Pinia` and how to make it work with SSR pages, etc.

 This project will be written  primarily with "developer-experience-first" in mind. Hence, not all features should be nitpicked to be fully functional or compliant to UI/UX specs since the main objective for this project is showcasing the accumulated knowledge during my Vue Training course. That said, clean code and best practices shall be done.

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

#### Route guards
ATTOW., I have not fully taken grasp on how to properly utilize the routing "hooks"/"functions" available to `vite-plugin-ssr`. There are technicalities on VPS [Server Routing VS Client Routing](https://vite-plugin-ssr.com/server-routing-vs-client-routing) and how these routing hooks/functions work on pages that are `*page.vue`, `*page.client.vue`, and `*page.server.vue` that I still find hard to grasp despite having the high level knowledge of how SSR works from the two recommended readings on the [Prerequisite](#prerequisite). You will find in the source code a few notes on what works or not, lack of or mis-documentation from VPS, or other existing issues. **The implementation details for authorizing routes will not be nitpicked here and different work-arounds may be expected along the way due to limitations.**

### API Requests

#### Session Cookie
The mocked Web API uses a express-session with a dockerized-redis that is shared between the SSR application server and the Web API. Since different ports on the same domain (e.g. localhost) will count as a different origin, cookies written on the web app's domain by the Web API response will not count as same-origin with the Web API. This means that this will not be automatically carried over when on every API request. We have to manually configure the request to allow cross-origin cookies.

#### Requests
To have something new, instead of axios, [ofetch](https://github.com/unjs/ofetch), the internal fetch wrapper for Nuxt, is used in the project. A `useFetch` composable is created to sugarcoat `ofetch` and it is intentionally left with the default `ofetch`/`fetch` behavior to not automatically carry over cross-origin cookies to the API requests to prevent unwanted cookies to other potential third party Web API's to be integrated. To tell `useFetch` to attach the session cookie, simply provide the `pageContext` and it will automatically utilize the `useCookie` composable which can be also used on specific implementation details.

### Pre-fetching and rendering initial data

(Not yet implemented)

It is desirable to have our page 1 on our data-tables for example to be pre-rendered. We want to lighten up the burden on the client-side as much as possible. We will attempt to utilize `vite-plugin-ssr`'s routing hooks to achieve this but challenges are expected here due to limitations or bugs that may still exist within the current version of the integrated package. One of which is having isues with passing data through `pageContext`. Or a combination like the need to set a page to be only client rendered (i.e. `*page.client.vue`) while the need for certain hooks to behave as expected.

(`DataTable.vue` Compenent's improvement is in progress. It should be made to ask for an optional initial data and stop fetching the first page if initial data is provided.)

### HTML semantics & a11y
Follow as best as we can the [HTML Living Standard](https://html.spec.whatwg.org/) and accessibility (a11y) guidelines such as using `[aria-hidden="true"]`. And others mentioned from Tailwind's [Accessibility features](https://tailwindcss.com/docs/screen-readers) (`[role="list"]`, `.sr-only`, `.not-sr-only`).

