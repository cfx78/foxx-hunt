type HeaderProps = {
	pageTitle: string;
};

const Header = (props: HeaderProps) => {
	return (
		<div className='w-full bg-primary top-0 py-4 fixed text-center text-4xl text-primary-50 rounded-b shadow-2xl font-bold tracking-wider lg:text-start lg:pl-24 lg:py-8 z-10 '>
			{props.pageTitle}
		</div>
	);
};

export default Header;
