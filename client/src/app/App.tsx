import { Suspense } from 'react';
import './styles/index.scss';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppRouter } from 'app/providers/router';
import { NavBar } from 'witgets/NavBar';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import lightBc from 'shared/assets/images/lightBc.jpg';
import darkBc from 'shared/assets/images/darkBc.jpg';

const App = () => {
    const { theme } = useTheme();
    const bgImg = theme === Theme.LIGHT ? lightBc : darkBc;
    return (
        <div
            style={{
                background: `url(${bgImg}) center center / cover no-repeat`,
            }}
            className={ClassNames('app', {}, [])}
        >
            <Suspense fallback="">
                <NavBar className="NavBar__flex" />
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
