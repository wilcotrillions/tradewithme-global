import { redirect } from 'next/navigation';

// There is no verified administrator role or authorization schema in this repository.
// Deny access rather than exposing the illustrative admin console to customers.
export const dynamic = 'force-dynamic';
export default function AdminPage(): never {
  redirect('/dashboard');
}
