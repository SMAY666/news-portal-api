export type UserAttributes = {
    _id: string
    email: string
    passwordHash: string
    isOwner: boolean
    avatar: string
    favorites: string[]
}

export type UserCreationAttributes = Omit<UserAttributes, '_id' | 'passwordHash' | 'favorites' | 'avatar'> & {
    avatar: Express.Multer.File
    password: string
    confirmPassword: string
};
