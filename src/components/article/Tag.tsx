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
    <div>
      {props.tags.map((tag, index) => (
        <div className="tag" key={index}>
          <Tag name={tag} path={`/tags/${tag}`} />
        </div>
      ))}
      <style jsx>{`
        .tag {
          display: inline-block;
          margin: 0 5px;
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
            padding: 10px 0px;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  )
}
