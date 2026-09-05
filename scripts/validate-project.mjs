import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const readProjectFile = file => readFileSync(join(rootDir, file), 'utf8')

const workflow = readProjectFile('.github/workflows/pages.yml')
const html = readProjectFile('index.html')
const viteConfig = readProjectFile('vite.config.js')
const store = readProjectFile('src/stores/chinaMap.js')
const gitignore = readProjectFile('.gitignore')

const workflowSteps = [...workflow.matchAll(/^\s*(?:uses|run):\s+(.+)\s*$/gm)]
  .map(match => match[1])

assert.deepEqual(workflowSteps, [
  'actions/checkout@v7',
  'actions/setup-node@v6',
  'npm install',
  'npm run lint',
  'npm test',
  'actions/configure-pages@v6',
  'npm run build:pages',
  'actions/upload-pages-artifact@v5',
  'actions/deploy-pages@v5'
])
assert.match(workflow, /^\s*node-version:\s*22\s*$/m)
assert.match(workflow, /^\s*package-manager-cache:\s*false\s*$/m)
assert.doesNotMatch(workflow, /^\s*cache:\s*/m)
assert.doesNotMatch(workflow, /cache-dependency-path|actions\/cache/)
assert.doesNotMatch(workflow, /npm publish|gh release|git tag|git push.*--tags/)
assert.match(workflow, /^\s*contents:\s*read\s*$/m)
assert.match(workflow, /^\s*pages:\s*write\s*$/m)
assert.match(workflow, /^\s*id-token:\s*write\s*$/m)
assert.match(workflow, /^\s*path:\s*dist\s*$/m)

const expectedDescription = 'An interactive China map visualization built with Vue 3, Pinia, Axios, Vite, and ECharts.'
const productionUrl = 'https://chengchuu.github.io/vue-china-map/'
const repositoryUrl = 'https://github.com/chengchuu/vue-china-map'

assert.match(html, /<title>Vue China Map \| Vue 3 and ECharts Visualization<\/title>/)
assert.ok(html.includes(`<meta name="description" content="${expectedDescription}" />`))
assert.ok(html.includes(`<link rel="canonical" href="${productionUrl}" />`))

const jsonLdScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
assert.equal(jsonLdScripts.length, 1)

const jsonLd = JSON.parse(jsonLdScripts[0][1])
assert.deepEqual(jsonLd, {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Vue China Map',
  url: productionUrl,
  description: expectedDescription,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  sameAs: repositoryUrl,
  author: {
    '@type': 'Person',
    name: 'Cheng'
  }
})

const collectVueFiles = directory => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectVueFiles(path)
    }

    return entry.name.endsWith('.vue') ? [path] : []
  })

const headingSources = [
  html,
  ...collectVueFiles(join(rootDir, 'src')).map(file => readFileSync(file, 'utf8'))
]
const headings = headingSources.flatMap(source => [...source.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)])

assert.equal(headings.length, 1)
assert.equal(headings[0][1].replace(/<[^>]+>/g, '').trim(), 'Vue China Map Visualization')
assert.match(viteConfig, /base:\s*process\.env\.BASE_PATH\s*\|\|\s*'\/'/)
assert.match(store, /`\$\{import\.meta\.env\.BASE_URL\}static\/data\/heatChinaRealData\.json`/)
assert.match(gitignore, /^package-lock\.json$/m)
