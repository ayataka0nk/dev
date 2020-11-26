import { theme } from 'theme'
import { Footer } from './Footer'
import { GlobalStyles } from './GlobalStyles'
import { Header } from './Header'

export const Layout: React.FC = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Footer />
      <style jsx>{`
        main {
          max-width: 960px;
          margin: 0 auto;
          padding: 13px;
          min-height: 700px;
        }
      `}</style>
      <style jsx global>
        {GlobalStyles}
      </style>
    </div>
  )
}
