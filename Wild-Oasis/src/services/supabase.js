import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://zcqqcqfbpeweqeruzyss.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjcXFjcWZicGV3ZXFlcnV6eXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwOTUwMTYsImV4cCI6MjA4NzY3MTAxNn0.xH8e70M6yKIz-pYlsOaL-7nc2-J6nKhFiwkvBiLGrNE';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
