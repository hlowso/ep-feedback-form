import {Result} from './types'
import fs from 'fs'
import readline from 'readline'

export const parse = async (path: string) => {
    const array: Result[] = []
    const read = readline.createInterface({input: fs.createReadStream(path)})
    await new Promise(resolve => {
        read.on('close', resolve)
        read.on('line', line => { 
            const pieces = line.split(';')
            array.push({
                pairing: value(pieces[0], 0) as [number, number],
                preferred: value(pieces[1], 1) as number,
                ip: pieces[2]
            })
        })
    })
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

const ip = /\d+\.\d+\.\d+\.\d+/
