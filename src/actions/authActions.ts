'use server';

import { signIn, signOut } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

export async function loginAction(
  _prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
      return {
        success: false,
        error: 'Usuario y contraseña son requeridos',
      };
    }

    await signIn('credentials', {
      username,
      password,
      redirectTo: '/es/admin/puppys',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            error: 'Credenciales inválidas',
          };
        default:
          return {
            success: false,
            error: 'Error en la autenticación',
          };
      }
    }
    throw error;
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: '/es/admin/login' });
}
