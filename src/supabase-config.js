
import { createClient } from '@supabase/supabase-js'
// import { Database } from './DatabaseDefinitions'


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY 
const supabase = createClient(supabaseUrl, supabaseKey)
// const supabase = createClient<Database>(supabaseUrl ,supabaseKey )
export default supabase;



