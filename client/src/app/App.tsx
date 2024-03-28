import { Suspense } from 'react';
import './styles/index.scss';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppRouter } from 'app/providers/router';
import { NavBar } from 'witgets/NavBar';
import { Sidebar } from 'witgets/SideBar';

const App = () => (
    <div className={ClassNames('app', {}, [])}>
        <Suspense fallback="">
            <NavBar />
            <div className="content-page">
                <AppRouter />
            </div>
        </Suspense>
    </div>
);

export default App;
