// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URLJ;
const supabaseKey = process.env.SUPABASE_KEYJ;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
