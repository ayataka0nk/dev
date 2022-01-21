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
  url: string
}
export const SocialShares: React.FC<SocialSharesProps> = (props) => {
  return (
    <div>
      <LineShareButton url={props.url} className="share">
        <LineIcon />
      </LineShareButton>
      <FacebookShareButton url={props.url} className="share">
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={props.url} className="share">
        <TwitterIcon />
      </TwitterShareButton>
      <HatenaShareButton url={props.url} className="share">
        <HatenaIcon />
      </HatenaShareButton>
      <PocketShareButton url={props.url} className="share">
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
