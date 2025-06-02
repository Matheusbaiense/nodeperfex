import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IDataObject,
	INode,
} from 'n8n-workflow';

// Estendendo a interface IExecuteFunctions para incluir métodos específicos do Perfex
interface IPerfexExecuteFunctions extends IExecuteFunctions {
	getNodeParameter(
		parameterName: string,
		itemIndex: number,
		fallbackValue?: any,
	): any;
	getNode(): INode;
}

// Funções auxiliares para processar operações por recurso
async function processClientOperations(executeFunctions: IExecuteFunctions, httpClient: any, operation: string, itemIndex: number ): Promise<any> {
	const endpoint = '/api/clients';
	
	switch (operation) {
		case 'getAll':
			const options = executeFunctions.getNodeParameter('options', itemIndex, {}) as IDataObject;
			const filters = options.filters ? JSON.parse(options.filters as string) : {};
			const limit = options.limit as number;
			
			if (limit) {
				filters.limit = limit;
			}
			
			const response = await httpClient.get(endpoint, { params: filters } );
			return response.data;
			
		case 'get':
			const clientId = executeFunctions.getNodeParameter('clientId', itemIndex) as string;
			const getResponse = await httpClient.get(`${endpoint}/${clientId}` );
			return getResponse.data;
			
		case 'create':
			const clientData = executeFunctions.getNodeParameter('clientData', itemIndex, {}) as IDataObject;
			const createResponse = await httpClient.post(endpoint, clientData );
			return createResponse.data;
			
		case 'update':
			const updateClientId = executeFunctions.getNodeParameter('clientId', itemIndex) as string;
			const updateClientData = executeFunctions.getNodeParameter('clientData', itemIndex, {}) as IDataObject;
			const updateResponse = await httpClient.put(`${endpoint}/${updateClientId}`, updateClientData );
			return updateResponse.data;
			
		case 'delete':
			const deleteClientId = executeFunctions.getNodeParameter('clientId', itemIndex) as string;
			const deleteResponse = await httpClient.delete(`${endpoint}/${deleteClientId}` );
			return deleteResponse.data;
			
		default:
			throw new NodeOperationError(executeFunctions.getNode(), `Operação desconhecida: ${operation}`);
	}
}

async function processContactOperations(executeFunctions: IExecuteFunctions, httpClient: any, operation: string, itemIndex: number ): Promise<any> {
	const endpoint = '/api/contacts';
	
	switch (operation) {
		case 'getAll':
			const options = executeFunctions.getNodeParameter('options', itemIndex, {}) as IDataObject;
			const filters = options.filters ? JSON.parse(options.filters as string) : {};
			const limit = options.limit as number;
			
			if (limit) {
				filters.limit = limit;
			}
			
			const response = await httpClient.get(endpoint, { params: filters } );
			return response.data;
			
		case 'get':
			const contactId = executeFunctions.getNodeParameter('contactId', itemIndex) as string;
			const getResponse = await httpClient.get(`${endpoint}/${contactId}` );
			return getResponse.data;
			
		case 'create':
			const contactData = executeFunctions.getNodeParameter('contactData', itemIndex, {}) as IDataObject;
			const createResponse = await httpClient.post(endpoint, contactData );
			return createResponse.data;
			
		case 'update':
			const updateContactId = executeFunctions.getNodeParameter('contactId', itemIndex) as string;
			const updateContactData = executeFunctions.getNodeParameter('contactData', itemIndex, {}) as IDataObject;
			const updateResponse = await httpClient.put(`${endpoint}/${updateContactId}`, updateContactData );
			return updateResponse.data;
			
		case 'delete':
			const deleteContactId = executeFunctions.getNodeParameter('contactId', itemIndex) as string;
			const deleteResponse = await httpClient.delete(`${endpoint}/${deleteContactId}` );
			return deleteResponse.data;
			
		default:
			throw new NodeOperationError(executeFunctions.getNode(), `Operação desconhecida: ${operation}`);
	}
}

