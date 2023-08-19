const  dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');


dotenv.config();
const {SUPABASE_ANON_KEY } = process.env;
const supabaseUrl = 'https://jltpalikdmdmcthdhswq.supabase.co'
const supabaseKey = SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey, {
    persistSession: false, // Disable session persistence
  });

module.exports = { supabase };
