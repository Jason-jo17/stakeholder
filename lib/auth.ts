import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@prisma/client'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                console.log('Authorize called with:', { email: credentials?.email, passwordLength: credentials?.password?.length })
                if (!credentials?.email || !credentials?.password) {
                    console.log('Missing credentials')
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                console.log('User found:', user ? { id: user.id, email: user.email, hasHash: !!user.passwordHash } : 'No user')

                if (!user || !user.passwordHash) {
                    console.log('User not found or no password hash')
                    return null
                }
                const isPasswordValid = await compare(
                    credentials.password,
                    user.passwordHash
                )

                console.log('Password valid:', isPasswordValid)

                if (!isPasswordValid) {
                    return null
                }
                return {
                    id: user.id + '',
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    randomKey: 'Hey cool'
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }: any) {
            if (session.user) {
                (session.user as any).id = token.id as string
                (session.user as any).role = token.role as UserRole
            }
            return session
        }
    }
}

// Middleware for role-based access
export function requireRole(role: UserRole | UserRole[]) {
    return async (req: NextRequest) => {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.redirect(new URL('/auth/signin', req.url))
        }

        const allowedRoles = Array.isArray(role) ? role : [role]

        if (!allowedRoles.includes((session.user as any).role)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return NextResponse.next()
    }
}
