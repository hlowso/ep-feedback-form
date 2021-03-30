import fs from 'fs'
import readline from 'readline'

export const parse = async (path: string) => {
    const array: Array<string[]> = []
    const read = readline.createInterface({
        input: fs.createReadStream(path)
    })
    await new Promise(resolve => {
        read.on('close', resolve)
        read.on('line', line => array.push(line.split(',')))
    })
    return array
}

const trim = (str?:string) => str ? str.substr(1, str.length - 2) : undefined

const value = (str: string, i: number) => {
    switch (i) {
        case 0: return trim(str)!.split('-').map(Number)
        case 1: return parseInt(trim(str)!)
        case 2: return trim(str)!.split('-')
        default: return trim(str)
    }
}

export const clean = (data: Array<string[]>) => {
    const columns = data.shift()!
    const cleanRow = (row: string[]) =>
        row.reduce((obj, curr, i) => {
            if (i < 6)
                obj[trim(columns[i])!] = value(curr, i)
            return obj
        }, {})
    return data.map(cleanRow)
}