
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isVerifyingEmail: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isRequestingReset: false,

  
  

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('User registered successfully. A verification email has been sent to your inbox.');
      return true; // ✅ Return success
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      return false; // ❌ Return failure
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifyEmail: async (data) => {
    set({ isVerifyingEmail: true });
    try {
      console.log("Data sent to API:", data); // ✅ Logs the payload
  
      const res = await axiosInstance.post('/auth/verify-email', data);
      
      if (res.data.message === 'Email is already verified.') {
        toast.info('Your email is already verified.');
      } else {
        toast.success('User verified successfully.');
      }
  
      set({ authUser: res.data });
      return true; // ✅ Return success
    } catch (error) {
      console.error("Email verification error:", error);
      const errorMessage = error.response?.data?.message || 'Verification failed';
      toast.error(errorMessage);
      return false; // ❌ Return failure
    } finally {
      set((state) => (state.isVerifyingEmail ? { isVerifyingEmail: false } : state));
    }
},

  
  
  
  

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  googleLogin: async () => {
    console.log('this function was triggered')
    window.location.href = 'http://localhost:5001/api/auth/google'; // Redirect to Google OAuth
  },

  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/auth/fetch", { withCredentials: true });
  
      if (res.data && res.data.provider === "google") { 
        set({ authUser: { ...res.data, isGoogleUser: true } }); 
      } else {
        set({ authUser: res.data }); 
      }
  
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ authUser: null });
    }
  },
  

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post('/auth/update-profile', data);
      set({ authUser: res.data });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error in updateProfile:', error);
      toast.error(error.response?.data?.message || 'Profile update failed');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  requestPasswordReset: async (email) => {
    if (!email) {
      return toast.error('Email is required');
    }

    set({ isRequestingReset: true });

    try {
      const res = await axiosInstance.post('/auth/forgot-password', { email });
      toast.success(res.data.message || 'Reset link sent successfully');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to send reset link. Try again.'
      );
    } finally {
      set({ isRequestingReset: false });
    }
  },

  resetPassword: async ({ token, newPassword }) => {
    set({ isResettingPassword: true });
    try {
      const res = await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword,
      });

      toast.success('Password reset successfully. You can now log in.');
    } catch (error) {
      console.error('Reset Password Error:', error);
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      set({ isResettingPassword: false });
    }
  },

  getRole: () => {
    const { authUser } = useAuthStore.getState(); // ✅ Correct way to access state
    return authUser?.role || "guest";
  }
  

  
}));
