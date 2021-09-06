export const CodeTypes = ['js', 'css'] as const

export type CodeType = typeof CodeTypes[number]

export type Code = {
  [key in CodeType]: string
}