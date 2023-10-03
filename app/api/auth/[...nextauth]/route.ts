import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),

	debug: process.env.NODE_ENV === 'development',

	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),

		Github({
			clientId: process.env.GITHUB_CLIENT as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),

		CredentialsProvider({
			name: 'credentials',
			credentials: {
				name: {
					label: 'Name',
					type: 'text',
					placeholder: 'Name',
				},
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Email',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					return null;
				}

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password as string,
				);

				if (!isValid) {
					return null;
				}

				return user;
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
