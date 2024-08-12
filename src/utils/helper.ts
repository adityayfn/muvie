export const formatVoteAverage = (voteAverage: number): string => {
  const percentage = Math.round(voteAverage * 10)
  return percentage + "%"
}

export const formatDate = (release_date: string): string => {
  const date = new Date(release_date)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(value)
}
