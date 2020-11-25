import { ArticleContent } from './ArticleContent'
import { Tag, Tags } from './Tag'

type ArticleProps = {
  url: string
  title: string
  published: string
  tags: string[]
  content: string
}

export const Article: React.FC<ArticleProps> = (props) => {
  return (
    <div>
      <ArticleContent content={props.content} />
      <Tags tags={props.tags} />
    </div>
  )
}
