import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const { userId, ticketId } = body.update;

	if (!userId || !ticketId) {
		return new NextResponse('Missing user id or ticket id', {
			status: 400,
		});
	}

	const ticket = await prisma.ticket.update({
		where: { id: ticketId },
		data: {
			assignedToId: userId,
		},
	});

	prisma.$disconnect();

	return NextResponse.json(ticket);
}
