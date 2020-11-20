import { theme } from '../../theme'

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-text">Naoto Kamba: Tech Blog</div>
      <style jsx>
        {`
          .header-text {
            color: ${theme.text.inverted};
          }
          .header {
            box-sizing: border-box;
            padding: 10px;
            background-color: ${theme.background.inverted};
          }
        `}
      </style>
    </div>
  )
}