async function processLeadOperations(executeFunctions: IExecuteFunctions, httpClient: any, operation: string, itemIndex: number ): Promise<any> {
	const endpoint = '/api/leads';
	
	switch (operation) {
		case 'getAll':
			const options = executeFunctions.getNodeParameter('options', itemIndex, {}) as IDataObject;
			const filters = options.filters ? JSON.parse(options.filters as string) : {};
			const limit = options.limit as number;
			
			if (limit) {
				filters.limit = limit;
			}
			
			const response = await httpClient.get(endpoint, { params: filters } );
			return response.data;
			
		case 'get':
			const leadId = executeFunctions.getNodeParameter('leadId', itemIndex) as string;
			const getResponse = await httpClient.get(`${endpoint}/${leadId}` );
			return getResponse.data;
			
		case 'create':
			const leadData = executeFunctions.getNodeParameter('leadData', itemIndex, {}) as IDataObject;
			const createResponse = await httpClient.post(endpoint, leadData );
			return createResponse.data;
			
		case 'update':
			const updateLeadId = executeFunctions.getNodeParameter('leadId', itemIndex) as string;
			const updateLeadData = executeFunctions.getNodeParameter('leadData', itemIndex, {}) as IDataObject;
			const updateResponse = await httpClient.put(`${endpoint}/${updateLeadId}`, updateLeadData );
			return updateResponse.data;
			
		case 'delete':
			const deleteLeadId = executeFunctions.getNodeParameter('leadId', itemIndex) as string;
			const deleteResponse = await httpClient.delete(`${endpoint}/${deleteLeadId}` );
			return deleteResponse.data;
			
		default:
			throw new NodeOperationError(executeFunctions.getNode(), `Operação desconhecida: ${operation}`);
	}
}

async function processProjectOperations(executeFunctions: IExecuteFunctions, httpClient: any, operation: string, itemIndex: number ): Promise<any> {
	const endpoint = '/api/projects';
	
	switch (operation) {
		case 'getAll':
			const options = executeFunctions.getNodeParameter('options', itemIndex, {}) as IDataObject;
			const filters = options.filters ? JSON.parse(options.filters as string) : {};
			const limit = options.limit as number;
			
			if (limit) {
				filters.limit = limit;
			}
			
			const response = await httpClient.get(endpoint, { params: filters } );
			return response.data;
			
		case 'get':
			const projectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
			const getResponse = await httpClient.get(`${endpoint}/${projectId}` );
			return getResponse.data;
			
		case 'create':
			const projectData = executeFunctions.getNodeParameter('projectData', itemIndex, {}) as IDataObject;
			
			// Converter membros de string para array
			if (projectData.members && typeof projectData.members === 'string') {
				projectData.members = (projectData.members as string).split(',').map(id => parseInt(id.trim(), 10));
			}
			
			const createResponse = await httpClient.post(endpoint, projectData );
			return createResponse.data;
			
		case 'update':
			const updateProjectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
			const updateProjectData = executeFunctions.getNodeParameter('projectData', itemIndex, {}) as IDataObject;
			
			// Converter membros de string para array
			if (updateProjectData.members && typeof updateProjectData.members === 'string') {
				updateProjectData.members = (updateProjectData.members as string).split(',').map(id => parseInt(id.trim(), 10));
			}
			
			const updateResponse = await httpClient.put(`${endpoint}/${updateProjectId}`, updateProjectData );
			return updateResponse.data;
			
		case 'delete':
			const deleteProjectId = executeFunctions.getNodeParameter('projectId', itemIndex) as string;
			const deleteResponse = await httpClient.delete(`${endpoint}/${deleteProjectId}` );
			return deleteResponse.data;
			
		default:
			throw new NodeOperationError(executeFunctions.getNode(), `Operação desconhecida: ${operation}`);
	}
}

