export const generateNextId = () => {
  const timestamp = Date.now().toString(16)
  const randomString = Math.random().toString(16).substring(2, 16)

  return timestamp + randomString
}
