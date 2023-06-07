const currentYear = new Date().getFullYear()
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
export const getYearRange = () => range(currentYear, currentYear - 50, -1)
