import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle, RefreshCw, Send, LogOut, ShieldCheck } from 'lucide-react';
import { googleSignIn, initAuth, logout, getAccessToken } from '../services/auth';
import { TARGET_GMAIL, sendEmailViaGmail } from '../services/gmail';
import { User } from 'firebase/auth';

interface GmailIntegrationBadgeProps {
  compact?: boolean;
}

export const GmailIntegrationBadge: React.FC<GmailIntegrationBadgeProps> = ({ compact = false }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasToken(!!token);
      },
      () => {
        setCurrentUser(null);
        setHasToken(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setHasToken(!!res.accessToken);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setHasToken(false);
      setTestStatus('idle');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTestEmail = async () => {
    const token = await getAccessToken();
    if (!token) {
      setErrorMessage('Please sign in first to obtain a valid Gmail access token.');
      return;
    }

    try {
      setTestStatus('sending');
      setErrorMessage(null);

      const result = await sendEmailViaGmail(token, {
        to: TARGET_GMAIL,
        subject: `[The Nabaa Tankers] 🔔 Test Notification to ${TARGET_GMAIL}`,
        htmlBody: `
          <div style="font-family: sans-serif; background-color: #060c18; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #06b6d4;">
            <h2 style="color: #38bdf8; margin-top: 0;">The Nabaa Tankers - Gmail Integration Test</h2>
            <p>Your Gmail connection to <strong>${TARGET_GMAIL}</strong> is working successfully!</p>
            <p>Any booking or tanker dispatch on the platform will automatically trigger real-time email notifications to this address.</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 16px 0;" />
            <p style="font-size: 12px; color: #94a3b8;">Sent via Google Workspace Gmail API integration.</p>
          </div>
        `,
      });

      if (result.success) {
        setTestStatus('success');
        setTimeout(() => setTestStatus('idle'), 5000);
      } else {
        setTestStatus('error');
        setErrorMessage(result.error || 'Failed to send test email');
      }
    } catch (err: unknown) {
      setTestStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error sending email');
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono">
        {hasToken ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gmail: {TARGET_GMAIL}</span>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect {TARGET_GMAIL}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-2xl bg-[#09152b]/90 border border-cyan-500/30 text-slate-200 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Gmail Dispatch Notification
              </span>
              {hasToken ? (
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Ready to Connect
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Direct inbox: <strong className="text-cyan-300">{TARGET_GMAIL}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasToken ? (
            <>
              <button
                onClick={handleSendTestEmail}
                disabled={testStatus === 'sending'}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                title="Send test email to thenabaatankers@gmail.com"
              >
                {testStatus === 'sending' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{testStatus === 'sending' ? 'Sending...' : 'Send Test Email'}</span>
              </button>

              <button
                onClick={handleSignOut}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
                title="Sign out of Google"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Official Google Sign In Button */
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-70"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{loading ? 'Connecting...' : 'Connect with Google'}</span>
            </button>
          )}
        </div>
      </div>

      {testStatus === 'success' && (
        <div className="mt-2 text-[11px] text-emerald-300 font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Test email dispatched successfully to {TARGET_GMAIL}! Check your Gmail inbox.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-2 text-[11px] text-rose-300 font-mono flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
