import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),

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
				const user = {
					id: '1',
					name: 'John Doe',
					email: 'test@test.com',
				};
				return user;
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
