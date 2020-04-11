export type Platform = 'twitter' | 'instagram' | 'facebook' | 'news' | 'blogs' | 'forums'

export type Hash = string

export type Tracker = {
    hash: Hash,
    volume: number
    search_terms: string[]
    platforms: Platform[]
    status?: 'running' | 'paused'
    country_locations?: string[]
    language?: string
}