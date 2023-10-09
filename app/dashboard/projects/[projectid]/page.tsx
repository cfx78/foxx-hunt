import prisma from '@/lib/db';

type ProjectPageParams = {
	params: {
		projectid: string;
	};
};

const ProjectPage = async ({ params: { projectid } }: ProjectPageParams) => {
	const project = await prisma.project.findUnique({
		where: {
			id: projectid,
		},
	});

	return (
		<div className='w-full h-screen py-24'>
			<h1>{project?.name}</h1>
		</div>
	);
};

export async function generateStaticParams() {
	const projects = await prisma.project.findMany();

	return projects.map((project) => ({
		projectid: project.id,
	}));
}

export const revalidate = 3600;

export default ProjectPage;
