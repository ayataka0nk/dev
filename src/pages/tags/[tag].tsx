import { TagsWithLabel } from 'components/article/Tag'
import { ArticleList } from 'components/ArticleList'
import { Layout } from 'components/layout/Layout'
import { BASE_URL } from 'foundations/Constants'
import { readAllTags, readMatters, readSlugs } from 'foundations/MdLoader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

export const getStaticPaths: GetStaticPaths<{ tag: string }> = async () => {
  const paths = (await readAllTags()).map((tag) => ({
    params: { tag: encodeURIComponent(tag) },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  TagsPageProps,
  { tag: string }
> = async (context) => {
  if (context.params) {
    const tag = context.params.tag
    const slugs = readSlugs()
    const matters = (await readMatters(slugs)).filter((matter) =>
      matter.tags.includes(tag)
    )
    const tags = await readAllTags()
    return {
      props: { slugs, matters, tag, tags },
    }
  } else {
    return { props: { slugs: [], matters: [], tag: '', tags: [] } }
  }
}

type TagsPageProps = {
  slugs: string[]
  matters: { title: string; published: string; tags: string[]; path: string }[]
  tag: string
  tags: string[]
}

const TagsPage: NextPage<TagsPageProps> = (props) => {
  const url = BASE_URL + '/tags/' + props.tag
  return (
    <Layout>
      <Head>
        <link rel="canonical" href={url} />
        <title>naoto-kamba.dev;Tag:{props.tag}</title>
      </Head>
      <div className="selected-tag">
        <label className="label">Tag:</label>
        <div>{props.tag}</div>
      </div>
      <ArticleList matters={props.matters} />
      <hr />
      <TagsWithLabel tags={props.tags} />
      <style jsx>{`
        .selected-tag {
          display: flex;
          padding: 10px 0px;
          font-size: 24px;
        }
        .label {
          margin-right: 5px;
        }
      `}</style>
    </Layout>
  )
}

export default TagsPage
