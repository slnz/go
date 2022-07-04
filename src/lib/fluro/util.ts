export async function handleApiResponse<T = object>(
  response: Response
): Promise<T> {
  const data = await response.json()

  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}
