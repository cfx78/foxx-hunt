import './styles.modules.css';
import type { Metadata } from 'next';
import { Providers } from '../providers';
import { Barlow } from 'next/font/google';
import Navigation from '@/components/layout/NavComponents/Navigation';
const barlow = Barlow({ subsets: ['latin'], weight: '400' });

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
		<body className={`no-scrollbar ${barlow.className} tracking-widest`}>
			<Providers>
				<Navigation />

				<div>{children}</div>
			</Providers>
		</body>
	);
}
