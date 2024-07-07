const baseURL = {
  category: '/api/category',
}

export const CategoryEndPoint = {
  category: baseURL.category,
  count: `${baseURL.category}/count`,
  categoryById: `${baseURL.category}/id`,
}
  