import { ArticleContent } from './ArticleContent'

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
    </div>
  )
}
