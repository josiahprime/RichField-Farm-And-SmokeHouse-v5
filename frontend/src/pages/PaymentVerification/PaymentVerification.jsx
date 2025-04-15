import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import useCheckoutStore from "../../store/useCheckoutStore";

export default function PaymentVerification() {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");
    
    const { verifyPayment, status, message } = useCheckoutStore();

    useEffect(() => {
        if (reference) {
            verifyPayment(reference);
        }
    }, [reference, verifyPayment]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            <motion.div 
                className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {status === "loading" && (
                    <p className="text-lg font-medium text-gray-700 animate-pulse">Verifying payment...</p>
                )}
                {status === "success" && (
                    <div>
                        <SuccessIcon />
                        <h2 className="text-2xl font-semibold text-green-600">{message}</h2>
                        <p className="text-gray-600 mt-2">Thank you for your payment. Your transaction was successful! 🎉</p>
                        <a href="/" className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
                            Go to Dashboard
                        </a>
                    </div>
                )}
                {status === "error" && (
                    <div>
                        <ErrorIcon />
                        <h2 className="text-2xl font-semibold text-red-600">{message}</h2>
                        <p className="text-gray-600 mt-2">Please contact support if this persists.</p>
                        <a href="/" className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                            Retry Payment
                        </a>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

function SuccessIcon() {
    return (
        <svg className="text-green-500 w-20 h-20 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

function ErrorIcon() {
    return (
        <svg className="text-red-500 w-20 h-20 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6" />
            <path d="M9 9l6 6" />
        </svg>
    );
}
