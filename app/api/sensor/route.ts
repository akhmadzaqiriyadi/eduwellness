import { NextResponse } from 'next/server';
import { globalLiveState, updateGlobalLiveState } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET: Live Dashboard reads latest sensor data + Wi-Fi status
export async function GET() {
  const lastUpdatedTime = new Date(globalLiveState.updatedAt).getTime();
  const secondsAgo = Math.floor((Date.now() - lastUpdatedTime) / 1000);
  
  // Device is connected if data received within 10 seconds (gives buffer for HTTPS/SSL latency & Vercel cold starts)
  const isWifiConnected = secondsAgo < 10;

  return NextResponse.json({
    ...globalLiveState,
    isWifiConnected,
    secondsAgo,
  });
}

// POST: Wemos D1 Wi-Fi sends JSON sensor data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (typeof body.suhuObjek === 'number') {
      updateGlobalLiveState({
        suhuObjek: body.suhuObjek,
        suhuAmbient: body.suhuAmbient || 30.0,
        bpm: body.bpm || 0,
        deviceId: body.deviceId || 'WEMOS-D1-UTY',
        wifiSsid: body.wifiSsid || 'UTY-Network',
      });
      return NextResponse.json({ success: true, message: 'Data sensor diperbarui' });
    }

    return NextResponse.json({ success: false, message: 'Format data tidak valid' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error parsing JSON' }, { status: 400 });
  }
}
