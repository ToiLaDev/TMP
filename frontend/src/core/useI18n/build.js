import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, join, basename } from 'path'
import { createHash } from 'crypto'
import chalk from 'chalk'

console.warn(chalk.yellow('Generating i18n locales files...'))
// eslint-disable-next-line no-undef
const sourceDir = resolve(process.cwd(), 'src')
// eslint-disable-next-line no-undef
const targetDir = resolve(process.cwd(), 'public', 'locales')

const getFiles = (dir, files = []) => {
  readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
    const path = join(dir, dirent.name)
    if (dirent.isDirectory()) {
      getFiles(path, files)
    } else if (dirent.name.endsWith('.locale.json')) {
      files.push(path)
    }
  })
  return files
}

const hash = createHash('md5')
const files = getFiles(sourceDir)
const locales = {}
const keyPaths = {}

const getPath = (file, bold = true) => {
  // eslint-disable-next-line no-undef
  const path = file.replace(process.cwd(), '').replace(/\//g, '\\').replace(/^\\?/, '')
  return bold ? chalk.bold(path) : path
}

const flattenKeys = (obj, parentKey = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenKeys(obj[key], newKey))
    } else {
      acc[newKey] = obj[key]
    }
    return acc
  }, {})
}

files.forEach((file) => {
  const content = readFileSync(file, 'utf8')
  const messages = JSON.parse(content)
  const locale = basename(file).split('.')[0]

  if (!locales[locale]) {
    locales[locale] = {}
  }

  const flattenedMessages = flattenKeys(messages)
  for (const key in flattenedMessages) {
    const baseFileName = basename(file)
    if (!keyPaths[key]) {
      keyPaths[key] = {}
    }
    if (!keyPaths[key][baseFileName]) {
      keyPaths[key][baseFileName] = []
    }
    // eslint-disable-next-line no-undef
    keyPaths[key][baseFileName].push(file.replace(process.cwd(), '').replace(/\\/g, '/'))
  }

  locales[locale] = { ...locales[locale], ...flattenedMessages }
})

console.info(chalk.gray('✔ Locale files found:\n'), chalk.gray(files.map((file) => `\r  - ${getPath(file)}`).join('\n')))

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true })
}

for (const locale in locales) {
  const jsonContent = JSON.stringify(locales[locale], null, 2)
  hash.update(jsonContent)

  const targetFile = join(targetDir, `${locale}.json`)
  writeFileSync(targetFile, jsonContent)

  console.info(chalk.blue(`✔ Generated ${getPath(targetFile)}`))
}

for (const key in keyPaths) {
  for (const baseFileName in keyPaths[key]) {
    if (keyPaths[key][baseFileName].length > 1) {
      console.warn(chalk.yellow(`✖ Duplicate key: ${chalk.bold(key)} in file: ${chalk.bold(keyPaths[key][baseFileName].join(', '))}`))
    }
  }
}

const finalHash = hash.digest('hex')
console.info(chalk.blue('✔ I18N_HASH:'), finalHash)

const envFileNames = ['.env.production.local', '.env.local', '.env.production', '.env']
let envFilePath = ''

for (const fileName of envFileNames) {
  // eslint-disable-next-line no-undef
  const filePath = resolve(process.cwd(), fileName)
  if (existsSync(filePath)) {
    envFilePath = filePath
    break
  }
}

if (envFilePath) {
  let envContent = readFileSync(envFilePath, 'utf8')

  const newEnvContent = envContent
    .split('\n')
    .filter((line) => !line.startsWith('VITE_I18N_HASH='))
    .concat(`VITE_I18N_HASH=${finalHash}`)
    .join('\n')

  writeFileSync(envFilePath, newEnvContent)
  console.info(chalk.green(`✔ Updated ${getPath(envFilePath)} with the new hash.`))
} else {
  console.error(chalk.red('✖ No .env file found in the expected order.'))
}
console.info(chalk.green.bold('✔ Done!'))
