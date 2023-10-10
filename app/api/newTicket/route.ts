import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();

	console.log(
		'|title: ' +
			body.data.title +
			' |userID: ' +
			body.data.userID +
			' |project: ' +
			body.data.project,
		' |body: ' + body.data.body,
		' |priority: ' + body.data.priority,
		' |type: ' + body.data.type,
	);

	if (
		!body.data.project ||
		!body.data.title ||
		!body.data.userID ||
		!body.data.body ||
		!body.data.priority ||
		!body.data.type
	) {
		return new NextResponse('Missing project, title, userID, or body', {
			status: 400,
		});
	}

	const ticket = await prisma.ticket.create({
		data: {
			title: body.data.title,
			createdBy: {
				connect: { id: body.data.userID },
			},
			project: {
				connect: { name: body.data.project },
			},
			body: body.data.body,
			priority: body.data.priority,
			type: body.data.type,
		},
	});
	console.log(ticket);
	return NextResponse.json(ticket);
}
