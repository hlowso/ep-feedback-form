import {Song} from './types'
import m, {Component} from 'mithril'
import songs from '../songs.json'
import { getPairing } from './random'
import classnames from 'classnames'

type State = { songs?: [Song, Song], details: boolean, selected?: number }

const history = JSON.parse(localStorage.getItem('history') || '[]')
const pairing = getPairing(songs.length, history)
const state: State = {
    songs: pairing
        ? [
            songs.find(s => s.id === pairing[0])!,
            songs.find(s => s.id === pairing[1])!]
        : undefined,
    selected: undefined,
    details: false
}

const flip = (i: number) => (i+1) % 2

const Form: Component = {
    view: vnode =>
        state.songs
            ? m('form', {name: 'feedback', method: 'POST', 'data-netlify': true},
                m('input', {type: 'hidden', name: 'form-name', value: 'feedback'}),
                m('input', {type: 'hidden', name: 'pairing', value: JSON.stringify(state.songs ? state.songs.map(s => ({id: s.id, name: s.name})) : [])}),
                m('.card',
                    m('h1', "Which song is better?"),
                    m('.songs',
                        [0, 1].map(i =>
                            m('.card', {class: classnames({selected: state.selected === i, playing: state.songs![i].playing})},
                                m('h2', state.songs![i].name),
                                m('span', 'playing'),
                                m('audio', {
                                    id: `audio${i}`,
                                    controls: true,
                                    type: 'audio/mpeg',
                                    onpause: () => state.songs![i].playing = false,
                                    onplay: () => {
                                        const other = document.querySelector(`#audio${flip(i)}`) as HTMLAudioElement
                                        other.pause()
                                        state.songs![i].playing = true
                                    }},
                                    m('source', {src: `static/MP3/${state.songs![i].name.replace(/\s/g, '-')}.mp3`})
                                ),
                                m('label.button',
                                    m('input', {
                                        type: 'radio', 
                                        name: 'preferred', 
                                        value: state.songs![i].id,
                                        checked: state.selected === i,
                                        onchange: () => {
                                            state.selected = i
                                        }
                                    }),
                                    "This one's better",
                                    m('img', {src: 'static/images/done_white_24dp.svg'})
                                )
                            )
                        ),
                    ),
                    m('label.button', {class: classnames('equal', {selected: state.selected === -1})},
                        m('input', {
                            type: 'radio', 
                            name: 'preferred', 
                            value: -1,
                            checked: state.selected === -1,
                            onchange: () => state.selected = -1
                        }),
                        "They're about the same",
                        m('img', {src: 'static/images/done_white_24dp.svg'})
                    ),
                ),
                !state.details
                    ? m('span', { onclick: () => state.details = true },
                        "More thoughts?"
                    )
                    : m('.details', {class: 'card'},
                        m('h2', 'Additional Thoughts'),
                        m('span', "This section is optional"),
                        m('.question',
                            m('span', "What about the songs needs improvement? Check all that apply"),
                            [['vocals', 'Vocals'],
                             ['lyrics', 'Lyrics'],
                             ['melody', 'Melody'],
                             ['harmony', 'Chords / Harmony'],
                             ['rhythm', 'Rhythm'],
                             ['sound', 'Sound Quality']].map(area =>
                                m('label',
                                    m('input', {type: 'checkbox', name: 'improve[]', value: area[0]}),
                                    area[1]
                                )
                            )
                        ),
                        m('.question',
                            m('span', "Any other comments?"),
                            m('textarea', {name: 'comments', rows: 8})
                        ),
                        m('.question',
                            m('span', "Send us your email address if you'd like to hear more about our EP"),
                            m('input', {type: 'email', name: 'email', placeholder: 'your.email@example.com'})
                        )
                    ),
                m('input.button', {
                    type: 'submit',
                    value: 'Send',
                    disabled: state.selected === undefined,
                    onclick: () => {
                        const entry = [state.songs![0].id, state.songs![1].id]
                        history.push(entry.sort().reverse())
                        localStorage.setItem('history', JSON.stringify(history))
                    }
                })
            )
            : "Thanks for all the help!"
}

m.mount(window.formNode, {view: () => m(Form)})