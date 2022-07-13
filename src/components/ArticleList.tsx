import { ArticleCard } from './articles/ArticleCard'

type ArticleListProps = {
  matters: { title: string; published: string; tags: string[]; path: string }[]
}

export const ArticleList: React.FC<ArticleListProps> = (props) => {
  return (
    <div className="root">
      <div className="articles">
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
              <ArticleCard
                key={index}
                title={matter.title}
                url={matter.path}
                published={matter.published}
                tags={matter.tags}
              />
            )
          })}
      </div>
      <style jsx>{`
        .root {
          padding-top: 20px;
        }
        .articles {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 10px;
        }
      `}</style>
    </div>
  )
}
