'use client';

import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';
import { GOOGLE_CLIENT_ID } from '@/api/constants';
import { useGoogleLogin } from '../hooks/useGoogleLogin';

interface SsoActionsProps {
  className?: string;
}

export const SsoActions = ({ className }: SsoActionsProps) => {
  const [nonce] = useState(() => crypto.randomUUID());
  const { mutate } = useGoogleLogin();

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <div className={cn('mt-4 space-y-4', className)}>
      <div className="flex items-center gap-3">
        <span className="bg-border h-px flex-1" />
        <span className="text-muted text-xs">or</span>
        <span className="bg-border h-px flex-1" />
      </div>

      <div className="flex w-full justify-center">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            nonce={nonce}
            text="continue_with"
            onSuccess={(credentialResponse) => {
              if (!credentialResponse.credential) {
                toast.error('Google did not return a credential. Please try again.');
                return;
              }
              mutate({ id_token: credentialResponse.credential, nonce });
            }}
            onError={() => toast.error('Google sign-in was cancelled or failed.')}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};