async function processTaskOperations(executeFunctions: IExecuteFunctions, httpClient: any, operation: string, itemIndex: number ): Promise<any> {
	const endpoint = '/api/tasks';
	
	switch (operation) {
		case 'getAll':
			const options = executeFunctions.getNodeParameter('options', itemIndex, {}) as IDataObject;
			const filters = options.filters ? JSON.parse(options.filters as string) : {};
			const limit = options.limit as number;
			
			if (limit) {
				filters.limit = limit;
			}
			
			const response = await httpClient.get(endpoint, { params: filters } );
			return response.data;
			
		case 'get':
			const taskId = executeFunctions.getNodeParameter('taskId', itemIndex) as string;
			const getResponse = await httpClient.get(`${endpoint}/${taskId}` );
			return getResponse.data;
			
		case 'create':
			const taskData = executeFunctions.getNodeParameter('taskData', itemIndex, {}) as IDataObject;
			
			// Converter responsáveis de string para array
			if (taskData.assignees && typeof taskData.assignees === 'string') {
				taskData.assignees = (taskData.assignees as string).split(',').map(id => parseInt(id.trim(), 10));
			}
			
			const createResponse = await httpClient.post(endpoint, taskData );
			return createResponse.data;
			
		case 'update':
			const updateTaskId = executeFunctions.getNodeParameter('taskId', itemIndex) as string;
			const updateTaskData = executeFunctions.getNodeParameter('taskData', itemIndex, {}) as IDataObject;
			
			// Converter responsáveis de string para array
			if (updateTaskData.assignees && typeof updateTaskData.assignees === 'string') {
				updateTaskData.assignees = (updateTaskData.assignees as string).split(',').map(id => parseInt(id.trim(), 10));
			}
			
			const updateResponse = await httpClient.put(`${endpoint}/${updateTaskId}`, updateTaskData );
			return updateResponse.data;
			
		case 'delete':
			const deleteTaskId = executeFunctions.getNodeParameter('taskId', itemIndex) as string;
			const deleteResponse = await httpClient.delete(`${endpoint}/${deleteTaskId}` );
			return deleteResponse.data;
			
		default:
			throw new NodeOperationError(executeFunctions.getNode(), `Operação desconhecida: ${operation}`);
	}
}

async function processInvoiceOperations(executeFunctions: IExecuteFunctions, httpClient: any, operation: string, itemIndex: number ): Promise<any> {
	const endpoint = '/api/invoices';
	
	switch (operation) {
		case 'getAll':
			const options = executeFunctions.getNodeParameter('options', itemIndex, {}) as IDataObject;
			const filters = options.filters ? JSON.parse(options.filters as string) : {};
			const limit = options.limit as number;
			
			if (limit) {
				filters.limit = limit;
			}
			
			const response = await httpClient.get(endpoint, { params: filters } );
			return response.data;
			
		case 'get':
			const invoiceId = executeFunctions.getNodeParameter('invoiceId', itemIndex) as string;
			const getResponse = await httpClient.get(`${endpoint}/${invoiceId}` );
			return getResponse.data;
			
		case 'create':
			const invoiceData = executeFunctions.getNodeParameter('invoiceData', itemIndex, {}) as IDataObject;
			
			// Converter itens de string JSON para array
			if (invoiceData.items && typeof invoiceData.items === 'string') {
				try {
					invoiceData.items = JSON.parse(invoiceData.items as string);
				} catch (error) {
					throw new NodeOperationError(executeFunctions.getNode(), 'Formato de itens inválido. Deve ser um array JSON válido.');
				}
			}
			
			const createResponse = await httpClient.post(endpoint, invoiceData );
			return createResponse.data;
			
		case 'update':
			const updateInvoiceId = executeFunctions.getNodeParameter('invoiceId', itemIndex) as string;
			const updateInvoiceData = executeFunctions.getNodeParameter('invoiceData', itemIndex, {}) as IDataObject;
			
			// Converter itens de string JSON para array
			if (updateInvoiceData.items && typeof updateInvoiceData.items === 'string') {
				try {
					updateInvoiceData.items = JSON.parse(updateInvoiceData.items as string);
				} catch (error) {
					throw new NodeOperationError(executeFunctions.getNode(), 'Formato de itens inválido. Deve ser um array JSON válido.');
				}
			}
			
			const updateResponse = await httpClient.put(`${endpoint}/${updateInvoiceId}`, updateInvoiceData );
			return updateResponse.data;
			
		case 'delete':
			const deleteInvoiceId = executeFunctions.getNodeParameter('invoiceId', itemIndex) as string;
			const deleteResponse = await httpClient.delete(`${endpoint}/${deleteInvoiceId}` );
			return deleteResponse.data;
			
		default:
			throw new NodeOperationError(executeFunctions.getNode(), `Operação desconhecida: ${operation}`);
	}
}

