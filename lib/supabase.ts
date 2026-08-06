import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sobsqatohvodtwecatox.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_3h35LdcseXFpdxWWHjKIPQ_Zl6iq6Y3';

export const supabase = createClient(supabaseUrl, supabaseKey);



// Interfaces
export interface HealthCheckRecord {
  id?: string;
  user_id?: string;
  user_email?: string;
  suhu_objek: number;
  suhu_ambient: number;
  bpm: number;
  status_kesehatan: string;
  created_at?: string;
}

export interface LiveSensorState {
  suhuObjek: number;
  suhuAmbient: number;
  bpm: number;
  updatedAt: string;
  deviceId?: string;
  wifiSsid?: string;
  isWifiConnected?: boolean;
}

// In-Memory Live State Fallback for real-time IoT polling
export let globalLiveState: LiveSensorState = {
  suhuObjek: 36.5,
  suhuAmbient: 29.8,
  bpm: 0,
  updatedAt: new Date(0).toISOString(),
  deviceId: 'WEMOS-D1-SMPN1SEYEGAN',
  wifiSsid: 'SMPN1SEYEGAN-Network',
  isWifiConnected: false,
};

export function updateGlobalLiveState(data: {
  suhuObjek: number;
  suhuAmbient: number;
  bpm: number;
  deviceId?: string;
  wifiSsid?: string;
}) {
  globalLiveState = {
    ...data,
    updatedAt: new Date().toISOString(),
    deviceId: data.deviceId || 'WEMOS-D1-SMPN1SEYEGAN',
    wifiSsid: data.wifiSsid || 'SMPN1SEYEGAN-Network',
    isWifiConnected: true,
  };
}
