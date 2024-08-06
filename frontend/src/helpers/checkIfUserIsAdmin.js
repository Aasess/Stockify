export const checkIfUserIsAdmin = () => {
  const userId = localStorage.getItem('userId')

  // note: 13 is userId for admin
  return userId == 13
}
