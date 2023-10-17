export type UserAttributes = {
    _id: string
    email: string
    passwordHash: string
    isOwner: boolean
    avatar: Express.Multer.File
    favorites: string[]
}

export type UserCreationAttributes = Omit<UserAttributes, '_id' | 'passwordHash' | 'favorites'> & {
    password: string
    confirmPassword: string
};
