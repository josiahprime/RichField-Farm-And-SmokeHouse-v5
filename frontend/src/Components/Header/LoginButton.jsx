import React from 'react'
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button
            className="max-lg:hidden px-6 py-3 text-sm text-white rounded-sm border-2 border-[#dfe0df] bg-[#153d38] hover:bg-[#0c201e]"
            onClick={() => {
            navigate("/login");
            }}
        >
            Log In
        </button>

    </div>
  )
}

export default LoginButton
