export interface IPerfexConfig {
	baseUrl: string;
	apiKey: string;
	apiToken: string;
}

export interface IPerfexClient {
	id: number;
	company: string;
	vat?: string;
	phonenumber?: string;
	country?: string;
	city?: string;
	zip?: string;
	state?: string;
	address?: string;
	datecreated: string;
	active: number;
}

export interface IPerfexContact {
	id: number;
	userid: number;
	firstname: string;
	lastname: string;
	email: string;
	phonenumber?: string;
	title?: string;
	is_primary: number;
	active: number;
}

export interface IPerfexLead {
	id: number;
	name: string;
	source: number;
	status: number;
	email?: string;
	phonenumber?: string;
	company?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	zip?: string;
}

export interface IPerfexProject {
	id: number;
	name: string;
	clientid: number;
	billing_type: number;
	status: number;
	start_date?: string;
	deadline?: string;
	description?: string;
	members?: number[];
}

export interface IPerfexTask {
	id: number;
	name: string;
	description?: string;
	priority: number;
	status: number;
	startdate?: string;
	duedate?: string;
	project_id?: number;
	assignees?: number[];
}

export interface IPerfexInvoiceItem {
	description: string;
	long_description?: string;
	qty: number;
	rate: number;
	unit?: string;
	order?: number;
}

export interface IPerfexInvoice {
	id: number;
	clientid: number;
	date: string;
	duedate: string;
	currency: number;
	status: number;
	items: IPerfexInvoiceItem[];
}

export interface IPerfexResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export interface IPerfexListResponse<T> {
	success: boolean;
	data: T[];
	total: number;
	message?: string;
}

export interface IPerfexResource<T> {
	create(data: Partial<T>): Promise<IPerfexResponse<T>>;
	delete(id: number | string): Promise<IPerfexResponse<T>>;
	get(id: number | string): Promise<IPerfexResponse<T>>;
	list(): Promise<IPerfexListResponse<T>>;
	update(id: number | string, data: Partial<T>): Promise<IPerfexResponse<T>>;
}

export class PerfexClient {
	constructor(config: IPerfexConfig);

	clients: IPerfexResource<IPerfexClient>;
	contacts: IPerfexResource<IPerfexContact>;
	leads: IPerfexResource<IPerfexLead>;
	projects: IPerfexResource<IPerfexProject>;
	tasks: IPerfexResource<IPerfexTask>;
	invoices: IPerfexResource<IPerfexInvoice>;
} 