"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Github, Loader2 } from "lucide-react"; // Import Loader2 icon

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    if (email.endsWith('@plux.ai') && password === 'pluxai_strong_password_stats') {
      // Simulate an API call (replace with your actual login logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onLoginSuccess();
    } else {
      setError('Invalid email or password. Please use a @plux.ai email and the correct password.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen -mt-20">
      <div className="p-6 w-full max-w-sm bg-white rounded-xl shadow-md">
        <div className="flex items-center justify-center mb-6">
          <Github className="h-10 w-10 text-gray-800" />
          <span className="ml-2 text-xl font-semibold text-gray-800">Plux Login</span>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
          <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {/* Added Loader2 icon */}
            Login
          </Button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;