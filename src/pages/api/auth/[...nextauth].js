import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: '1089901392805-vlss6keef8ftvsf6n97nb5fsklbtjgs8.apps.googleusercontent.com',
            clientSecret: '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',
        }),
        // ...add more providers here
    ],
}

export default NextAuth(authOptions)
