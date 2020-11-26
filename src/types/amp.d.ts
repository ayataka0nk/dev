declare namespace JSX {
  interface AmpImg {
    className?: string
    alt?: string
    src: string
    width: string
    height: string
    layout?: string
  }
  interface AmpSocialShare {
    type: string
    children?: string
    layout?: string
    'data-share-endpoint'?: string
  }
  interface IntrinsicElements {
    'amp-img': AmpImg
    'amp-social-share': AmpSocialShare
  }
}
