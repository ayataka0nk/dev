import { TwitterIcon } from 'components/icons/TwitterIcon'
import Link from 'next/link'
import { theme } from 'theme'

type ProfileCardProps = {
  margin?: string
}
export const ProfileCard = ({ margin }: ProfileCardProps) => {
  return (
    <div className="card">
      <div className="icon-name-wrapper">
        <div className="icon">
          <img className="twitter-img" src="/images/nekoicon.png" />
        </div>
        <div className="info">
          <div className="name">
            <span className="full-name">神庭 直人</span>
            <span>@ayataka0nk</span>
          </div>
          <div className="links">
            <Link href="https://twitter.com/ayataka0nk">
              <div className="twitter-icon ">
                <TwitterIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .icon-name-wrapper {
            display: flex;
            align-items: center;
          }
          .icon {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 30px;
            flex-shrink: 0;
          }
          .twitter-img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
          .info {
          }
          .name {
            font-size: 18px;
            color: ${theme.text.primary};
            padding: 5px;
          }
          .full-name {
            font-weight: 700;
          }
          .links {
            padding: 5px;
          }
          .twitter-icon {
            height: 50px;
            width: 50px;
          }
          .card {
            background-color: ${theme.background.primary};
            padding: 10px;
            border-radius: 10px;
            margin: ${margin};
          }
        `}
      </style>
    </div>
  )
}
