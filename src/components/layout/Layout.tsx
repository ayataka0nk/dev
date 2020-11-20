import { GlobalStyles } from './GlobalStyles'
import { Header } from './Header'

export const Layout: React.FC = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <style jsx>{`
        main {
          max-width: 960px;
        }
      `}</style>
      <style jsx global>
        {GlobalStyles}
      </style>
    </div>
  )
}
