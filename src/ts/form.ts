import {Song} from './types'
import m, {Component} from 'mithril'
import songs from '../songs.json'
import { getPairing } from './random'
import classnames from 'classnames'

type State = { songs?: [Song, Song], details: boolean }

const history = JSON.parse(localStorage.getItem('history') || '[]')
const pairing = getPairing(songs.length, history)
const state: State = {
    songs: pairing
        ? [
            songs.find(s => s.id === pairing[0])!,
            songs.find(s => s.id === pairing[1])!]
        : undefined,
    details: false
}

const flip = (i: number) => (i+1) % 2

const Form: Component = {
    view: vnode =>
        state.songs
            ? m('form', {name: 'feedback', method: 'POST', 'data-netlify': true},
                m('input', {type: 'hidden', name: 'form-name', value: 'feedback'}),
                m('h1', "Which song is better???"),
                m('.songs',
                    [0, 1].map(i =>
                        m('.card', {class: classnames({selected: state.songs![i].selected, playing: state.songs![i].playing})},
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
                                    checked: state.songs![i].selected,
                                    onchange: () => {
                                        state.songs![flip(i)].selected = false
                                        state.songs![i].selected = true
                                    }
                                }),
                                "This one's better",
                                m('img', {src: 'static/images/done_white_24dp.svg'})
                            )
                        )
                    )
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
                            m('label',
                                m('input', {type: 'checkbox', name: 'improvement', value: 'vocals'}),
                                'Vocals'
                            ),
                            m('label',
                                m('input', {type: 'checkbox', name: 'improvement', value: 'lyrics'}),
                                'Lyrics'
                            ),
                            m('label',
                                m('input', {type: 'checkbox', name: 'improvement', value: 'melody'}),
                                'Melody'
                            ),
                            m('label',
                                m('input', {type: 'checkbox', name: 'improvement', value: 'harmony'}),
                                'Chords / Harmony'
                            ),
                            m('label',
                                m('input', {type: 'checkbox', name: 'improvement', value: 'rhythm'}),
                                'Rhythm'
                            ),
                            m('label',
                                m('input', {type: 'checkbox', name: 'improvement', value: 'sound'}),
                                'Sound Quality'
                            ),
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
                    disabled: !state.songs![0].selected && !state.songs![1].selected,
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