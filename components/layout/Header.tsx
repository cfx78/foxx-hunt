type HeaderProps = {
	pageTitle: string;
};

const Header = (props: HeaderProps) => {
	return (
		<div className='fixed top-0 z-10 w-full py-4 text-4xl font-bold tracking-wider text-center border-b-8 rounded-br shadow-2xl bg-primary text-primary-foreground lg:text-start lg:pl-24 lg:py-8 dark:shadow-gray-800 '>
			{props.pageTitle}
		</div>
	);
};

export default Header;
