// config.js
// Change this to false when deploying to production
const USE_LOCAL = true;

const LOCAL_API_URL = 'http://localhost:8000/api/v1';
const PROD_API_URL = 'https://skillswapph-production.up.railway.app/api/v1';

const API_URL = USE_LOCAL ? LOCAL_API_URL : PROD_API_URL;

const SUPABASE_URL = "https://ldislvvlqazikrijaanw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UxO6p4zr4LOJXZkD6EPRaA_O5D1mWLE";