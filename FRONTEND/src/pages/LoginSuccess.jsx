import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const REACT_APP_BACKEND_URL =
  import.meta.env.VITE_WEBSITE_URL || 'http://localhost:4000';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setauthenticatedUser, setProfile } = useAuth();

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/user/my-profile`, {
        withCredentials: true,
      })
      .then((res) => {
        // ✅ Auth success
        setauthenticatedUser(true);
        setProfile(res.data.user);

        toast.success('Login successful!');

        // ✅ ALWAYS go to HOME PAGE only
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        // 🚫 Deactivated user
        if (
          status === 403 &&
          message?.toLowerCase().includes('deactivated')
        ) {
          toast.error(
            'Your account is deactivated. Please mail admin to activate your account again.'
          );

          // ✅ Redirect to HOME only
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);

          return;
        }

        // ❌ Any other auth failure → login page
        navigate('/login', { replace: true });
      });
  }, [navigate, setauthenticatedUser, setProfile]);

  return <div>Logging in...</div>;
};

export default LoginSuccess;
