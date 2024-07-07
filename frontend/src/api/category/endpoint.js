const baseURL = {
  category: 'https://stockify-y4e2.onrender.com/api/category',
}

export const CategoryEndPoint = {
  category: baseURL.category,
  count: `${baseURL.category}/count`,
  categoryById: `${baseURL.category}/id`,
}
  