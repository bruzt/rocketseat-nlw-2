import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

export const Routes: React.FC = () => {

    return (
        <BrowserRouter>

            <Route exact path='/' component={Landing} />
            <Route path='/give-classes' component={TeacherForm} />
            <Route path='/study' component={TeacherList} />

        </BrowserRouter>
    );
}