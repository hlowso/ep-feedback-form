declare global {
    interface Window {
        formNode: HTMLDivElement
    }
}

export type Song = {
    id: number
    name: string
    selected?: boolean
    playing?: boolean
}

