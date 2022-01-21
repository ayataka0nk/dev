import { theme } from '../../theme'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <div className="header">
      <Link href="/" passHref>
        <a>
          <div className="header-text">Naoto Kamba: Blog</div>
        </a>
      </Link>
      <style jsx>
        {`
          .header-text {
            display: inline-block;
            color: ${theme.text.inverted};
            font-weight: 600;
            padding: 10px;
          }
          .header {
            box-sizing: border-box;
            padding: 10px;
            background-color: ${theme.background.inverted};
            height: 56px;
          }
        `}
      </style>
    </div>
  )
}
