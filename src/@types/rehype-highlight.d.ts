import unified from 'unified'

declare module 'rehype-highlight' {
  type DefaultType = unified.Attacher
  const attacher: DefaultType
  export default attacher
}
