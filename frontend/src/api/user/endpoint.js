const baseURL = {
  user: 'https://stockify-y4e2.onrender.com/api/user',
}

export const UserEndPoint = {
  register: `${baseURL.user}/register`,
  login: `${baseURL.user}/login`,
  resetPasswordLink: `${baseURL.user}/send-reset-password-email`,
  resetPassword: `${baseURL.user}/reset-password/id`,
}
