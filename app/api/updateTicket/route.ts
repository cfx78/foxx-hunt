import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const { priority, status, userEmail, ticketId, title } = body.update;

	if (!priority || !status || !userEmail || !ticketId || !title) {
		return new NextResponse(
			'Missing priority, status, userEmail, ticketId, or title',
			{
				status: 400,
			},
		);
	}

	const ticket = await prisma.ticket.update({
		where: { id: ticketId },
		data: {
			priority,
			status,
			title,
			assignedTo: {
				connect: { email: userEmail },
			},
		},

		include: {
			assignedTo: {
				where: { email: userEmail },
				select: {
					email: true,
				},
			},
		},
	});

	prisma.$disconnect();

	return NextResponse.json(ticket);
}
