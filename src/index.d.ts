export class PerfexClient {
	constructor(config: {
		baseUrl: string;
		apiKey: string;
		apiToken: string;
	});

	clients: {
		create(data: any): Promise<any>;
		delete(id: string): Promise<any>;
		get(id: string): Promise<any>;
		list(): Promise<any>;
		update(id: string, data: any): Promise<any>;
	};

	contacts: {
		create(data: any): Promise<any>;
		delete(id: string): Promise<any>;
		get(id: string): Promise<any>;
		list(): Promise<any>;
		update(id: string, data: any): Promise<any>;
	};

	leads: {
		create(data: any): Promise<any>;
		delete(id: string): Promise<any>;
		get(id: string): Promise<any>;
		list(): Promise<any>;
		update(id: string, data: any): Promise<any>;
	};

	projects: {
		create(data: any): Promise<any>;
		delete(id: string): Promise<any>;
		get(id: string): Promise<any>;
		list(): Promise<any>;
		update(id: string, data: any): Promise<any>;
	};

	tasks: {
		create(data: any): Promise<any>;
		delete(id: string): Promise<any>;
		get(id: string): Promise<any>;
		list(): Promise<any>;
		update(id: string, data: any): Promise<any>;
	};

	invoices: {
		create(data: any): Promise<any>;
		delete(id: string): Promise<any>;
		get(id: string): Promise<any>;
		list(): Promise<any>;
		update(id: string, data: any): Promise<any>;
	};
} 