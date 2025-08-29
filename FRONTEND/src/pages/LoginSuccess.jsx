import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setauthenticatedUser, setProfile } = useAuth();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/user/my-profile', { withCredentials: true })
      .then((res) => {
        setauthenticatedUser(true);
        setProfile(res.data.user);
        toast.success('Login successful!');
        navigate('/', { replace: true });
      })
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default LoginSuccess;
