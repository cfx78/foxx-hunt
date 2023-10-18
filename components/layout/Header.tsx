type HeaderProps = {
	pageTitle: string;
};

const Header = (props: HeaderProps) => {
	return (
		<div className='fixed top-0 right-0 z-10 w-full  max-w-[94vw] py-4 text-4xl font-bold tracking-wider text-center border-l-0 border-8  shadow-2xl bg-primary text-primary-foreground lg:text-start lg:pl-24 lg:py-8 dark:shadow-gray-800 '>
			{props.pageTitle}
		</div>
	);
};

export default Header;
