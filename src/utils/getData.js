export async function getData (url) {
  try {
    const response = await fetch(url)
    const results = await response.json()

    return results
  } catch (error) {
    console.log(error)
    return error
  }
}
