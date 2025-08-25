'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return { error: 'SERVER_CONFIGURATION_ERROR' };
  }

  if (username === adminUsername && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin-token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    redirect('/es/admin/puppys');
  }

  return { error: 'INVALID_CREDENTIALS' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-token');
  redirect('/es');
}
