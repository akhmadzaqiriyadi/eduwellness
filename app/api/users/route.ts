import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Email query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      console.warn('Supabase users GET notice:', error.message);
      return NextResponse.json({ success: true, data: null });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: true, data: null });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, school, grade, role } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const payload = {
      email: cleanEmail,
      full_name: full_name || cleanEmail.split('@')[0],
      school: school || 'SMP N 1 SEYEGAN',
      grade: grade || 'Kelas VII',
      role: role || 'user',
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('users')
        .upsert([payload], { onConflict: 'email' })
        .select();

      if (error) {
        console.warn('Supabase users upsert notice:', error.message);
      } else if (data && data.length > 0) {
        return NextResponse.json({ success: true, data: data[0] });
      }
    } catch (dbErr) {
      console.warn('Supabase users upsert exception:', dbErr);
    }

    return NextResponse.json({ success: true, data: payload });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui profil', error: error.message },
      { status: 400 }
    );
  }
}
