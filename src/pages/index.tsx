import { ArticleList } from 'components/ArticleList'
import { readMatters, readSlugs } from 'foundations/MdLoader'
import { GetStaticProps, NextPage } from 'next'
import { Layout } from '../components/layout/Layout'

export const getStaticProps: GetStaticProps = async () => {
  const slugs = readSlugs()
  const matters = await readMatters(slugs)
  return {
    props: { slugs, matters },
  }
}
type HomeProps = {
  slugs: string[]
  matters: { title: string; published: string; tags: string[]; path: string }[]
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <Layout>
      <ArticleList matters={props.matters} />
    </Layout>
  )
}
export default Home
