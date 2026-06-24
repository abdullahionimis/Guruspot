import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
// We use the ANON key here to simulate a frontend client logging in
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getTestToken() {
  const email = 'testuser123@guruspot.com';
  const password = 'securepassword123';

  console.log(`Attempting to sign up dummy user: ${email}...`);
  
  // 1. Try to sign up the user
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // 2. If the user already exists, Supabase will return an error or empty session. 
  // In that case, we just log them in instead!
  if (error || !data.session) {
    console.log('User might already exist. Attempting to log in instead...');
    const loginResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    data = loginResponse.data;
    error = loginResponse.error;
  }

  if (error) {
    console.error('Failed to get token:', error.message);
    return;
  }

  console.log('\n✅ SUCCESS! Here is your JWT Token:');
  console.log('--------------------------------------------------');
  console.log(data.session?.access_token);
  console.log('--------------------------------------------------');
  console.log('\nUse this token in Postman. Set the header to:');
  console.log('Key: Authorization');
  console.log('Value: Bearer <paste_token_here>\n');
}

getTestToken();
