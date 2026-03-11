// Temporary untyped client wrapper until generated types are synced with the database schema.
// Use this for queries to tables not yet in the generated types.
import { supabase } from './client';

export const supabaseUntyped = supabase as any;
