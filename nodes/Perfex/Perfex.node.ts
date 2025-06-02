import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	INode,
	INodeParameters,
} from 'n8n-workflow';

import {
	PerfexClient,
	IPerfexClient,
	IPerfexContact,
	IPerfexLead,
	IPerfexProject,
	IPerfexTask,
	IPerfexInvoice,
	IPerfexInvoiceItem,
	IPerfexResponse,
	IPerfexListResponse,
} from '../../src/types';

type ProjectInputData = Omit<Partial<IPerfexProject>, 'members'> & {
	members?: string;
};

type TaskInputData = Omit<Partial<IPerfexTask>, 'assignees'> & {
	assignees?: string;
};

type InvoiceInputData = Omit<Partial<IPerfexInvoice>, 'items'> & {
	items?: string;
};

interface IPerfexExecuteFunctions extends IExecuteFunctions {
	handleClientOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexClient> | IPerfexListResponse<IPerfexClient>>;
	handleContactOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexContact> | IPerfexListResponse<IPerfexContact>>;
	handleLeadOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexLead> | IPerfexListResponse<IPerfexLead>>;
	handleProjectOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexProject> | IPerfexListResponse<IPerfexProject>>;
	handleTaskOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexTask> | IPerfexListResponse<IPerfexTask>>;
	handleInvoiceOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexInvoice> | IPerfexListResponse<IPerfexInvoice>>;
}

