export const startCase = (str?: string) => {
  return str?.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
}
