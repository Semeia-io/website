## Running on Local Machine
```bash
# 1. install dependencies
npm install
# 2. start local server with browser sync
npm run dev
```
## Deploying to production
```bash
# build site and optimize css, js
npm run build
```

## Hosting on Netlify
| **Build Command** | npm run build |
| --- | --- |
| **Publish Directory** | dist |

## Wordpress Setup
Once you have WP setup on a subdomain or somewhere, make sure to change the url in `src/data/posts.js` and `src/data/vacancies.js`

