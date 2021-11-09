import Link from 'next/link'

type ArticleListProps = {
  matters: { title: string; published: string; tags: string[]; path: string }[]
}

export const ArticleList: React.FC<ArticleListProps> = (props) => {
  return (
    <div>
      <div className="article">
        <div className="title">記事タイトル</div>
        <div className="published">更新日時</div>
      </div>
      {props.matters
        .sort((a, b) => {
          if (a.published > b.published) {
            return -1
          } else if (a.published < b.published) {
            return 1
          } else {
            return 0
          }
        })
        .map((matter, index) => {
          return (
            <div className="article" key={index}>
              <div className="title">
                <Link href={matter.path} passHref>
                  {matter.title}
                </Link>
              </div>
              <div className="published">{matter.published}</div>
            </div>
          )
        })}
      <style jsx>{`
        .title {
          flex: 1;
          margin: 0 5px 0 0;
        }
        .article {
          display: flex;
          padding: 5px 0px;
        }
        .published {
          width: 100px;
        }
      `}</style>
    </div>
  )
}
