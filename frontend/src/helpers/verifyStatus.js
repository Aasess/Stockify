export const verifyStatus = (status) => {
  if (status === 'failed') {
    return false
  } else if (status === 'success') {
    return true
  }
  return false
}
