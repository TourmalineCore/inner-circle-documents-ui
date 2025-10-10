import { TextContent } from 'pdfjs-dist/types/src/display/api'

export function isNotContainLastNameInFileText(text: TextContent, lastName: string) {
  return text
    .items
    // @ts-ignore
    .every((item) => !item.str.toLowerCase()
      .includes(lastName.toLowerCase()))
}
