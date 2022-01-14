export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/',
                    icon: 'feather icon-home',
                },
                {
                    id: 'bills',
                    title: 'Bills',
                    type: 'item',
                    url: '/bills-dashboard/',
                    icon: 'feather icon-file-text',
                },
                {
                    id: 'add_client',
                    title: 'Add Client',
                    type: 'item',
                    url: '/add-client/',
                    icon: 'feather icon-user-plus',
                },
                {
                    id: 'create_invoice',
                    title: 'Create Invoice',
                    type: 'item',
                    url: '/create-invoice/',
                    icon: 'feather icon-file-plus',
                }
            ]
        },
        {
            id: 'account',
            title: 'Account',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'logout',
                    title: 'Logout',
                    type: 'item',
                    url: '/logout/',
                    icon: 'feather icon-log-out',
                }
            ]
        }
    ]
}