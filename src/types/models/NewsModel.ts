import {ThemeEnum} from '@interfaces/models/newsModel';


export type NewsAttributes = {
    _id: string
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

export type NewsCreationAttribute = Omit<NewsAttributes, '_id' | 'createdAt' | 'reactions'>
