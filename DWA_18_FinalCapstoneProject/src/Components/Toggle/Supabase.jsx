import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpboqkbihekgbycohpmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYm9xa2JpaGVrZ2J5Y29ocG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA2ODI3NzEsImV4cCI6MjAwNjI1ODc3MX0.nEBFXhShC5UmnCQtQ-z3ysShWDxzLzIvsZDlo8zKTEM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
