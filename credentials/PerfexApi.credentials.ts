import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PerfexApi implements ICredentialType {
	name = 'perfexApi';
	displayName = 'Perfex API';
	documentationUrl = 'https://docs.perfexcrm.com/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'URL Base',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
			description: 'URL base do seu Perfex CRM (ex: https://seu-perfex.com)',
			placeholder: 'https://seu-perfex.com',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Chave da API do Perfex CRM',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Token da API do Perfex CRM',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
				'X-API-TOKEN': '={{$credentials.apiToken}}',
			},
		},
	};
} 