import React from 'react';
export const navRoutes = [
	{
		path: '/alimentos',
		route: 'alimentos',
		name: 'Alimentos',
		exact: true,
		main: () => <h2>Alimentos</h2>
	},
	{
		path: '/bebidas',
		route: 'bebidas',
		name: 'Bedidas',
		exact: true,
		main: () => <h2>bebidas</h2>
	},
	{
		path: '/casa-e-limpeza',
		route: 'casa-e-limpeza',
		name: 'Casa e Limpeza',
		exact: true,
		main: () => <h2>casa-e-limpeza</h2>
	},
	{
		path: '/cuidados-com-a-roupa',
		route: 'cuidados-com-a-roupa',
		name: 'Cuidados com a Roupa',
		exact: true,
		main: () => <h2>cuidados-com-a-roupa</h2>
	},
	{
		path: '/descartaveis',
		route: 'descartaveis',
		name: 'Descartáveis',
		exact: true,
		main: () => <h2>descartaveis</h2>
	},
	{
		path: '/higiene-e-beleza',
		route: 'higiene-e-beleza',
		name: 'Higiene e Beleza',
		exact: true,
		main: () => <h2>higiene-e-beleza</h2>
	}
];
