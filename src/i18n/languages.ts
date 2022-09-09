export interface Language {
    code: string,
    nativeName: string
}

const languages: Language[] = [
    {
        code: "en",
        nativeName: "English"
    },

    {
        code: "fr",
        nativeName: "Français"
    },

    {
        code: "de",
        nativeName: "Deutsch"
    },
]

export default languages