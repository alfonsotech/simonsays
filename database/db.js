const DATABASE_NAME = 'game-database'

const getData = () => {
  const result = JSON.parse( localStorage.getItem( DATABASE_NAME ))
  return result === undefined || result === null ? { nextId: 1, users: [] } : result
}

const saveData = (data) => {
  localStorage.setItem( DATABASE_NAME, JSON.stringify( data ))
}
const createUser = (username, password) => {
  const { nextId, users } = getData()
  const user = {
    username,
    password,
    id: nextId,
  }
  const data = {
    nextId: nextId + 1,
    users: [ user, ...users ]
  }
  saveData(data)
  return data
}

const getUser = (id) => {
  getData().users.find( (user) => user.id === id )
}

module.exports =  { getData, saveData, createUser, getUser }
