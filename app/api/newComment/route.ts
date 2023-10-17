import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();

	if (
		!body.comment.userName ||
		!body.comment.userEmail ||
		!body.comment.body
	) {
		return new NextResponse('Missing ticketID, createdByEmail, or body', {
			status: 400,
		});
	}

	const comment = await prisma.ticket.update({
		where: { id: body.comment.ticketId },

		data: {
			comments: {
				push: {
					body: body.comment.body,
					userName: body.comment.userName,
					userEmail: body.comment.userEmail,
				},
			},
		},
	});

	prisma.$disconnect();
	return NextResponse.json(comment);
}
