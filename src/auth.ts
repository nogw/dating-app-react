const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (localStorage.getItem('jwt')) {
      const token: any = localStorage.getItem('jwt')
      return JSON.parse(token)
    }
    else {
      return false
    }
  },

  authenticate(jwt: any, cb: any) {
    if (typeof window !== "undefined")
      localStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },

  clearJWT(cb: any) {
    if (typeof window !== "undefined")
      localStorage.removeItem('jwt')
    cb()
  }
}

export default auth