import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	console.log(body.comment);

	console.log(
		'|ticketID: ' +
			body.comment.ticketId +
			' |userEmail: ' +
			body.comment.createdBy +
			' |body: ' +
			body.comment.body,
	);

	if (
		!body.comment.ticketID ||
		!body.comment.createdBy ||
		!body.comment.body
	) {
		return new NextResponse('Missing ticketID, createdByEmail, or body', {
			status: 400,
		});
	}

	const comment = await prisma.comment.create({
		data: {
			body: body.comment.body,
			ticket: {
				connect: {
					id: body.comment.ticketId,
				},
			},
			createdBy: {
				connect: {
					email: 'cortez.foxx@gmail.com',
				},
			},
		},
	});
	prisma.$disconnect();
	console.log('comment: ' + comment);
	return NextResponse.json(comment);
}
