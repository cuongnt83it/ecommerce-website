import {useState,useContext} from 'react';
import { set, useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const [mode,setMode] = useState('login');
  const [error,setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {signup, login, user} = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setError(null);
    // alert(data.email + " " + data.password);
    let result;
    if(mode === 'login') {
      result = login(data.email, data.password);
    } else{
      result = signup(data.email, data.password);
    }            
    if(!result.success) {
      setError(result.error);
    } else {

      setError(null);
      navigate('/');
    }
  }
  return (
    <div className='page'>
      <div className="container">
        <div className="auth-container">
          {user && <div className='auth-success'>Welcome, {user.email}!</div>}
        <h1 className='page-title'>{mode === 'login' ? 'Login' : 'Sign In'}</h1>
        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          {error && <div className='error-message'>{error}</div>}
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' className='form-input' placeholder='Enter your email'
             {...register('email', { required: 'Email is required' })} /> 
             {errors.email && <span className='form-error'>{errors.email.message}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' className='form-input' placeholder='Enter your password'
             {...register('password', 
             { required: 'Password is required', 
             minLength: { value: 6, message: "Password must be at least 6 characters" },
             maxLength: { value: 12, message: "Password must be less than 12 characters" }
             })} /> 
             {errors.password && <span className='form-error'>{errors.password.message}</span>}
          </div>
        
        <button className='btn btn-primary bt-large' type='submit'>{mode === 'login' ? 'Login' : 'Sign In'}</button>
        <p className='auth-toggle'>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}  
          <span className='auth-link' onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
        </form>
       </div>
      </div>
    </div>
  )
}

export default Auth
