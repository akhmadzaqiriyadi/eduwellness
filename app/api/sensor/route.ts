import { NextResponse } from 'next/server';
import { globalLiveState, updateGlobalLiveState } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(globalLiveState, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { suhuObjek, suhuAmbient, bpm } = body;

    updateGlobalLiveState({
      suhuObjek: parseFloat(suhuObjek),
      suhuAmbient: parseFloat(suhuAmbient || 30.0),
      bpm: parseInt(bpm || 0),
    });

    return NextResponse.json({
      success: true,
      message: 'Data sensor berhasil diperbarui',
      data: globalLiveState,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload', error: error.message },
      { status: 400 }
    );
  }
}
