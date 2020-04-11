import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import * as Error from './errors'

export default (accessToken: string) => {
    const instance = axios.create({
        baseURL: 'https://api.keyhole.co/hashtag-tracking/v2.2',
    })

    instance.interceptors.request.use(config => setAccessToken(config, accessToken))
    instance.interceptors.response.use(r => r , handleResponseErrors)

    return instance
}

const setAccessToken = (config: AxiosRequestConfig, accessToken: string) => {
    if (config.method === 'get' || config.method === 'delete') {
        config.params = config.params || {}
        config.params.access_token = accessToken
    }
    else {
        config.data = config.data || {}
        config.data.access_token = accessToken
    }

    return config
}

const handleResponseErrors = (error: any) => {
    switch (error.response.status) {
        case 401:
            throw new Error.NotAuthenticatedError()
        case 404:
            throw new Error.NotFoundError()
        case 400:
            throw new Error.MissingParameterError(error.response.data.message)
        case 500:
            throw new Error.InternalServerError(error.response.data.message)
        default:
            throw error
    }
}