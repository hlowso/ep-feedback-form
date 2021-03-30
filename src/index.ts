import {parse} from './parse-csv'

(async () => {
    const data = await parse('./feedback.csv')
    for (const row of data) {

    }
})()
