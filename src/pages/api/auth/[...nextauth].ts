import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, signInWithGoogle } from "@/services/auth";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await signIn(email);
                if (user) {
                    const passwordConfirm = await compare(
                        password,
                        user.password
                    );
                    if (passwordConfirm) {
                        return user;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials") {
                token.fullname = user.fullname;
                token.email = user.email;
                token.phone = user.phone;
                token.role = user.role;
            }

            if (account?.provider === "google") {
                const userData = {
                    fullname: user.name,
                    email: user.email,
                    type: "google",
                };

                await signInWithGoogle(userData, (data: any) => {
                    token.fullname = data.fullname;
                    token.email = data.email;
                    token.role = data.role;
                });
            }
            
            return token;
        },

        async session({ session, token }: any) {
            if ("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("phone" in token) {
                session.user.phone = token.phone;
            }
            if ("role" in token) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);
