import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
	const projects = await prisma.project.findMany({
		include: {
			tickets: true,
		},

		orderBy: {
			updatedAt: 'desc',
		},
	});
	prisma.$disconnect();
	console.log('From The Api Route' + JSON.stringify(projects));
	return NextResponse.json({ projects });
}
