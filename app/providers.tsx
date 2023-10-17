'use client';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <>{children}</>;
	}
	return (
		<NextUIProvider>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				{children}
			</ThemeProvider>
		</NextUIProvider>
	);
}
