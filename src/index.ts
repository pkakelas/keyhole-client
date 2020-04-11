import KeyholeClient from './lib/keyhole'

module.exports = (token: string) => new KeyholeClient(token)
