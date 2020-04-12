import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import createClient from '../src/index'
import { Hash, Tracker } from '../src/lib/types'
 
const mock = new MockAdapter(axios)
const getMockTracker = (hash: Hash): Tracker => {
    return {
        hash: hash,
        volume: 1,
        search_terms: ['#test', '#hashtag'],
        platforms: ['twitter'],
    }
}

describe('Keyhole class', () => {
    const client = createClient('access_token')

    test('getTracker returns proper tracker', async () => {
        const testTracker = getMockTracker('abc')

        mock.onGet('/trackers/abc').replyOnce(200, {
            data: testTracker
        })

        expect(await client.getTracker('abc')).toStrictEqual(testTracker)
    })

    test('getTrackers return proper trackers', async () => {
        const testTrackers = [getMockTracker('1'), getMockTracker('2')]

        mock.onGet('/trackers').replyOnce(200, {
            results: { trackers: testTrackers }
        })

        expect(await client.getTrackers()).toStrictEqual(testTrackers)
    })

    test('pauseTracker should pause', async () => {
        mock.onPut('/trackers/abc/pause').replyOnce(200)

        expect(await client.pauseTracker('abc')).toBe(undefined)
    })

    test('pauseTracker should start', async () => {
        mock.onPut('/trackers/abc/start').replyOnce(200)

        expect(await client.startTracker('abc')).toBe(undefined)
    })

    test('deleteTracker should delete', async () => {
        mock.onDelete('/trackers/abc').replyOnce(200)

        expect(await client.deleteTracker('abc')).toBe(undefined)
    })

    test('createTracker should createTracker', async () => {
        mock.onPost('/trackers').replyOnce(200, {data: {
                hash: 'abc'
            }
        })

        expect(await client.createTracker(['#test'], ['twitter'])).toBe('abc')
    })
})

describe('Errors', () => {
    const client = createClient('access_token')

    test('request fails with NotFoundError when tracker not found', async () => {
        mock.onGet('/trackers/abc').replyOnce(404)

        return client.getTracker('abc').catch(e => {
            expect(e.message).toEqual('Not found')
        })
    })

    test('request fails with NotAuthenticated on 401', async () => {
        mock.onGet('/trackers/abc').replyOnce(401)

        return client.getTracker('abc').catch(e => {
            expect(e.message).toEqual('Not authenticated')
        })
    })

    test('request fails with MissingParameter when on 400', async () => {
        mock.onGet('/trackers/abc').replyOnce(400, { message: 'Missing parameter' })

        client.getTracker('abc').catch(e => {
            expect(e.message).toEqual('Missing parameter')
        })
    })

    test('request fails with InternalServerError when on 500', async () => {
        mock.onGet('/trackers/abc').replyOnce(500, { message: 'Server failed' })

        client.getTracker('abc').catch(e => {
            expect(e.message).toEqual('Server failed')
        })
    })

    test('request fails with Error when on other http code', async () => {
        mock.onGet('/trackers/abc').replyOnce(501, { message: 'Other failure' })

        client.getTracker('abc').catch(e => {
            expect(e.message).toEqual('Other failure')
        })
    })
})
