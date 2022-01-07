import React from 'react';

const SignUp = React.lazy(() => import('./pages/SignUp'));
const Landing = React.lazy(() => import('./pages/Landing'));
// const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const route = [
    { path: '/signup', exact: true, name: 'Signup', component: SignUp },
    { path: '/', exact: true, name: 'Landing', component: Landing },
    // { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 }
];

export default route;