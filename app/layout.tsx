import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Khand } from 'next/font/google';

const khand = Khand({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'Foxx Hunt',
	description:
		'Discover Foxx Hunt Bug Tracker 🦊🔍: The Ideal Solution for Project Managers. Simplify bug tracking, streamline issue management, and ensure top-quality software. Empower your projects with efficient bug resolution. Experience bug tracking excellence tailored for project managers.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${khand.className} no-scrollbar`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
