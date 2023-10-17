export type RequiredProperty<Type, Keys extends keyof Type> = Type & {
    [Property in Keys]-?: Type[Property]
}
