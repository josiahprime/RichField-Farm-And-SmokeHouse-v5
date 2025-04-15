import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthStore } from '../../store/useAuthStore'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [googleSignIn, setGoogleSignIn] = useState(false); // Fix state name
  const {googleLogin} = useAuthStore()

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    await login({ email, password });

    const { authUser } = useAuthStore.getState();
    if (authUser) {
      const redirectPath = location.state?.from || '/'; // Go back to previous page or dashboard
      navigate(redirectPath, { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    //this code does the redirect to google login 
    await googleLogin();
  };

  // const { googleLogin } = useAuthStore();
  // const { isSignedIn, getToken } = useAuth(); // Get auth state & token



  // useEffect(() => {
  //   const loginWithGoogle = async () => {
  //     if (isSignedIn && googleSignIn) { // Only run if modal was opened
  //       try {
  //         const token = await getToken();
  //         await googleLogin({ token });
  //         navigate("/dashboard");
  //         setGoogleSignIn(false); // Close modal on success
  //       } catch (error) {
  //         console.error("Google login failed:", error);
  //       }
  //     }
  //   };
  
  //   loginWithGoogle();
  // }, [isSignedIn, googleSignIn]); // Runs when user logs in & modal is active

  return (
    <div className="flex h-screen relative">
      {/* Left Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/login.jpg')` }}
      >
        <div className="flex flex-col justify-center h-full text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Turn Your Ideas into Reality</h1>
          <p className="text-lg">
            Start for free and get attractive offers from the community
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96">
          <div className="uppercase text-2xl font-bold mb-4">
            Rich<span className="text-green-500">Field</span>
          </div>
          <h3 className="text-xl mb-4">Login</h3>
          <p className="mb-6 text-gray-600">
            Welcome Back! Please enter your details.
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={handlePasswordToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me for 30 days
              </label>
              <a
                href=""
                className="text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/request-reset-password');
                }}
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 rounded-md font-semibold ${
                isLoggingIn
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isLoggingIn ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-t flex-grow"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="border-t flex-grow"></div>
          </div>

          <button
            className="w-full border py-3 rounded-md font-semibold flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <img src="/images/googleIcon.png" alt="Google logo" width={24} height={24} className="mr-2" />
            Sign in with Google
          </button>

          


          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{' '}
            <a
              href="/signup"
              className="text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
