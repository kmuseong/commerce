import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 URL과 API
const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY);

export default supabase;
