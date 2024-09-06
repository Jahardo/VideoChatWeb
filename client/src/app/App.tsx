import { Suspense, useEffect } from 'react';
import './styles/index.scss';
import { ClassNames } from 'shared/lib/ClassNames';
import { AppRouter } from 'app/providers/router';
import { NavBar } from 'witgets/NavBar';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import lightBc from 'shared/assets/images/lightBc.jpg';
import darkBc from 'shared/assets/images/darkBc.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, UserActions } from 'entities/User';
import { checkAuth } from 'features/http';

const App = () => {
    const { theme } = useTheme();
    const bgImg = theme === Theme.LIGHT ? lightBc : darkBc;
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const updateAndAuth = () => {
        checkAuth()
            .then((data:any) => {
                if (data) {
                    dispatch(UserActions.loginUser({
                        id: data.id, email: data.email, name: data.name, img: data.img,
                    }));
                } else {
                    dispatch(UserActions.logoutUser());
                }
            });
    };
    useEffect(() => {
        updateAndAuth();
    }, []);
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
