import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),

	debug: process.env.NODE_ENV === 'development',

	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: 'jwt',
	},
	providers: [
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
					user.password,
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
