import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./pages/Dashboard'));
const BillsDashboardDefault = React.lazy(() => import('./pages/BillsDashboard'));
const AddClient = React.lazy(() => import('./pages/AddClient'));
const InvoicePage = React.lazy(() => import('./components/InvoicePage'))
const ViewInvoice = React.lazy(() => import('./components/ViewInvoice'))
const SpecificClient = React.lazy(() => import('./pages/SpecificClient'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));
const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));
const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));
const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));
const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));
const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    { path: '/dashboard/', exact: true, name: 'Dashboard', component: DashboardDefault },
    { path: '/create-invoice/', exact: true, name: 'Create Invoice', component: InvoicePage },
    { path: '/view-invoice/', exact: true, name: 'View Invoice', component: ViewInvoice },
    { path: '/bills-dashboard/', exact: true, name: 'Bills', component: BillsDashboardDefault },
    { path: '/add-client/', exact: true, name: 'Add Client', component: AddClient },
    { path: '/clients/:id/', exact: true, name: 'Specific Client', component: SpecificClient },
    
    
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;