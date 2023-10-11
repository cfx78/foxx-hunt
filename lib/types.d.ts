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
		id: number;
		body: string;
		createdAt: Date;
		createdBy: {
			name: string | null;
			email: string;
		};

		createdByUserEmail: string;
	}[];
};
