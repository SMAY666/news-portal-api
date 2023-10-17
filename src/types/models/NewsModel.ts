import {ThemeEnum} from '@interfaces/models/newsModel';


export type NewsAttributes = {
    createdAt: Date
    theme: ThemeEnum
    coverPaths: string[]
    title: string
    test: string
    reactions: {
        like: number
        dislike: number,
        poop: number
    }
    favouritesCount: number
}
