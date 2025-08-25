'use client';

import { useState } from 'react';
import { loginAction } from '@/actions/authActions';
import FormInputComponent from '@/components/ui/FormInputComponent';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';

interface LoginFormProps {
  dict: any;
  className?: string;
}

export default function LoginFormComponent({
  dict,
  className = '',
}: LoginFormProps) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        if (result.error === 'INVALID_CREDENTIALS') {
          setError(dict.admin.auth.login.error);
        } else if (result.error === 'SERVER_CONFIGURATION_ERROR') {
          setError('Error de configuración del servidor');
        } else {
          setError('Error de conexión');
        }
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`rounded-lg bg-white p-8 shadow-lg ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <FormInputComponent
          type="text"
          name="username"
          label={dict.admin.auth.login.username}
          placeholder={`Ingresa tu ${dict.admin.auth.login.username.toLowerCase()}`}
          required
          disabled={loading}
        />

        <FormInputComponent
          type="password"
          name="password"
          label={dict.admin.auth.login.password}
          placeholder={`Ingresa tu ${dict.admin.auth.login.password.toLowerCase()}`}
          required
          disabled={loading}
        />

        <PrimaryButtonComponent
          type="submit"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : dict.admin.auth.login.submit}
        </PrimaryButtonComponent>
      </form>
    </div>
  );
}
