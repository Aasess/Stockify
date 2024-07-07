const baseURL = {
  user: '/api/user',
}

export const UserEndPoint = {
  userDetail: `${baseURL.user}/detail/id`,
  register: `${baseURL.user}/register`,
  login: `${baseURL.user}/login`,
  resetPasswordLink: `${baseURL.user}/send-reset-password-email`,
  resetPassword: `${baseURL.user}/reset-password/id`,
}
