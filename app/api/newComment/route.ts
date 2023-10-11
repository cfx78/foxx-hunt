import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	console.log(body.comment);

	console.log(
		'|userName: ' +
			body.comment.userName +
			' |userEmail: ' +
			body.comment.userEmail +
			' |body: ' +
			body.comment.body,
		' |ticketId: ' + body.comment.ticketId,
	);

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

	// const comment = await prisma.comment.create({
	// 	data: {
	// 		body: body.comment.body,
	// 		ticket: {
	// 			connect: {
	// 				id: body.comment.ticketId,
	// 			},
	// 		},
	// 		createdBy: {
	// 			connect: {
	// 				email: 'cortez.foxx@gmail.com',
	// 			},
	// 		},
	// 	},
	// });
	prisma.$disconnect();
	console.log('comment: ' + comment);
	return NextResponse.json(comment);
}