export class Perfex implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Perfex CRM',
		name: 'perfex',
		icon: 'file:perfex.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interagir com o Perfex CRM através do módulo WON API',
		defaults: {
			name: 'Perfex CRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'perfexApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Cliente',
						value: 'client',
					},
					{
						name: 'Contato',
						value: 'contact',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Projeto',
						value: 'project',
					},
					{
						name: 'Tarefa',
						value: 'task',
					},
					{
						name: 'Fatura',
						value: 'invoice',
					},
				],
				default: 'client',
			},
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'client',
							'contact',
							'lead',
							'project',
							'task',
							'invoice',
						],
					},
				},
				options: [
					{
						name: 'Criar',
						value: 'create',
						description: 'Criar um novo registro',
						action: 'Criar um novo registro',
					},
					{
						name: 'Excluir',
						value: 'delete',
						description: 'Excluir um registro',
						action: 'Excluir um registro',
					},
					{
						name: 'Obter',
						value: 'get',
						description: 'Obter um registro por ID',
						action: 'Obter um registro por ID',
					},
					{
						name: 'Listar',
						value: 'list',
						description: 'Listar todos os registros',
						action: 'Listar todos os registros',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar um registro existente',
						action: 'Atualizar um registro existente',
					},
				],
				default: 'list',
			},
			// Campos específicos para cada recurso
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
						resource: [
							'client',
							'contact',
							'lead',
							'project',
							'task',
							'invoice',
						],
					},
				},
				default: '',
				required: true,
				description: 'ID do registro',
			},
			// Campos para criação/atualização de clientes
			{
				displayName: 'Dados do Cliente',
				name: 'clientData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['client'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Empresa',
						name: 'company',
						type: 'string',
						default: '',

					},
					{
						displayName: 'CNPJ',
						name: 'vat',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Telefone',
						name: 'phonenumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'País',
						name: 'country',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'CEP',
						name: 'zip',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
					},
				],
			},
			// Campos para criação/atualização de contatos
			{
				displayName: 'Dados do Contato',
				name: 'contactData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['contact'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'ID do Cliente',
						name: 'userid',
						type: 'string',
						default: '',

					},
					{
						displayName: 'Nome',
						name: 'firstname',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Sobrenome',
						name: 'lastname',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
						required: true,
					},
					{
						displayName: 'Telefone',
						name: 'phonenumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Cargo',
						name: 'title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Contato Principal',
						name: 'is_primary',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Ativo',
						name: 'active',
						type: 'boolean',
						default: true,
					},
				],
			},
			// Campos para criação/atualização de leads
			{
				displayName: 'Dados do Lead',
				name: 'leadData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['lead'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',

					},
					{
						displayName: 'Fonte',
						name: 'source',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						placeholder: 'name@email.com',
						default: '',
					},
					{
						displayName: 'Telefone',
						name: 'phonenumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Empresa',
						name: 'company',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
					},
					{
						displayName: 'País',
						name: 'country',
						type: 'string',
						default: '',
					},
					{
						displayName: 'CEP',
						name: 'zip',
						type: 'string',
						default: '',
					},
				],
			},
			// Campos para criação/atualização de projetos
			{
				displayName: 'Dados do Projeto',
				name: 'projectData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['project'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',

					},
					{
						displayName: 'ID do Cliente',
						name: 'clientid',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Tipo de Cobrança',
						name: 'billing_type',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Data de Início',
						name: 'start_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Prazo',
						name: 'deadline',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
					},
					{
						displayName: 'Membros',
						name: 'members',
						type: 'string',
						default: '',
						description: 'IDs dos membros separados por vírgula',
					},
				],
			},
			// Campos para criação/atualização de tarefas
			{
				displayName: 'Dados da Tarefa',
				name: 'taskData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['task'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',

					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
					},
					{
						displayName: 'Prioridade',
						name: 'priority',
						type: 'number',
						default: 2,
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Data de Início',
						name: 'startdate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Data de Término',
						name: 'duedate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'ID do Projeto',
						name: 'project_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Responsáveis',
						name: 'assignees',
						type: 'string',
						default: '',
						description: 'IDs dos responsáveis separados por vírgula',
					},
				],
			},
			// Campos para criação/atualização de faturas
			{
				displayName: 'Dados da Fatura',
				name: 'invoiceData',
				type: 'collection',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['invoice'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'ID do Cliente',
						name: 'clientid',
						type: 'string',
						default: '',

					},
					{
						displayName: 'Data',
						name: 'date',
						type: 'dateTime',
						default: '',
						required: true,
					},
					{
						displayName: 'Data de Vencimento',
						name: 'duedate',
						type: 'dateTime',
						default: '',
						required: true,
					},
					{
						displayName: 'Moeda',
						name: 'currency',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Itens',
						name: 'items',
						type: 'json',
						default: '[]',
						description: 'Array de itens da fatura em formato JSON',
					},
				],
			},
		],
	};

	async execute(this: IPerfexExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Obter credenciais
		const credentials = await this.getCredentials('perfexApi');
		if (!credentials) {
			throw new NodeOperationError(this.getNode(), 'Credenciais não encontradas');
		}

		// Inicializar cliente Perfex
		const perfex = new PerfexClient({
			baseUrl: credentials.baseUrl as string,
			apiKey: credentials.apiKey as string,
			apiToken: credentials.apiToken as string,
		});

		// Processar cada item
		for (let i = 0; i < items.length; i++) {
			try {
				let result: IPerfexResponse<any> | IPerfexListResponse<any>;

				switch (resource) {
					case 'client':
						result = await this.handleClientOperations(perfex, operation, i);
						break;
					case 'contact':
						result = await this.handleContactOperations(perfex, operation, i);
						break;
					case 'lead':
						result = await this.handleLeadOperations(perfex, operation, i);
						break;
					case 'project':
						result = await this.handleProjectOperations(perfex, operation, i);
						break;
					case 'task':
						result = await this.handleTaskOperations(perfex, operation, i);
						break;
					case 'invoice':
						result = await this.handleInvoiceOperations(perfex, operation, i);
						break;
					default:
						throw new NodeOperationError(
							this.getNode(),
							`Recurso "${resource}" não suportado`,
						);
				}

				if (!result.success) {
					throw new NodeOperationError(
						this.getNode(),
						result.message || 'Erro na operação',
					);
				}

				if ('total' in result) {
					returnData.push(...this.helpers.returnJsonArray(result.data));
				} else {
					returnData.push(this.helpers.returnJsonArray(result.data));
				}
			} catch (error: unknown) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
					returnData.push({
						json: {
							error: errorMessage,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}

	private getNode(): INode {
		return this.getNode();
	}

	private getNodeParameter(
		parameterName: string,
		itemIndex: number,
		fallbackValue?: any,
	): any {
		return this.getNodeParameter(parameterName, itemIndex, fallbackValue);
	}

	private async handleClientOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexClient> | IPerfexListResponse<IPerfexClient>> {
		const id = this.getNodeParameter('id', itemIndex) as string;
		const clientData = this.getNodeParameter('clientData', itemIndex, {}) as Partial<IPerfexClient>;

		switch (operation) {
			case 'create':
				return await perfex.clients.create(clientData);
			case 'delete':
				return await perfex.clients.delete(id);
			case 'get':
				return await perfex.clients.get(id);
			case 'list':
				return await perfex.clients.list();
			case 'update':
				return await perfex.clients.update(id, clientData);
			default:
				throw new NodeOperationError(
					this.getNode(),
					`Operação "${operation}" não suportada para clientes`,
				);
		}
	}

	private async handleContactOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexContact> | IPerfexListResponse<IPerfexContact>> {
		const id = this.getNodeParameter('id', itemIndex) as string;
		const contactData = this.getNodeParameter('contactData', itemIndex, {}) as Partial<IPerfexContact>;

		switch (operation) {
			case 'create':
				return await perfex.contacts.create(contactData);
			case 'delete':
				return await perfex.contacts.delete(id);
			case 'get':
				return await perfex.contacts.get(id);
			case 'list':
				return await perfex.contacts.list();
			case 'update':
				return await perfex.contacts.update(id, contactData);
			default:
				throw new NodeOperationError(
					this.getNode(),
					`Operação "${operation}" não suportada para contatos`,
				);
		}
	}

	private async handleLeadOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexLead> | IPerfexListResponse<IPerfexLead>> {
		const id = this.getNodeParameter('id', itemIndex) as string;
		const leadData = this.getNodeParameter('leadData', itemIndex, {}) as Partial<IPerfexLead>;

		switch (operation) {
			case 'create':
				return await perfex.leads.create(leadData);
			case 'delete':
				return await perfex.leads.delete(id);
			case 'get':
				return await perfex.leads.get(id);
			case 'list':
				return await perfex.leads.list();
			case 'update':
				return await perfex.leads.update(id, leadData);
			default:
				throw new NodeOperationError(
					this.getNode(),
					`Operação "${operation}" não suportada para leads`,
				);
		}
	}

	private async handleProjectOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexProject> | IPerfexListResponse<IPerfexProject>> {
		const id = this.getNodeParameter('id', itemIndex) as string;
		const inputData = this.getNodeParameter('projectData', itemIndex, {}) as ProjectInputData;
		const projectData = { ...inputData } as Partial<IPerfexProject>;

		// Converter string de membros para array
		if (typeof inputData.members === 'string') {
			(projectData as any).members = inputData.members.split(',').map((id: string) => parseInt(id.trim()));
		}

		switch (operation) {
			case 'create':
				return await perfex.projects.create(projectData);
			case 'delete':
				return await perfex.projects.delete(id);
			case 'get':
				return await perfex.projects.get(id);
			case 'list':
				return await perfex.projects.list();
			case 'update':
				return await perfex.projects.update(id, projectData);
			default:
				throw new NodeOperationError(
					this.getNode(),
					`Operação "${operation}" não suportada para projetos`,
				);
		}
	}

	private async handleTaskOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexTask> | IPerfexListResponse<IPerfexTask>> {
		const id = this.getNodeParameter('id', itemIndex) as string;
		const inputData = this.getNodeParameter('taskData', itemIndex, {}) as TaskInputData;
		const taskData = { ...inputData } as Partial<IPerfexTask>;

		// Converter string de responsáveis para array
		if (typeof inputData.assignees === 'string') {
			(taskData as any).assignees = inputData.assignees.split(',').map((id: string) => parseInt(id.trim()));
		}

		switch (operation) {
			case 'create':
				return await perfex.tasks.create(taskData);
			case 'delete':
				return await perfex.tasks.delete(id);
			case 'get':
				return await perfex.tasks.get(id);
			case 'list':
				return await perfex.tasks.list();
			case 'update':
				return await perfex.tasks.update(id, taskData);
			default:
				throw new NodeOperationError(
					this.getNode(),
					`Operação "${operation}" não suportada para tarefas`,
				);
		}
	}

	private async handleInvoiceOperations(
		perfex: PerfexClient,
		operation: string,
		itemIndex: number,
	): Promise<IPerfexResponse<IPerfexInvoice> | IPerfexListResponse<IPerfexInvoice>> {
		const id = this.getNodeParameter('id', itemIndex) as string;
		const inputData = this.getNodeParameter('invoiceData', itemIndex, {}) as InvoiceInputData;
		const invoiceData = { ...inputData } as Partial<IPerfexInvoice>;

		// Converter string de itens para array
		if (typeof inputData.items === 'string') {
			try {
				(invoiceData as any).items = JSON.parse(inputData.items);
			} catch (error) {
				throw new NodeOperationError(
					this.getNode(),
					'Formato inválido para os itens da fatura. Deve ser um JSON válido.',
				);
			}
		}

		switch (operation) {
			case 'create':
				return await perfex.invoices.create(invoiceData);
			case 'delete':
				return await perfex.invoices.delete(id);
			case 'get':
				return await perfex.invoices.get(id);
			case 'list':
				return await perfex.invoices.list();
			case 'update':
				return await perfex.invoices.update(id, invoiceData);
			default:
				throw new NodeOperationError(
					this.getNode(),
					`Operação "${operation}" não suportada para faturas`,
				);
		}
	}
} 