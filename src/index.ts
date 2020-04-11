import KeyholeClient from './lib/keyhole'

export default (token: string) => new KeyholeClient(token)