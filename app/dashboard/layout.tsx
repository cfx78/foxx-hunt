import './styles.modules.css';
import type { Metadata } from 'next';
import { Providers } from '../providers';
import { Exo_2 } from 'next/font/google';
import Navigation from '@/components/layout/NavComponents/Navigation';

const exo2 = Exo_2({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'Foxx Hunt',
	description:
		'Discover Foxx Hunt Bug Tracker 🦊🔍: The Ideal Solution for Project Managers. Simplify bug tracking, streamline issue management, and ensure top-quality software. Empower your projects with efficient bug resolution. Experience bug tracking excellence tailored for project managers.',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<body className={`no-scrollbar ${exo2.className}`}>
			<Providers>
				<Navigation />

				<div>{children}</div>
			</Providers>
		</body>
	);
}
