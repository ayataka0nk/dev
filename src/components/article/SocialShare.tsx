import React from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  LineIcon,
  LineShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
type SocialSharesProps = {
  title: string
  url: string
}
export const SocialShares: React.FC<SocialSharesProps> = (props) => {
  return (
    <div>
      <LineShareButton url={props.url} title={props.title}>
        <LineIcon />
      </LineShareButton>
      <FacebookShareButton url={props.url} title={props.title}>
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={props.url} title={props.title}>
        <TwitterIcon />
      </TwitterShareButton>
      <HatenaShareButton url={props.url} title={props.title}>
        <HatenaIcon />
      </HatenaShareButton>
      <PocketShareButton url={props.url} title={props.title}>
        <PocketIcon />
      </PocketShareButton>
      <style jsx>{`
        div {
          display: flex;
          justify-content: left;
          gap: 10px;
        }
      `}</style>
    </div>
  )
}
