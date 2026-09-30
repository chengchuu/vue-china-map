import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const readProjectFile = file => readFileSync(join(rootDir, file), 'utf8')

const workflow = readProjectFile('.github/workflows/pages.yml')
const html = readProjectFile('index.html')

assert.match(workflow, /\bpush:\s*\n\s+branches:\s*\n\s+-\s+pages\s*(?:\n|$)/)
assert.match(workflow, /^\s*run:\s*npm run build:pages\s*$/m)
assert.match(workflow, /^\s*uses:\s*actions\/upload-pages-artifact@\S+\s*$/m)
assert.match(workflow, /^\s*uses:\s*actions\/deploy-pages@\S+\s*$/m)
assert.match(workflow, /^\s*pages:\s*write\s*$/m)
assert.match(workflow, /^\s*id-token:\s*write\s*$/m)
assert.match(workflow, /^\s*path:\s*dist\s*$/m)

const productionUrl = 'https://chengchuu.github.io/vue-china-map/'

assert.ok(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim(), 'Page title must not be empty')
const description = html.match(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*\bcontent=["']([^"']*)["'][^>]*>/i)
assert.ok(description?.[1].trim(), 'Page description must not be empty')
const canonical = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']*)["'][^>]*>/i)
assert.equal(canonical?.[1], productionUrl)

const jsonLdScripts = [...html.matchAll(/<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)]
assert.equal(jsonLdScripts.length, 1)

const jsonLd = JSON.parse(jsonLdScripts[0][1])
assert.equal(jsonLd['@context'], 'https://schema.org')
assert.equal(jsonLd['@type'], 'WebApplication')
assert.equal(jsonLd.url, productionUrl)
