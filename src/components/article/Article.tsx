import { theme } from 'theme'
import { ArticleContent } from './ArticleContent'
import { SocialShares } from './SocialShare'
import { TagsWithLabel } from './Tag'

type ArticleProps = {
  url: string
  title: string
  published: string
  updated: string
  tags: string[]
  content: string
}

export const Article: React.FC<ArticleProps> = (props) => {
  return (
    <div>
      <div className="published-section">
        <div className="published">公開日: {props.published}</div>
        {props.published !== props.updated && (
          <div className="published">更新日: {props.updated}</div>
        )}
      </div>

      <div className="article-content-wrap">
        <TagsWithLabel tags={props.tags} />
        <ArticleContent content={props.content} />
        <TagsWithLabel tags={props.tags} />
      </div>
      <div className="social-shares">
        <SocialShares url={props.url} title={props.title} />
      </div>
      <style jsx>
        {`
          .published-section {
            padding: 10px;
            gap: 20px;
            display: flex;
          }
          .published {
            color: ${theme.text.secondary};
            font-size: 14px;
          }
          .article-content-wrap {
            background-color: ${theme.background.primary};
            border-radius: 10px;
            padding: 10px 20px;
          }
          .social-shares {
            padding: 10px;
          }
        `}
      </style>
    </div>
  )
}
