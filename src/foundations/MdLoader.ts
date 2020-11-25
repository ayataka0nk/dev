import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { ARTICLE_FILE_NAME, POSTS_DIR } from './Constants'
import { formatDate } from './date'

export type FrontMatter = {
  title: string
  published: Date
  tags: string
}

/**
 * 1記事読み込み
 * @param slug
 */
export const analyzeMarkdown = async (slug: string) => {
  const markdown = fs.readFileSync(
    path.join(POSTS_DIR, slug, ARTICLE_FILE_NAME),
    'utf8'
  )

  const matterResult = matter(markdown)
  const mdInfo = matterResult.data as FrontMatter
  const tags = mdInfo.tags.split(',').map((tag) => tag.trim())
  return {
    title: mdInfo.title,
    published: formatDate(mdInfo.published),
    tags: tags,
    content: matterResult.content,
  }
}

/**
 * 全記事のフォルダ名を取得
 */
export const readSlugs = () => {
  const dirents = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
  return dirents
    .filter((dirent) => !dirent.isFile())
    .map((dirent) => dirent.name)
    .sort()
}

/**
 * 重複無しでTagを収集。readAllTagsで使うreducer
 * @param baseTags
 * @param targetTags
 */
const collectNoDuplicateTags = (baseTags: string[], targetTags: string[]) => {
  const tags = [...baseTags]
  targetTags.map((tag) => {
    if (!tags.includes(tag)) {
      tags.push(tag)
    }
  })
  return tags
}

/**
 * 全記事から全タグを読み込み
 */
export const readAllTags = async () => {
  const slugs = readSlugs()
  let tags: string[] = []
  //並行処理でファイル読み込み。I/Oがネックなら並行でいいはず。もしそうでないなら並列処理も検討する。
  return (await Promise.all(slugs.map((slug) => analyzeMarkdown(slug)))).reduce(
    (tags, mdInfo) => collectNoDuplicateTags(tags, mdInfo.tags),
    tags
  )
}
