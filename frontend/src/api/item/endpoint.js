const baseURL = {
  item: '/api/item',
}

export const ItemEndPoint = {
  item: baseURL.item,
  count: `${baseURL.item}/count`,
  itemById: `${baseURL.item}/id`,
}
