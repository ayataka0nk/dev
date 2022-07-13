import { theme } from '../../theme'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <div className="border">
      <div className="header">
        <Link href="/" passHref>
          <a>
            <div className="header-text">Naoto Kamba: Blog</div>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .header-text {
            display: inline-block;
            color: ${theme.text.primary};
            font-weight: 600;
            padding: 10px;
            font-size: 20px;
          }
          .header {
            box-sizing: border-box;
            padding: 10px;
            background-color: ${theme.background.primary};
            height: 56px;
          }
          .border {
            border-bottom: solid 1px ${theme.background.secondary};
          }
        `}
      </style>
    </div>
  )
}
