import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'

export const Tag: React.FC<{ name: string; path: string }> = (props) => {
  const router = useRouter()
  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    router.push(props.path)
  }
  return (
    <>
      <div className="link" onClick={onClick}>
        {props.name}
      </div>
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
