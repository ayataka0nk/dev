import Link from 'next/link'

export const Tag: React.FC<{ name: string; path: string }> = (props) => {
  return (
    <>
      <Link href={props.path} passHref>
        <a className="link">{props.name}</a>
      </Link>
      <style jsx>{`
        .link {
          color: rgb(3, 102, 214);
          background-color: rgb(234, 245, 255);
          padding: 3px 8px;
          border-radius: 7px;
          text-decoration: none;
          white-space: nowrap;
        }
        .link:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export const Tags: React.FC<{ tags: string[] }> = (props) => {
  return (
    <div className="tags">
      {props.tags.map((tag, index) => (
        <div key={index} className="tag">
          <Tag name={tag} path={`/tags/${tag}`} />
        </div>
      ))}
      <style jsx>{`
        .tag {
          padding: 10px 3px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  )
}

export const TagsWithLabel: React.FC<{ tags: string[] }> = (props) => {
  return (
    <div className="tags">
      <label>Tags:</label>
      <Tags tags={props.tags} />
      <style jsx>
        {`
          .tags {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  )
}
