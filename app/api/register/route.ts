import bcrypt from 'bcrypt';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { name, email, password } = body.data;
	console.log(
		'|name: ' + name + ' |email: ' + email + ' |password: ' + password,
	);

	if (!name || !email || !password) {
		return new NextResponse('Missing name, email or password', {
			status: 400,
		});
	}

	const emailExists = await prisma.user.findUnique({ where: { email } });
	if (emailExists) {
		return new NextResponse('Email already exists', { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});
	console.log(user);
	return NextResponse.json(user);
}
