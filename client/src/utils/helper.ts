export const handleSort = (a: any, b: any) => {
  return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0])
}

export const formatTitle = (title: string) => {
  return (title[0].toUpperCase() + title.slice(1)).replace('-', ' ')
}
