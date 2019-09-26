import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';

// Core
import TypographyPage from '@/pages/Typography/Typography';
import UserPage from '@/pages/User/components/TheList';
import UserForm from '@/pages/User/components/TheForm';

import AuthorPage from '@/pages/Author/components/TheList';
import AuthorForm from '@/pages/Author/components/TheForm';

import BookPage from '@/pages/Book/components/TheList';
import BookForm from '@/pages/Book/components/TheForm';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/error',
            name: 'Error',
            component: ErrorPage,
        },
        {
            path: '/',
            name: 'Layout',
            component: Layout,
            children: [
                {
                    path: 'dashboard',
                    name: 'AnalyticsPage',
                    component: AnalyticsPage,
                },
                {
                    path: 'typography',
                    name: 'TypographyPage',
                    component: TypographyPage,
                },
                // authors
                {
                    path: 'authors',
                    name: 'AuthorPage',
                    component: AuthorPage,
                },
                {
                    path: 'authors/add',
                    name: 'AuthorAdd',
                    component: AuthorForm,
                },
                {
                    path: 'authors/:id/edit',
                    name: 'AuthorEdit',
                    component: AuthorForm,
                },
                //books
                {
                    path: 'books',
                    name: 'BookPage',
                    component: BookPage,
                },
                {
                    path: 'books/add',
                    name: 'BookAdd',
                    component: BookForm,
                },
                {
                    path: 'books/:id/edit',
                    name: 'BookEdit',
                    component: BookForm,
                },
                // users
                {
                    path: 'users',
                    name: 'UserPage',
                    component: UserPage,
                },
                {
                    path: 'users/add',
                    name: 'UserAdd',
                    component: UserForm,
                },
                {
                    path: 'users/:id/edit',
                    name: 'UserEdit',
                    component: UserForm,
                },
                {
                    path: 'components/icons',
                    name: 'IconsPage',
                    component: IconsPage,
                },
                {
                    path: 'notifications',
                    name: 'NotificationsPage',
                    component: NotificationsPage,
                },
                {
                    path: 'components/charts',
                    name: 'ChartsPage',
                    component: ChartsPage,
                },
                {
                    path: 'tables',
                    name: 'TablesBasicPage',
                    component: TablesBasicPage,
                },
                {
                    path: 'components/maps',
                    name: 'GoogleMapPage',
                    component: GoogleMapPage,
                },
            ],
        },
    ],
});
