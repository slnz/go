import Fluro, { User } from 'fluro'

export const client = new Fluro()

function userUpdated(user?: User): void {
  if (user) {
    window.localStorage.setItem('user', JSON.stringify(user))
  } else {
    window.localStorage.removeItem('user')
  }

  client.stats.refresh()
}

client.auth.addEventListener('change', userUpdated)

const user = window.localStorage.getItem('user')

if (user) {
  client.auth.set(JSON.parse(user))
}
