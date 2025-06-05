/**
 * Format posts by fixing spaces and punctuations between CJK
 * Project: https://github.com/huacnlee/autocorrect
 * Usage: pnpm format-posts
 */

import { readFile, writeFile } from 'node:fs/promises'
import process from 'node:process'
import { format } from 'autocorrect-node'
import fg from 'fast-glob'

interface MarkdownContent {
  frontmatter: string
  body: string
  hasFrontmatter: boolean
}

// Split Markdown file into frontmatter and content
function splitContent(content: string): MarkdownContent {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) {
    return {
      frontmatter: '',
      body: content,
      hasFrontmatter: false,
    }
  }

  return {
    frontmatter: match[1],
    body: match[2],
    hasFrontmatter: true,
  }
}

// Get all Markdown files to process
async function getMarkdownFiles(): Promise<string[]> {
  console.log('🔍 Scanning Markdown files...')
  const files = await fg(['src/content/**/*.{md,mdx}'])
  console.log(`📦 Found ${files.length} Markdown files`)
  return files
}

// Format a single Markdown file
async function formatSingleFile(filePath: string): Promise<boolean> {
  const content = await readFile(filePath, 'utf8')
  const { frontmatter, body, hasFrontmatter } = splitContent(content)

  const formattedBody = format(body)
  const newContent = hasFrontmatter
    ? `---\n${frontmatter}\n---\n${formattedBody}`
    : formattedBody

  // Skip if content hasn't changed
  if (content === newContent) {
    return false
  }

  // Write updated content to file
  await writeFile(filePath, newContent, 'utf8')
  console.log(`✅ ${filePath}`)
  return true
}

// Report formatting results
function reportResults(changedCount: number, errorCount: number): void {
  if (changedCount === 0) {
    console.log('✅ Check complete, no files needed formatting changes')
  }
  else {
    console.log(`✨ Formatted ${changedCount} files successfully`)
  }

  if (errorCount > 0) {
    console.log(`⚠️ ${errorCount} files failed to format`)
  }
}

// Main function to format all Markdown files
async function formatMarkdownFiles(): Promise<void> {
  const files = await getMarkdownFiles()

  let changedCount = 0
  let errorCount = 0

  for (const file of files) {
    try {
      const wasChanged = await formatSingleFile(file)
      if (wasChanged) {
        changedCount++
      }
    }
    catch (error) {
      console.error(`❌ ${file}: ${(error as Error)?.message ?? String(error)}`)
      errorCount++
    }
  }

  reportResults(changedCount, errorCount)
}

formatMarkdownFiles().catch((error) => {
  console.error('❌ Execution failed:', (error as Error)?.message ?? String(error))
  process.exit(1)
})
