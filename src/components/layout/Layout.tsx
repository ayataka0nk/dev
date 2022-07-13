import { theme } from 'theme'
import { Footer } from './Footer'
import { GlobalStyles } from './GlobalStyles'
import { Header } from './Header'

export const Layout: React.FC = (props) => {
  return (
    <div>
      <Header />
      <div className="main-box">
        <main>{props.children}</main>
      </div>
      <style jsx>{`
        .main-box {
          background-color: ${theme.background.secondary};
        }
        main {
          max-width: 960px;
          margin: 0 auto;
          min-height: 700px;
          padding-left: 0px;
          padding-right: 0px;
        }
        @media (min-width: ${theme.media.breakpoint.sm}) {
          main {
            padding-left: 25px;
            padding-right: 25px;
          }
        }
        @media (min-width: ${theme.media.breakpoint.md}) {
          main {
            padding-left: 50px;
            padding-right: 50px;
          }
        }
      `}</style>
      <style jsx global>
        {GlobalStyles}
      </style>
    </div>
  )
}
