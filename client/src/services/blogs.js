import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (oldObject, newObject) => {
  const id = oldObject.id
  const urlToBechanged = `${baseUrl}/${id}`

  const response = await axios.put(urlToBechanged, newObject)
  return response.data
}

const deleteBlog = (objectToDelete) => {
  return axios.delete(objectToDelete)
}

export default { getAll, create, setToken, update, deleteBlog }