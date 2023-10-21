import prisma from '@/lib/db';
import { user } from '@nextui-org/react';
import { NextRequest, NextResponse } from 'next/server';
import { use } from 'react';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const { userId, userRole } = body.update;

	if (!userId || !userRole) {
		return new NextResponse('Missing user id or ticket id', {
			status: 400,
		});
	}

	const user = await prisma.user.update({
		where: { id: userId },
		data: {
			role: userRole,
		},
	});

	console.log(user.role, userRole);

	prisma.$disconnect();

	return NextResponse.json(user);
}
