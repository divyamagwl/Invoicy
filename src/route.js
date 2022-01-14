import React from 'react';

const SignUp = React.lazy(() => import('./pages/SignUp'));
const Landing = React.lazy(() => import('./pages/Landing'));

const route = [
    { path: '/signup', exact: true, name: 'Signup', component: SignUp },
    { path: '/', exact: true, name: 'Landing', component: Landing },
];

export default route;