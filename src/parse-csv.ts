import fs from 'fs'
import readline from 'readline'

// export const ips = (path: string) => read(path, (line, array) => {
//     const matches = line.match(ip)
//     if (matches)
//         array.push(matches[0])
// })

// export const results = async (path: string) => clean(
//     await read(path, )
// )

export const parse = async (path: string) => {
    const array: any[] = []
    const read = readline.createInterface({input: fs.createReadStream(path)})
    await new Promise(resolve => {
        read.on('close', resolve)
        read.on('line', line => { 
            const pieces = line.split(';')
            array.push({
                pairing: value(pieces[0], 0),
                preferred: value(pieces[1], 1),
                ip: pieces[2]
            })
        })
    })
    // const set = new Set(array.map(arr => JSON.stringify(arr)))
    // const unique: Array<string[]> = []
    // set.forEach(json => unique.push(JSON.parse(json)))
    return array
}


const value = (str: string, i: number) => {
    switch (i) {
        case 0: return str.split('-').map(Number)
        case 1: return parseInt(str!)
        case 2: return str.split('-')
        default: return str
    }
}

// const clean = (data: Array<string[]>) => {
//     const set = new Set(data.map(arr => JSON.stringify(arr)))
//     const unique: Array<string[]> = []
//     set.forEach(json => unique.push(JSON.parse(json)))
//     const columns = unique.shift()!
//     const cleanRow = (row: string[]) =>
//         row.reduce((obj, curr, i) => {
//             if (i < 6)
//                 obj[columns[i]!] = value(curr, i)
//             return obj
//         }, {})
//     return unique.map(cleanRow)
// }

const ip = /\d+\.\d+\.\d+\.\d+/
