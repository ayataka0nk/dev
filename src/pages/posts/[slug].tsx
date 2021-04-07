import { Article } from 'components/article/Article'
import { Layout } from 'components/layout/Layout'
import { BASE_URL } from 'foundations/Constants'
import { markdownToAmpHtml } from 'foundations/MdConverter'
import { analyzeMarkdown, readSlugs } from 'foundations/MdLoader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import path from 'path'

export const config = {
  amp: true,
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const paths = readSlugs().map((dirname) => ({
    params: { slug: path.parse(dirname).name },
  }))
  return {
    paths,
    fallback: false,
  }
}

type SlugProps = {
  slug: string
  title: string
  published: string
  tags: string[]
  content: string
}

export const getStaticProps: GetStaticProps<
  SlugProps,
  { slug: string }
> = async (context) => {
  if (context.params) {
    const md = await analyzeMarkdown(context.params.slug)
    const content = await markdownToAmpHtml(context.params.slug, md.content)
    return {
      props: {
        slug: context.params.slug,
        title: md.title,
        published: md.published,
        tags: md.tags,
        content: content,
      },
    }
  } else {
    const tags: string[] = []
    return {
      props: {
        slug: '',
        title: '',
        published: '',
        tags: tags,
        content: '',
      },
    }
  }
}

const Slug: NextPage<SlugProps> = (props) => {
  const url = BASE_URL + '/posts' + '/' + props.slug
  return (
    <Layout>
      <Head>
        <link rel="canonical" href={url} />
        <title>{props.title}; naoto-kamba.dev</title>
      </Head>
      <Article
        title={props.title}
        published={props.published}
        tags={props.tags}
        content={props.content}
        url={url}
      />
    </Layout>
  )
}
export default Slug
