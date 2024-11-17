import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const AuthOnly = (props: { children: any }): React.ReactElement => {
    const { children } = props;
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return <>{isLoggedIn() ? children : navigate('404')}</>;
};
