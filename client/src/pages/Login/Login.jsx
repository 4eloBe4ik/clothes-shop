import cn from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import * as userSlice from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { replace } = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loginRequestError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userSlice.loginUser({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <section className='registration'>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='title'>Вхід</h2>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Пошта' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' />
        <button className={cn('btn', { active: email.length > 5 && password.length > 2 })} type='submit'>
          Увійти
        </button>
      </form>
      {loginRequestError && <span className='error-message'>{loginRequestError.message}</span>}
      <div className='auth-redirect'>
        <span>Ще не маєте облікового запису?</span>
        <Link className='auth-link' to='/registration'>
          Зареєструватись
        </Link>
      </div>
    </section>
  );
}
