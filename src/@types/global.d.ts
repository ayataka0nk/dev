interface Window {
  dataLayer: {
    push: (args: { event: string; page: string }) => void
  }
}
