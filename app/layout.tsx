import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Fragment_Mono } from 'next/font/google';
const fragMono = Fragment_Mono({ subsets: ['latin'], weight: '400' });

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
			<body
				className={`debug-screens ${fragMono.className} no-scrollbar`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
