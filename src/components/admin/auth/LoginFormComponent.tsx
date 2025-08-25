'use client';

import { useFormState } from 'react-dom';
import { loginAction } from '@/actions/authActions';
import FormInputComponent from '@/components/ui/FormInputComponent';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';
import { Dictionary } from '@/lib/types/dictionary';

interface LoginFormComponentProps {
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function LoginFormComponent({
  dict,
  locale,
  className = '',
}: LoginFormComponentProps) {
  const [state, formAction] = useFormState(loginAction, { success: true });

  return (
    <div className={`mx-auto max-w-md ${className}`}>
      <form action={formAction} className="space-y-6">
        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500">
              <span className="text-2xl font-bold text-white">P</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Acceso Administrador</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa tus credenciales para acceder al panel administrativo
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Usuario *
              </label>
              <input
                name="username"
                type="text"
                required
                placeholder="Ingresa tu usuario"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Contraseña *
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Ingresa tu contraseña"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <PrimaryButtonComponent
              type="submit"
              fullWidth
              size="lg"
            >
              Iniciar Sesión
            </PrimaryButtonComponent>
          </div>
        </div>
      </form>
    </div>
  );
}
