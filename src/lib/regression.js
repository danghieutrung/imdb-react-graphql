import { sum, mean, range } from '../utils'

const regressionLine = (episodes) => {
  const length = episodes.length

  const x = episodes.map(episode => episode[0])
  const y = episodes.map(episode => episode[1])

  const coefs = regressionCoefficients(x, y, length)

  const firstX = x[0]
  const lastX = x[length - 1]

  return [[firstX, calculateYFromX(firstX, coefs)], [lastX, calculateYFromX(lastX, coefs)]]
}

const regressionCoefficients = (x, y, length = null) => {
  const len = length ?? x.length

  const xMean = mean(x, len)
  const yMean = mean(y, len)

  const lengthRange = range(len)

  const slope = sum(lengthRange.map(i => (x[i] - xMean) * (y[i] - yMean))) / sum(lengthRange.map(i => (x[i] - xMean) ** 2))
  const intercept = yMean - slope * xMean

  return [slope, intercept]
}

const calculateYFromX = (x, [slope, intercept]) => (x * slope + intercept)

export { regressionLine }
