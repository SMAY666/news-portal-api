export type UserAttributes = {
    _id: string
    email: string
    passwordHash: string
    isOwner: boolean
    avatar: string
    favorites: string[]
}

export type UserCreationAttribute = Omit<UserAttributes, '_id' | 'passwordHash'> & {
    password: string
};
