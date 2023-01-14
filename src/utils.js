const sum = (arr) => (arr.reduce((a, b) => a + b))

const mean = (arr, length = null) => {
  const len = length ?? arr.length

  return sum(arr) / len
}

const range = (n) => ([...Array(n).keys()])

export { sum, mean, range }
