import m, {Component} from 'mithril'
import songs from './songs.json'

type Song = {
    id: string
    name: string
    heard?: boolean
}

type State = {
    songs: Song[]
}

const state:State = {
    songs: (songs as Song[]).map(s => ({...s, heard: false}))
}

const Form:Component = {
    view: vnode => [
        m('h1', "The Bodies' EP Candidates"),
        m('section',
            m('label', "Which songs did you listen to?"),
            state.songs.map(s => [
                m('input', {
                    type:'checkbox',
                    value: s.id,
                    onchange: () => {
                        const song = state.songs.find(song => song === s)!
                        song.heard = !song.heard
                    }
                }),
                s.name
            ])
        ),
        m('section',
            m('label', "Which songs were any good?"),
            state.songs.filter(s => s.heard).map(s => [
                m('input', {
                    type:'checkbox',
                    value: s.id
                }),
                s.name
            ])
        ),
        m('section',
            m('label', "Which song was your favourite?"),
            m('select',
                state.songs.filter(s => s.heard).map(s =>
                    m('option', { value: s.id },
                        s.name
                    )
                )
            )
        ),
        m('section',
            m('label', "Which song was your least favourite?"),
            m('select',
                state.songs.filter(s => s.heard).map(s =>
                    m('option', { value: s.id },
                        s.name
                    )
                )
            )
        ),
        m('section',
            m('label', "Any other feedback would be hugely appreciated!"),
            m('textarea', {name: 'feedback'})
        ),
        m('section',
            m('label', "Send us your email if you'd like to subscribe to our newsletter."),
            m('input', {type: 'email', name: 'email'})
        ),
        m('input', {type: 'submit', value: 'Send'})
    ]
}

// @ts-ignore
m.mount(window.formNode, {view: () => m(Form)})