import './styles.modules.css';
import CreateProject from '@/components/layout/ProjectComponents/CreateProject';
import ProjectsTable from '@/components/layout/ProjectComponents/ProjectTableComponents/ProjectsTable';
import Header from '@/components/layout/Header';
import ProjectsPageFunctions from '@/lib/ServerComponentFunctions/MainPages/ProjectsPageFunctions';

const Projects = async () => {
	const data = await ProjectsPageFunctions();

	return (
		<div className='projects-container'>
			<Header pageTitle='Projects' />
			<main>
				{data.userRole === 'ADMIN' && <CreateProject />}
				<ProjectsTable />
			</main>
		</div>
	);
};

export default Projects;
