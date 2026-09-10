import React, { useState, useEffect } from 'react';
import { 
  Mail, CheckCircle2, Clock, AlertCircle, Send, ExternalLink, 
  RefreshCw, Eye, X, User, Phone, Calendar, Truck, ShieldCheck, Sparkles 
} from 'lucide-react';
import { 
  getBookingRecords, 
  subscribeToBookings, 
  BookingRecord, 
  updateBookingRecordStatus 
} from '../services/bookingStore';
import { 
  TARGET_GMAIL, 
  sendEmailViaGmail, 
  getGmailComposeUrl, 
  buildPlainTextSummary 
} from '../services/gmail';
import { googleSignIn, initAuth, logout, getAccessToken } from '../services/auth';
import { User as FirebaseUser } from 'firebase/auth';

export const GmailInboxViewer: React.FC = () => {
  const [records, setRecords] = useState<BookingRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'demo' | 'tanker_order' | 'fleet_inquiry'>('all');
  const [selectedRecord, setSelectedRecord] = useState<BookingRecord | null>(null);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [testSending, setTestSending] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setRecords(getBookingRecords());
    const unsubStore = subscribeToBookings((updated) => setRecords(updated));

    const unsubAuth = initAuth(
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
      unsubStore();
      if (typeof unsubAuth === 'function') unsubAuth();
    };
  }, []);

  const handleSignIn = async () => {
    try {
      setAuthLoading(true);
      setNotificationMsg(null);
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setHasToken(!!res.accessToken);
        setNotificationMsg({
          type: 'success',
          text: `Google account connected! Automated Gmail dispatch to ${TARGET_GMAIL} is active.`,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in was canceled or failed';
      setNotificationMsg({ type: 'error', text: msg });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setHasToken(false);
      setNotificationMsg({ type: 'success', text: 'Disconnected from Google.' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendTestEmail = async () => {
    const token = await getAccessToken();
    if (!token) {
      setNotificationMsg({
        type: 'error',
        text: 'Please connect with Google first to authorize Gmail API dispatch.',
      });
      return;
    }

    try {
      setTestSending(true);
      setNotificationMsg(null);
      const result = await sendEmailViaGmail(token, {
        to: TARGET_GMAIL,
        subject: `[The Nabaa Tankers] 🔔 System Test Notification to ${TARGET_GMAIL}`,
        htmlBody: `
          <div style="font-family: sans-serif; background-color: #060c18; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #06b6d4;">
            <h2 style="color: #38bdf8; margin-top: 0;">The Nabaa Tankers - Gmail Dispatch Live Test</h2>
            <p>Your Gmail connection to <strong>${TARGET_GMAIL}</strong> is active and fully functional.</p>
            <p>Real-time booking confirmations and tanker orders will arrive at this address.</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 16px 0;" />
            <p style="font-size: 12px; color: #94a3b8;">Sent via Google Workspace Gmail API integration.</p>
          </div>
        `,
      });

      if (result.success) {
        setNotificationMsg({
          type: 'success',
          text: `Test email dispatched to ${TARGET_GMAIL}! Gmail Message ID: ${result.id}`,
        });
      } else {
        setNotificationMsg({
          type: 'error',
          text: result.error || 'Failed to dispatch test email',
        });
      }
    } catch (err: unknown) {
      setNotificationMsg({
        type: 'error',
        text: err instanceof Error ? err.message : 'Error sending email',
      });
    } finally {
      setTestSending(false);
    }
  };

  const handleDispatchRecord = async (rec: BookingRecord) => {
    const token = await getAccessToken();
    if (!token) {
      // Prompt user to connect
      await handleSignIn();
      return;
    }

    try {
      setSendingId(rec.id);
      setNotificationMsg(null);

      const result = await sendEmailViaGmail(token, {
        to: TARGET_GMAIL,
        subject: rec.title,
        htmlBody: rec.htmlContent,
        replyTo: rec.customerEmail,
      });

      if (result.success) {
        updateBookingRecordStatus(rec.id, 'sent', result.id);
        setNotificationMsg({
          type: 'success',
          text: `Email for ${rec.id} sent successfully to ${TARGET_GMAIL} (ID: ${result.id})!`,
        });
      } else {
        updateBookingRecordStatus(rec.id, 'failed', undefined, result.error);
        setNotificationMsg({
          type: 'error',
          text: `Failed to send email: ${result.error}`,
        });
      }
    } catch (e: unknown) {
      const errText = e instanceof Error ? e.message : 'Dispatch failed';
      updateBookingRecordStatus(rec.id, 'failed', undefined, errText);
      setNotificationMsg({ type: 'error', text: errText });
    } finally {
      setSendingId(null);
    }
  };

  const filtered = records.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.type === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Connection & Operations Status */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0a1835] via-[#07132a] to-[#040e20] border border-cyan-500/40 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Gmail Notifications Hub
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                To: {TARGET_GMAIL}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Every booking, demo walkthrough, and water tanker order is routed directly to <strong className="text-white">{TARGET_GMAIL}</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {hasToken ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Gmail API Connected</span>
                </div>

                <button
                  onClick={handleSendTestEmail}
                  disabled={testSending}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  {testSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{testSending ? 'Sending...' : 'Send Test Email'}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-mono transition-colors"
                  title="Disconnect Google account"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={authLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-lg shadow-cyan-500/10 cursor-pointer transition-all active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{authLoading ? 'Connecting...' : 'Connect Google for Direct Gmail API'}</span>
              </button>
            )}
          </div>
        </div>

        {notificationMsg && (
          <div className={`mt-3 p-2.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
            notificationMsg.type === 'success' 
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}>
            {notificationMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{notificationMsg.text}</span>
          </div>
        )}
      </div>

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Booking Emails', count: records.length },
            { id: 'demo', label: 'Demos & Meetings', count: records.filter(r => r.type === 'demo').length },
            { id: 'tanker_order', label: 'Water Orders', count: records.filter(r => r.type === 'tanker_order').length },
            { id: 'fleet_inquiry', label: 'Fleet Inquiries', count: records.filter(r => r.type === 'fleet_inquiry').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Target Inbox: <strong className="text-cyan-300">{TARGET_GMAIL}</strong>
        </div>
      </div>

      {/* Booking Records Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 font-mono border-b border-slate-800">
            <tr>
              <th className="p-3.5">Booking ID</th>
              <th className="p-3.5">Customer Name & Email</th>
              <th className="p-3.5">Phone / Contact</th>
              <th className="p-3.5">Type & Specifications</th>
              <th className="p-3.5">Date & Time</th>
              <th className="p-3.5">Gmail Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  No booking emails in this category yet.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const composeUrl = getGmailComposeUrl({
                  to: TARGET_GMAIL,
                  subject: r.title,
                  body: r.plainContent,
                });

                return (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-cyan-300 whitespace-nowrap">
                      {r.id}
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{r.customerName}</span>
                      </div>
                      <div className="text-[11px] text-cyan-300 font-mono font-semibold flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-cyan-400" />
                        <a href={`mailto:${r.customerEmail}`} className="hover:underline">{r.customerEmail}</a>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-emerald-300 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{r.customerPhone}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {r.type.replace('_', ' ')}
                      </span>
                      <div className="text-[11px] text-slate-300 mt-1 max-w-xs truncate">
                        {r.details?.topic || r.details?.tankerSize || r.title}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      {r.status === 'sent' ? (
                        <div className="space-y-0.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Dispatched to Gmail
                          </span>
                          {r.messageId && (
                            <div className="text-[9px] font-mono text-slate-500">
                              ID: {r.messageId.slice(0, 12)}...
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3 text-amber-400" />
                          Logged & Ready
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRecord(r)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                          title="Preview Full Email HTML"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View</span>
                        </button>

                        <a
                          href={composeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                          title={`Open pre-filled Gmail compose to ${TARGET_GMAIL}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Gmail Web</span>
                        </a>

                        <button
                          onClick={() => handleDispatchRecord(r)}
                          disabled={sendingId === r.id}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                          title="Send directly via Google Workspace Gmail API"
                        >
                          {sendingId === r.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          <span>Send API</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Email Preview Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">{selectedRecord.title}</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Recipient: <strong className="text-cyan-300">{TARGET_GMAIL}</strong> | From: {selectedRecord.customerEmail}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div 
                className="rounded-2xl border border-slate-800 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: selectedRecord.htmlContent }}
              />
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-mono">
                Booking Reference: <span className="text-white font-bold">{selectedRecord.id}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getGmailComposeUrl({
                    to: TARGET_GMAIL,
                    subject: selectedRecord.title,
                    body: selectedRecord.plainContent,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Gmail</span>
                </a>

                <button
                  onClick={() => {
                    handleDispatchRecord(selectedRecord);
                    setSelectedRecord(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch via Gmail API</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
