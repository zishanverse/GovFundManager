import {Navigate} from 'react-router-dom';
import './styles/login.css';

const Login = ({wallet }) => {

    if (wallet !== undefined) {
        return <Navigate replace to={"/"} />
    }

    return (
        <div className='login'>
            <img src="https://cdn-icons-png.freepik.com/512/154/154345.png" alt="wallet" className='login-img' />
        </div>
    )
}

export default Login