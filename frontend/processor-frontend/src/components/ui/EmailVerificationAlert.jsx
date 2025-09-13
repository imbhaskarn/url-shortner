import React, { useEffect, useState } from 'react';
import { Shield, X, Mail, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from './alert';

const EmailVerificationAlert = ({ emailVerified, resendVerificationEmail }) => {
    if (emailVerified) return null;

    const [visible, setVisible] = useState(true);
    const [isResending, setIsResending] = useState(false);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            setVisible(true);
        }, 600000);
    };

    const handleResend = async () => {
        setIsResending(true);
        await resendVerificationEmail();
        setTimeout(() => setIsResending(false), 2000);
    };

    if (!visible) return null;

    return (
        <Alert className="top-0 w-full bg-yellow-400 text-black p-3 shadow-md z-50">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between">
                {/* Icon and Text - Full width on mobile */}
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <div className="animate-pulse shrink-0">
                        <Shield className="h-5 w-5 text-yellow-400" />
                    </div>
                    <AlertDescription className="text-sm">
                        <span className="font-medium">Verification Required:</span>{' '}
                        <span className="opacity-90">Verify email to access features</span>
                    </AlertDescription>
                </div>
                
                {/* Buttons - Stack on mobile */}
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="flex-1 sm:flex-none flex items-center justify-center space-x-2 
                                 rounded-lg bg-indigo-600/30 px-4 py-2 min-h-[40px]
                                 transition-all hover:bg-indigo-600/50 focus:ring-2 
                                 focus:ring-indigo-500 focus:ring-offset-2 
                                 focus:ring-offset-indigo-900 touch-manipulation"
                    >
                        {isResending ? (
                            <RefreshCw className="h-4 w-4 animate-spin text-yellow-400" />
                        ) : (
                            <Mail className="h-4 w-4 text-yellow-400" />
                        )}
                        <span className="text-sm font-medium">
                            {isResending ? 'Sending...' : 'Resend'}
                        </span>
                    </button>
                    
                    <button
                        onClick={handleClose}
                        className="rounded-lg p-2 min-h-[40px] min-w-[40px] flex items-center justify-center
                                 text-black/80 transition-colors hover:bg-white/10 
                                 hover:text-white focus:outline-none focus:ring-2 
                                 focus:ring-white/20 touch-manipulation"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </Alert>
    );
};

export default EmailVerificationAlert;