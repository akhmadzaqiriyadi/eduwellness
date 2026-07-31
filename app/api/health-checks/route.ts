import { NextResponse } from 'next/server';
import { supabase, HealthCheckRecord } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const inMemoryHistory: HealthCheckRecord[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // Privacy Rule: If no email parameter is passed, return empty array for privacy
  if (!email) {
    return NextResponse.json({ success: true, data: [] });
  }

  let supabaseRecords: HealthCheckRecord[] = [];

  try {
    const { data, error } = await supabase
      .from('health_checks')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      supabaseRecords = data;
    }
  } catch (err) {
    console.warn('Supabase fetch error:', err);
  }

  // Filter in-memory records strictly by logged in user email
  const memRecords = inMemoryHistory.filter(h => h.user_email === email);

  // Merge Supabase records and memory records, deduplicating by ID/created_at
  const recordMap = new Map<string, HealthCheckRecord>();
  for (const item of [...memRecords, ...supabaseRecords]) {
    const key = item.id || `${item.user_email}_${item.created_at}`;
    if (!recordMap.has(key)) {
      recordMap.set(key, item);
    }
  }

  const combined = Array.from(recordMap.values()).sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });

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

    let status = 'Normal ✅';
    if (suhu_objek >= 37.5) status = 'Demam ⚠️';
    else if (suhu_objek <= 35.0) status = 'Hipotermia ⚠️';
    else if (bpm > 100) status = 'Takikardia (Denyut Tinggi) ⚠️';

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

      if (!error && data && data.length > 0) {
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
