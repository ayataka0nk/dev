import { Tags } from 'components/article/Tag'
import { useRouter } from 'next/router'
import { theme } from 'theme'

type ArticleCardProps = {
  title: string
  published: string
  url: string
  tags: string[]
}
export const ArticleCard = ({
  title,
  published,
  url,
  tags,
}: ArticleCardProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push(url)
  }
  return (
    <div className="card" onClick={onClick}>
      <div className="title">{title}</div>
      <div>
        <Tags tags={tags} />
      </div>
      <div className="published">{published}</div>
      <style jsx>{`
        .card {
          background-color: ${theme.background.primary};
          padding: 10px;
          cursor: pointer;
          border-radius: 10px;
          height: 120px;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-weight: 700;
          color: ${theme.text.primary};
          flex: 1;
        }
        .published {
          color: ${theme.text.secondary};
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}
