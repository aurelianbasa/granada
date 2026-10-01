<h1 align="center">Granada Gold Mine</h1>

## Development requirements

```
Node.js - v20.11.0
Gatsby - v5.13.5
```

## Project Structure

Key files:

```
├── locales
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── ...
│   └── fr
│       ├── common.json
│       ├── home.json
│       └── ...
│
├── src
│   ├── components
│   ├── media
│   ├── pages
│   └── styles
│
├── .env.EXAMPLE
├── gatsby-config.js
├── tailwind.config.js
└── README.md
```

## Local Development

Create `.env` file in the root of the project with the following content:

```
GATSBY_ALGOLIA_APP_ID='your_key'
GATSBY_ALGOLIA_SEARCH_KEY='your_key'
ALGOLIA_ADMIN_KEY=''

CONTENTFUL_SPACE_ID='your_key'
CONTENTFUL_ACCESS_TOKEN='your_key'
```

Navigate into your site’s directory and start it up:

```
npm i
npm run develop
```

or

```
yarn
yarn develop
```

Your site is now running at http://localhost:8000.

Edit `src/pages/index.js` to see your site update in real-time!

## Production build

To start a production build locally run the following commands:

```
npm run build
npm run serve
```

or

```
yarn build
yarn serve
```

The production build is now running at http://localhost:9000.

## Usefull links

- [Gatsby](https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeadlessUI Components](https://headlessui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Remix Icon](https://react-icons.github.io/react-icons/icons/ri/)
- [Algolia](https://www.algolia.com/doc/)
- [Contentful](https://www.contentful.com/)
