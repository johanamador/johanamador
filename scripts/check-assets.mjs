import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'

const assets = new Set()
const sources = []
async function walk(directory, visit) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) await walk(file, visit)
    else await visit(file)
  }
}
await walk('public', async file => assets.add(file.replaceAll('\\', '/').slice(6)))
for (const directory of ['app', 'components', 'lib']) {
  await walk(directory, async file => {
    if (/\.(tsx?|css)$/.test(file)) sources.push(file)
  })
}
const errors = []
for (const asset of assets) {
  if (!/^\/[a-z0-9./-]+$/.test(asset)) errors.push(`Use lowercase kebab-case: ${asset}`)
}
for (const file of sources) {
  const source = await readFile(file, 'utf8')
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const visit = node => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const url = node.text.split('?')[0]
      if (/^\/(?!\/).+\.(svg|webp|png|jpe?g|pdf)$/.test(url) && !assets.has(url)) {
        errors.push(`${file}: missing asset or wrong letter case: ${url}`)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(tree)
}
// These paths are assembled at runtime, so check each supported variant explicitly.
for (const name of ['sihsalus', 'sercom', 'prosedain', 'iserma']) {
  for (const size of [480, 960]) {
    const asset = `/projects/featured/${name}-${size}.webp`
    if (!assets.has(asset)) errors.push(`Missing featured image: ${asset}`)
  }
}
for (const locale of ['en', 'es']) {
  if (!assets.has(`/johan-amador-cv-${locale}.pdf`)) errors.push(`Missing ${locale} CV`)
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Checked ${assets.size} public assets and ${sources.length} source files.`)
}
