'use client';
import { Avatar } from '@nextui-org/react';

interface ProfileAvatarProps {
	image?: string;
	role?: string;
}

const ProfileAvatar = (props: ProfileAvatarProps) => {
	const adminRing = () => {
		if (props.role === 'ADMIN') {
			return 'danger';
		} else {
			return 'primary';
		}
	};

	return (
		<div>
			<Avatar
				isBordered
				color={adminRing()}
				showFallback
				src={props.image}
			/>
		</div>
	);
};

export default ProfileAvatar;
