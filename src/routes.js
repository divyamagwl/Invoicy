import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./pages/Dashboard'));
const BillsDashboardDefault = React.lazy(() => import('./pages/BillsDashboard'));
const AddClient = React.lazy(() => import('./pages/AddClient'));
const InvoicePage = React.lazy(() => import('./Invoice/InvoicePage'))
const ViewInvoice = React.lazy(() => import('./Invoice/ViewInvoice'))
const SpecificClient = React.lazy(() => import('./pages/SpecificClient'));


const routes = [
    { path: '/dashboard/', exact: true, name: 'Dashboard', component: DashboardDefault },
    { path: '/create-invoice/', exact: true, name: 'Create Invoice', component: InvoicePage },
    { path: '/view-invoice/', exact: true, name: 'View Invoice', component: ViewInvoice },
    { path: '/bills-dashboard/', exact: true, name: 'Bills', component: BillsDashboardDefault },
    { path: '/add-client/', exact: true, name: 'Add Client', component: AddClient },
    { path: '/clients/:id/', exact: true, name: 'Specific Client', component: SpecificClient },
];

export default routes;