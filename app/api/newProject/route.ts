import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const name = body.createProject as string;
	console.log('|Project Name: ' + name);

	if (!name) {
		return new NextResponse('Missing name', {
			status: 400,
		});
	}

	const projectExists = await prisma.project.findUnique({ where: { name } });

	if (projectExists) {
		return new NextResponse('Project already exists', { status: 400 });
	}

	const project = await prisma.project.create({
		data: {
			name,
		},
	});
	prisma.$disconnect();
	console.log(project);
	return NextResponse.json(project);
}
