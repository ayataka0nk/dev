import { theme } from 'theme'
import { GlobalStyles } from './GlobalStyles'
import { Header } from './Header'

type LayoutProps = {
  children: React.ReactNode
}
export const Layout = (props: LayoutProps) => {
  return (
    <div className="root">
      <Header />
      <div className="main-box">
        <main>{props.children}</main>
      </div>
      <style jsx>{`
        .root {
          min-width: 300px;
        }
        .main-box {
          background-color: ${theme.background.secondary};
        }
        main {
          max-width: 960px;
          margin: 0 auto;
          min-height: 700px;
          padding-left: 0px;
          padding-right: 0px;
          margin-bottom: 20px;
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
