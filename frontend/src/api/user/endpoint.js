const baseURL = {
  user: 'https://stockify-y4e2.onrender.com/api/user',
}

export const UserEndPoint = {
  register: `${baseURL.user}/register`,
  login: `${baseURL.user}/login`,
  resetPassword: `${baseURL.user}/send-reset-password-email`,
}
