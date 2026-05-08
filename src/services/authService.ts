import { supabase, supabaseAnonKey } from '../lib/supabase';
import { auth } from '../lib/firebase';

export interface VerifyOtpResponse {
  success: boolean;
  customToken?: string;
  uid?: string;
  error?: string;
}

export const authService = {
  /**
   * Verifies the OTP via the security-server gateway.
   * This endpoint should be public on the security-server.
   */
  verifyOtp: async (otp: string): Promise<VerifyOtpResponse> => {
    try {
      const { data, error } = await supabase.functions.invoke('security-server', {
        body: {
          target_service: 'web-auth-handler',
          action: 'verify_web_otp',
          otp: otp,
          current_version_code: 1, 
        },
        headers: {
          apikey: supabaseAnonKey,
          Authorization: '' 
        }
      });

      if (error) {
        console.error('Supabase function invocation error:', error);
        return { success: false, error: error.message || 'Verification failed at gateway' };
      }

      if (data && !data.success) {
        return { success: false, error: data.error || 'Invalid OTP' };
      }

      return {
        success: true,
        customToken: data.customToken,
        uid: data.uid,
      };
    } catch (err: any) {
      console.error('Verify OTP catch error:', err);
      return { success: false, error: err.message || 'An unexpected error occurred' };
    }
  },

  /**
   * Calls the security-server with a Firebase ID token for authentication.
   */
  invokeAuthenticated: async (targetService: string, action: string, payload: any = {}, manualToken?: string) => {
    try {
      const idToken = manualToken || (await auth.currentUser?.getIdToken(true));
      
      if (!idToken) {
        throw new Error('User not authenticated - ID token missing');
      }

      const { data, error } = await supabase.functions.invoke('security-server', {
        body: {
          target_service: targetService,
          action: action,
          ...payload,
          current_version_code: 1,
        },
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${idToken}`
        }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error(`Error invoking ${targetService}/${action}:`, error);
      throw error;
    }
  }
};
