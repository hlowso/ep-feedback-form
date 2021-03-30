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