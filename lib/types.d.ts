type TicketInformation = {
	id: string;
	title: string;
	status: string;
	priority: string;
	type: string;
	body: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: {
		name: string | null;
		email: string;
	};
	assignedTo:
		| {
				name: string | null | undefined;
				email: string | null | undefined;
		  }
		| null
		| undefined;
	project: {
		name: string;
	};
	comments: {
		body: string;
		userName: string;
		userEmail: string;
		createdAt: Date;
	}[];
};

type UserInformation = {
	id: string;
	name: string | null;
	email: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
	ticketsCreated: {
		id: string;
		title: string;
		status: string;
		priority: string;
		type: string;
		createdAt: Date;
		updatedAt: Date;
	}[];
	ticketsAssigned: {
		id: string;
		title: string;
		status: string;
		priority: string;
		type: string;
		createdAt: Date;
		updatedAt: Date;
		project: string;
	}[];
	projects: {
		id: string;
		name: string;
	}[];
};

type ProjectInformation = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	tickets: {
		id: string;
		title: string;
		status: string;
		priority: string;
		type: string;
		createdAt: Date;
		updatedAt: Date;
	}[];
	users: {
		id: string;
		name: string | null;
		email: string;
		role: string;
		createdAt: Date;
		updatedAt: Date;
	}[];
};
