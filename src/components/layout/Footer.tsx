import { theme } from '../../theme'

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <style jsx>
        {`
          .footer {
            box-sizing: border-box;
            height: 56px;
            background-color: ${theme.background.inverted};
          }
        `}
      </style>
    </div>
  )
}
