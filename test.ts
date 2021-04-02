import {E} from './src/elo'
import {getPairing} from './src/random'

console.log(E(900, 800).toFixed(2) === '0.64')

const songs = [
    {id:0,name:'luck',score:0},
    {id:1,name:'foobar',score:0},
    {id:2,name:'',score:0}
]

console.log(getPairing(songs, [[1,0],[2,0],[2,1]]) === null)
console.log(getPairing(songs, [[1,0],[2,0]])![0] === 2)