import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey);

export const test = async (searchTerm, movie) => { 
    try {
      
        const { data: existingDoc, error: fetchError } = await supabase.from("metrics").select("*").eq("searchterm", searchTerm).maybeSingle();
        
        if (fetchError) throw fetchError;

        if (existingDoc) { 
            const {error: updateError} = await supabase
                .from('metrics')
                .update({ count: existingDoc.count + 1 })
                .eq('id', existingDoc.id);
            if(updateError) throw updateError;
        }
        else {
            // 3. Insert new row if it doesn't exist
            const { error: insertError } = await supabase
                .from('metrics')
                .insert([
                    {
                    searchterm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    }
                ]);
            
            if (insertError) throw insertError
        }
    
    }
    catch (error) {
     console.error("Supabase Error:", error);
    }
  
}



export const fecthMyDatabase = async () => { 

    try {
    const {data, error} = await supabase.from("metrics").select("*").order('count', {ascending: false}).limit(6);
        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Supabase Error:", error);
        return [];
    }
   
}