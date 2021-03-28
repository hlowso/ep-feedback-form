import {Song} from './types'
import m, {Component} from 'mithril'
import songs from '../songs.json'
import { getPairing } from './random'

type State = { songs?: [Song, Song] }

const history = JSON.parse(localStorage.getItem('history') || '[]')
const pairing = getPairing(songs.length, history)
const state: State = {
    songs: pairing
        ? [
            songs.find(s => s.id === pairing[0])!,
            songs.find(s => s.id === pairing[1])!]
        : undefined
}

const f = (i: number) => (i+1) % 2

const Form: Component = {
    view: vnode =>
        state.songs
            ? m('form', {name: 'feedback', method: 'POST', 'data-netlify': true},
                m('input', {type: 'hidden', name: 'form-name', value: 'feedback'}),
                m('h1', "Fountain Dimes EP"),
                m('.songs',
                    [0, 1].map(i =>
                        m('.card', {class: state.songs![i].selected ? 'selected' : ''},
                            m('h2', state.songs![i].name),
                            m('audio', {
                                id: `audio${i}`,
                                controls: true,
                                type: 'audio/mpeg',
                                onplay: () => {
                                    const other = document.querySelector(`#audio${f(i)}`) as HTMLAudioElement
                                    other.pause()
                                }},
                                m('source', {src: `static/MP3/${state.songs![i].name.replace(/\s/g, '-')}.mp3`})
                            ),
                            m('label.button',
                                m('input', {
                                    type: 'radio', 
                                    name: 'preferred', 
                                    value: state.songs![i].id,
                                    checked: state.songs![i].selected,
                                    onchange: () => {
                                        state.songs![f(i)].selected = false
                                        state.songs![i].selected = true
                                    }
                                }),
                                "This one's better",
                                m('img', {src: 'static/images/done_white_24dp.svg'})
                            )
                        )
                    )
                ),
                m('input.button', {type: 'submit', value: 'Send', onclick: () => alert('submitting!')})
            )
            : "Thanks for all the help!"
}

m.mount(window.formNode, {view: () => m(Form)})