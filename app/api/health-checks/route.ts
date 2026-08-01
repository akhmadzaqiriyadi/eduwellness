import { NextResponse } from 'next/server';
import { supabase, HealthCheckRecord } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inMemoryHistory: HealthCheckRecord[] = [];

function deduplicate(records: HealthCheckRecord[]): HealthCheckRecord[] {
  const sorted = [...records].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });

  const result: HealthCheckRecord[] = [];
  for (const item of sorted) {
    const itemTime = item.created_at ? new Date(item.created_at).getTime() : 0;
    const isDup = result.some(ex => {
      if (ex.id && item.id && String(ex.id) === String(item.id)) return true;
      const exTime = ex.created_at ? new Date(ex.created_at).getTime() : 0;
      return (
        ex.user_email === item.user_email &&
        Math.abs(exTime - itemTime) < 10000 &&
        ex.bpm === item.bpm &&
        Math.abs(ex.suhu_objek - item.suhu_objek) < 0.1
      );
    });

    if (!isDup) {
      result.push(item);
    }
  }

  return result;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  let supabaseRecords: HealthCheckRecord[] = [];

  try {
    let query = supabase.from('health_checks').select('*').order('created_at', { ascending: false });
    if (email) {
      query = query.eq('user_email', email);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase SELECT error:', error.message);
    } else if (Array.isArray(data)) {
      supabaseRecords = data;
    }
  } catch (err) {
    console.warn('Supabase fetch exception:', err);
  }

  // Filter in-memory records: if email is provided, filter by email; otherwise return all records for Admin
  const memRecords = email 
    ? inMemoryHistory.filter(h => h.user_email === email)
    : inMemoryHistory;

  // Merge Supabase records and memory records with smart deduplication
  const combined = deduplicate([...memRecords, ...supabaseRecords]);

  return NextResponse.json({ success: true, data: combined });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { suhu_objek, suhu_ambient, bpm, user_email } = body;

    if (!user_email) {
      return NextResponse.json(
        { success: false, message: 'User email is required to save health check' },
        { status: 400 }
      );
    }

    let status = 'Normal';
    if (suhu_objek >= 37.5) {
      status = 'Demam';
    } else if (suhu_objek >= 32.0 && suhu_objek < 35.0) {
      status = 'Hipotermia';
    } else if (suhu_objek < 32.0) {
      status = 'Normal'; // Room air reading when sensor is not pressed on skin
    } else if (bpm > 100) {
      status = 'Takikardia (Denyut Tinggi)';
    }

    const newRecord: HealthCheckRecord = {
      id: Date.now().toString(),
      user_email: user_email,
      suhu_objek: parseFloat(suhu_objek),
      suhu_ambient: parseFloat(suhu_ambient || 30.0),
      bpm: parseInt(bpm || 0),
      status_kesehatan: status,
      created_at: new Date().toISOString(),
    };

    // Save to memory array fallback
    inMemoryHistory.unshift(newRecord);

    // Attempt Supabase insert
    try {
      const { data, error } = await supabase.from('health_checks').insert([{
        user_email: newRecord.user_email,
        suhu_objek: newRecord.suhu_objek,
        suhu_ambient: newRecord.suhu_ambient,
        bpm: newRecord.bpm,
        status_kesehatan: newRecord.status_kesehatan,
      }]).select();

      if (error) {
        console.warn('Supabase INSERT error:', error.message);
      } else if (data && data.length > 0) {
        return NextResponse.json({
          success: true,
          message: 'Berhasil menyimpan tes kesehatan ke Supabase',
          data: data[0],
        });
      }
    } catch (err) {
      console.warn('Supabase insert exception:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Berhasil menyimpan tes kesehatan',
      data: newRecord,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan data', error: error.message },
      { status: 400 }
    );
  }
}
