# n8n-nodes-perfex

Este é um nó n8n para integração com o Perfex CRM através do módulo WON API. Ele permite que você automatize suas operações no Perfex CRM usando o n8n.

## Recursos

- Gerenciamento completo de clientes
- Gerenciamento de contatos
- Gerenciamento de leads
- Gerenciamento de projetos
- Gerenciamento de tarefas
- Gerenciamento de faturas

## Instalação

Siga estas etapas para instalar o nó em sua instância n8n:

1. Vá para a pasta de nós personalizados do n8n:
```bash
cd ~/.n8n/custom
```

2. Clone este repositório:
```bash
git clone https://github.com/Matheusbaiense/n8n-nodes-perfex.git
```

3. Instale as dependências:
```bash
cd n8n-nodes-perfex
npm install
```

4. Compile o nó:
```bash
npm run build
```

5. Reinicie o n8n para que o novo nó seja carregado.

## Configuração

Para usar este nó, você precisará configurar as credenciais do Perfex CRM:

1. URL Base: A URL base do seu Perfex CRM (ex: https://seu-perfex.com)
2. API Key: A chave da API do Perfex CRM
3. API Token: O token da API do Perfex CRM

## Uso

O nó oferece as seguintes operações para cada recurso:

- Criar: Cria um novo registro
- Obter: Obtém um registro por ID
- Listar: Lista todos os registros
- Atualizar: Atualiza um registro existente
- Excluir: Exclui um registro

### Exemplos

#### Criar um Cliente
```json
{
  "company": "Empresa Exemplo",
  "vat": "12.345.678/0001-90",
  "phonenumber": "(11) 99999-9999",
  "country": "Brasil",
  "city": "São Paulo",
  "zip": "01234-567",
  "state": "SP",
  "address": "Rua Exemplo, 123"
}
```

#### Criar um Contato
```json
{
  "userid": 1,
  "firstname": "João",
  "lastname": "Silva",
  "email": "joao@exemplo.com",
  "phonenumber": "(11) 99999-9999",
  "title": "Gerente",
  "is_primary": 1,
  "active": 1
}
```

## Desenvolvimento

Para contribuir com o desenvolvimento:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

### Scripts Disponíveis

- `npm run build`: Compila o nó
- `npm run dev`: Inicia o modo de desenvolvimento com watch
- `npm run format`: Formata o código usando Prettier
- `npm run lint`: Executa o linter
- `npm run lintfix`: Corrige problemas de linting automaticamente

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Suporte

Se você encontrar algum problema ou tiver alguma sugestão, por favor, abra uma issue no GitHub.

## Autor

- Matheus Baiense (matheusbaiense@gmail.com)

## Agradecimentos

- Equipe do n8n por criar uma plataforma incrível
- Equipe do Perfex CRM por desenvolver um CRM robusto
- Todos os contribuidores que ajudaram no projeto
