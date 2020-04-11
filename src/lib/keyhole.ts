import { AxiosInstance } from 'axios'
import createClient from './client'
import {Tracker, Hash, Platform } from './types'

export default class Keyhole {
    private client: AxiosInstance

    constructor(accessToken: string) {
        this.client = createClient(accessToken)
    }

    public async getTrackers(): Promise<Tracker[]> {
        const res =  await this.client.get('/trackers')
        return res.data.results.trackers
    }

    public async getTracker(hash: Hash): Promise<Tracker> {
        const res = await this.client.get(`/trackers/${hash}`)
        return res.data.data
    }

    public async createTracker(
        searchTerms: string[],
        platforms: Platform[],
        usernames?: {[key: string]: string[]}, // key: Platform
        countryLocations: string[] = [],
        language?: string[]
    ): Promise<Hash> {
        const res = await this.client.post('/trackers', {
            search_terms: searchTerms.join(),
            platforms: platforms.join(),
            country_locations: countryLocations.join(),
            usernames: JSON.stringify(usernames),
            language
        })

        return res.data.data.hash
    }

    public async startTracker(hash: Hash): Promise<void> {
        await this.client.put(`/trackers/${hash}/start`)
    }

    public async pauseTracker(hash: Hash): Promise<void> {
        await this.client.put(`/trackers/${hash}/pause`)
    }

    public async deleteTracker(hash: Hash): Promise<void> {
        await this.client.delete(`/trackers/${hash}`)
    }
}