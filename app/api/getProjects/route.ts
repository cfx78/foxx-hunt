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
	return NextResponse.json({ projects });
}