// Implementação direta do cliente Perfex sem importar módulo externo
// Isso evita o erro "Cannot find module '../../src/types'"
export class Perfex implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Perfex CRM',
		name: 'perfexCrm',
		icon: 'file:perfex.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interagir com o Perfex CRM via WON API',
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
						action: 'Criar um registro',
					},
					{
						name: 'Atualizar',
						value: 'update',
						description: 'Atualizar um registro existente',
						action: 'Atualizar um registro',
					},
					{
						name: 'Obter',
						value: 'get',
						description: 'Obter um registro específico',
						action: 'Obter um registro',
					},
					{
						name: 'Listar',
						value: 'getAll',
						description: 'Obter todos os registros',
						action: 'Obter todos os registros',
					},
					{
						name: 'Deletar',
						value: 'delete',
						description: 'Deletar um registro',
						action: 'Deletar um registro',
					},
				],
				default: 'getAll',
			},

			// ----------------------------------
			//         Cliente: Campos
			// ----------------------------------
			{
				displayName: 'ID do Cliente',
				name: 'clientId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'get',
							'update',
							'delete',
						],
					},
				},
				description: 'ID do cliente',
			},
			{
				displayName: 'Dados do Cliente',
				name: 'clientData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'client',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
				options: [
					{
						displayName: 'Nome da Empresa',
						name: 'company',
						type: 'string',
						default: '',
						description: 'Nome da empresa do cliente',
					},
					{
						displayName: 'VAT',
						name: 'vat',
						type: 'string',
						default: '',
						description: 'Número do VAT do cliente',
					},
					{
						displayName: 'Telefone',
						name: 'phonenumber',
						type: 'string',
						default: '',
						description: 'Número de telefone do cliente',
					},
					{
						displayName: 'País',
						name: 'country',
						type: 'string',
						default: '',
						description: 'País do cliente',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Cidade do cliente',
					},
					{
						displayName: 'CEP',
						name: 'zip',
						type: 'string',
						default: '',
						description: 'CEP do cliente',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
						description: 'Estado do cliente',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Endereço do cliente',
					},
					{
						displayName: 'Website',
						name: 'website',
						type: 'string',
						default: '',
						description: 'Website do cliente',
					},
					{
						displayName: 'Ativo',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Se o cliente está ativo',
					},
				],
			},

			// ----------------------------------
			//         Contato: Campos
			// ----------------------------------
			{
				displayName: 'ID do Contato',
				name: 'contactId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
						operation: [
							'get',
							'update',
							'delete',
						],
					},
				},
				description: 'ID do contato',
			},
			{
				displayName: 'Dados do Contato',
				name: 'contactData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'contact',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
				options: [
					{
						displayName: 'ID do Cliente',
						name: 'userid',
						type: 'string',
						default: '',
						description: 'ID do cliente ao qual o contato pertence',
					},
					{
						displayName: 'Nome',
						name: 'firstname',
						type: 'string',
						default: '',
						description: 'Nome do contato',
					},
					{
						displayName: 'Sobrenome',
						name: 'lastname',
						type: 'string',
						default: '',
						description: 'Sobrenome do contato',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email do contato',
					},
					{
						displayName: 'Telefone',
						name: 'phonenumber',
						type: 'string',
						default: '',
						description: 'Número de telefone do contato',
					},
					{
						displayName: 'Cargo',
						name: 'title',
						type: 'string',
						default: '',
						description: 'Cargo do contato',
					},
					{
						displayName: 'É Primário',
						name: 'is_primary',
						type: 'boolean',
						default: false,
						description: 'Se o contato é o contato primário',
					},
					{
						displayName: 'Senha',
						name: 'password',
						type: 'string',
						default: '',
						description: 'Senha do contato para acesso ao portal do cliente',
					},
					{
						displayName: 'Ativo',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Se o contato está ativo',
					},
				],
			},

			// ----------------------------------
			//         Lead: Campos
			// ----------------------------------
			{
				displayName: 'ID do Lead',
				name: 'leadId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'lead',
						],
						operation: [
							'get',
							'update',
							'delete',
						],
					},
				},
				description: 'ID do lead',
			},
			{
				displayName: 'Dados do Lead',
				name: 'leadData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'lead',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do lead',
					},
					{
						displayName: 'Fonte',
						name: 'source',
						type: 'number',
						default: 0,
						description: 'ID da fonte do lead',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 0,
						description: 'ID do status do lead',
					},
					{
						displayName: 'Responsável',
						name: 'assigned',
						type: 'number',
						default: 0,
						description: 'ID do usuário responsável pelo lead',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'Email do lead',
					},
					{
						displayName: 'Telefone',
						name: 'phonenumber',
						type: 'string',
						default: '',
						description: 'Número de telefone do lead',
					},
					{
						displayName: 'Empresa',
						name: 'company',
						type: 'string',
						default: '',
						description: 'Nome da empresa do lead',
					},
					{
						displayName: 'Endereço',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Endereço do lead',
					},
					{
						displayName: 'Cidade',
						name: 'city',
						type: 'string',
						default: '',
						description: 'Cidade do lead',
					},
					{
						displayName: 'Estado',
						name: 'state',
						type: 'string',
						default: '',
						description: 'Estado do lead',
					},
					{
						displayName: 'País',
						name: 'country',
						type: 'string',
						default: '',
						description: 'País do lead',
					},
					{
						displayName: 'CEP',
						name: 'zip',
						type: 'string',
						default: '',
						description: 'CEP do lead',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição do lead',
					},
				],
			},

			// ----------------------------------
			//         Projeto: Campos
			// ----------------------------------
			{
				displayName: 'ID do Projeto',
				name: 'projectId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'project',
						],
						operation: [
							'get',
							'update',
							'delete',
						],
					},
				},
				description: 'ID do projeto',
			},
			{
				displayName: 'Dados do Projeto',
				name: 'projectData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'project',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome do projeto',
					},
					{
						displayName: 'ID do Cliente',
						name: 'clientid',
						type: 'string',
						default: '',
						description: 'ID do cliente ao qual o projeto pertence',
					},
					{
						displayName: 'Tipo de Faturamento',
						name: 'billing_type',
						type: 'number',
						default: 0,
						description: 'Tipo de faturamento do projeto',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 0,
						description: 'ID do status do projeto',
					},
					{
						displayName: 'Data de Início',
						name: 'start_date',
						type: 'dateTime',
						default: '',
						description: 'Data de início do projeto',
					},
					{
						displayName: 'Prazo',
						name: 'deadline',
						type: 'dateTime',
						default: '',
						description: 'Prazo do projeto',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição do projeto',
					},
					{
						displayName: 'Custo do Projeto',
						name: 'project_cost',
						type: 'number',
						default: 0,
						description: 'Custo do projeto',
					},
					{
						displayName: 'Taxa por Hora',
						name: 'project_rate_per_hour',
						type: 'number',
						default: 0,
						description: 'Taxa por hora do projeto',
					},
					{
						displayName: 'Horas Estimadas',
						name: 'estimated_hours',
						type: 'number',
						default: 0,
						description: 'Horas estimadas para o projeto',
					},
					{
						displayName: 'Membros',
						name: 'members',
						type: 'string',
						default: '',
						description: 'IDs dos membros do projeto, separados por vírgula',
					},
				],
			},

			// ----------------------------------
			//         Tarefa: Campos
			// ----------------------------------
			{
				displayName: 'ID da Tarefa',
				name: 'taskId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'task',
						],
						operation: [
							'get',
							'update',
							'delete',
						],
					},
				},
				description: 'ID da tarefa',
			},
			{
				displayName: 'Dados da Tarefa',
				name: 'taskData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'task',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
				options: [
					{
						displayName: 'Nome',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Nome da tarefa',
					},
					{
						displayName: 'Descrição',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Descrição da tarefa',
					},
					{
						displayName: 'Prioridade',
						name: 'priority',
						type: 'options',
						options: [
							{
								name: 'Baixa',
								value: 1,
							},
							{
								name: 'Média',
								value: 2,
							},
							{
								name: 'Alta',
								value: 3,
							},
							{
								name: 'Urgente',
								value: 4,
							},
							{
								name: 'Emergência',
								value: 5,
							},
						],
						default: 2,
						description: 'Prioridade da tarefa',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 0,
						description: 'ID do status da tarefa',
					},
					{
						displayName: 'Data de Início',
						name: 'startdate',
						type: 'dateTime',
						default: '',
						description: 'Data de início da tarefa',
					},
					{
						displayName: 'Data de Vencimento',
						name: 'duedate',
						type: 'dateTime',
						default: '',
						description: 'Data de vencimento da tarefa',
					},
					{
						displayName: 'Responsáveis',
						name: 'assignees',
						type: 'string',
						default: '',
						description: 'IDs dos responsáveis pela tarefa, separados por vírgula',
					},
					{
						displayName: 'ID do Projeto',
						name: 'project_id',
						type: 'string',
						default: '',
						description: 'ID do projeto ao qual a tarefa pertence',
					},
					{
						displayName: 'Marco',
						name: 'milestone',
						type: 'number',
						default: 0,
						description: 'ID do marco ao qual a tarefa pertence',
					},
				],
			},

			// ----------------------------------
			//         Fatura: Campos
			// ----------------------------------
			{
				displayName: 'ID da Fatura',
				name: 'invoiceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'invoice',
						],
						operation: [
							'get',
							'update',
							'delete',
						],
					},
				},
				description: 'ID da fatura',
			},
			{
				displayName: 'Dados da Fatura',
				name: 'invoiceData',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'invoice',
						],
						operation: [
							'create',
							'update',
						],
					},
				},
				options: [
					{
						displayName: 'ID do Cliente',
						name: 'clientid',
						type: 'string',
						default: '',
						description: 'ID do cliente ao qual a fatura pertence',
					},
					{
						displayName: 'Número',
						name: 'number',
						type: 'string',
						default: '',
						description: 'Número da fatura',
					},
					{
						displayName: 'Data',
						name: 'date',
						type: 'dateTime',
						default: '',
						description: 'Data da fatura',
					},
					{
						displayName: 'Data de Vencimento',
						name: 'duedate',
						type: 'dateTime',
						default: '',
						description: 'Data de vencimento da fatura',
					},
					{
						displayName: 'Moeda',
						name: 'currency',
						type: 'number',
						default: 0,
						description: 'ID da moeda da fatura',
					},
					{
						displayName: 'Subtotal',
						name: 'subtotal',
						type: 'number',
						default: 0,
						description: 'Subtotal da fatura',
					},
					{
						displayName: 'Total',
						name: 'total',
						type: 'number',
						default: 0,
						description: 'Total da fatura',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'number',
						default: 0,
						description: 'ID do status da fatura',
					},
					{
						displayName: 'ID do Projeto',
						name: 'project_id',
						type: 'string',
						default: '',
						description: 'ID do projeto ao qual a fatura pertence',
					},
					{
						displayName: 'Itens',
						name: 'items',
						type: 'json',
						default: '[]',
						description: 'Itens da fatura em formato JSON',
					},
				],
			},

			// ----------------------------------
			//         Filtros e Opções
			// ----------------------------------
			{
				displayName: 'Opções',
				name: 'options',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'getAll',
						],
					},
				},
				options: [
					{
						displayName: 'Limite',
						name: 'limit',
						type: 'number',
						default: 50,
						description: 'Número máximo de resultados a retornar',
					},
					{
						displayName: 'Filtros',
						name: 'filters',
						type: 'json',
						default: '{}',
						description: 'Filtros em formato JSON',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		
		// Obter credenciais
		const credentials = await this.getCredentials('perfexApi');
		
		const baseUrl = credentials.url as string;
		const apiToken = credentials.apiToken as string;
		
		// Configurar cliente HTTP para API Perfex - usando apenas API Token
		const axios = require('axios');
		const httpClient = axios.create({
			baseURL: baseUrl,
			timeout: 30000,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-API-TOKEN': apiToken
			}
		} );
		
		// Processar cada item
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				
				let responseData;
				
				// Executar operação com base no recurso e operação
				switch (resource) {
					case 'client':
						responseData = await processClientOperations(this, httpClient, operation, i );
						break;
					case 'contact':
						responseData = await processContactOperations(this, httpClient, operation, i );
						break;
					case 'lead':
						responseData = await processLeadOperations(this, httpClient, operation, i );
						break;
					case 'project':
						responseData = await processProjectOperations(this, httpClient, operation, i );
						break;
					case 'task':
						responseData = await processTaskOperations(this, httpClient, operation, i );
						break;
					case 'invoice':
						responseData = await processInvoiceOperations(this, httpClient, operation, i );
						break;
					default:
						throw new NodeOperationError(this.getNode(), `Recurso desconhecido: ${resource}`);
				}
				
				// Adicionar resultado ao retorno
				returnData.push({
					json: responseData,
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}
		
		return [returnData];
	}
} 