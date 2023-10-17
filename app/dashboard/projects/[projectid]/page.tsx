import './styles.modules.css';
import Header from '@/components/layout/Header';
import CreateTicket from '@/components/layout/TicketComponents/CreateTicket';
import ProjectTicketsTable from '@/components/layout/TicketComponents/ProjectTicketsTableComponents/ProjectTicketsTable';
import {
	ProjectPageFunctions,
	ProjectPageFunctionsProps,
} from '@/lib/ServerComponentFunctions/DynamicPages/ProjectPageFunctions';
import prisma from '@/lib/db';

type ProjectPageParams = {
	params: {
		projectid: string;
	};
};

const ProjectPage = async ({ params: { projectid } }: ProjectPageParams) => {
	const props: ProjectPageFunctionsProps = {
		projectid,
	};

	const data = await ProjectPageFunctions(props);
	return (
		<div className='project-container'>
			<Header pageTitle={data.project?.name as string} />
			<main>
				<CreateTicket
					userID={data.user?.id as string}
					projectName={data.project?.name as string}
					projects={data.projectNames as []}
				/>
				<h2 className='py-5 text-4xl text-center'>
					{`'${data.project?.name}'`} Tickets
				</h2>

				<ProjectTicketsTable
					ticketsArray={data.project?.tickets as []}
				/>
			</main>
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
