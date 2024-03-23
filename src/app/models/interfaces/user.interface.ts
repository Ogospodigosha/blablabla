

export interface UserInterfaceResponse {
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
  address: {
    city: string
    geo: {
      lat: string
      lng: string
    }
    street: string
    suite: string
    zipcode: string
  }
}
export interface UserInterface {
  email: string
  id: number
  name: string
  phone: string
  website: string
}
