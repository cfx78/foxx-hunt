import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { userId, project } = body.update;

	if (!userId || !project) {
		return new NextResponse('Missing user id or project id', {
			status: 400,
		});
	}

	const projectToUpdate = await prisma.project.update({
		where: { name: project as string },
		data: {
			users: {
				connect: {
					id: userId,
				},
			},
		},
	});

	prisma.$disconnect();

	return NextResponse.json(project);
}
