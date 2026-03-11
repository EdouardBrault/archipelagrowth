import { useState, useEffect } from 'react';
import { supabaseUntyped as supabase } from '@/integrations/supabase/untyped-client';
import { Author, getAuthorFullName } from '@/types/author';

export const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('last_name', { ascending: true });

      if (error) {
        console.error('Error fetching authors:', error);
        return;
      }

      setAuthors(data || []);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAuthorOptions = () => {
    return authors.map(author => ({
      value: getAuthorFullName(author),
      label: getAuthorFullName(author),
      id: author.id
    }));
  };

  return { authors, loading, fetchAuthors, getAuthorOptions };
};
