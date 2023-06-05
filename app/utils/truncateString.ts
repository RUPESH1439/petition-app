function truncateString(len: number, text?: string) {
  return text?.length > len ? `${text.substr(0, len)}...` : text
}
export default truncateString
