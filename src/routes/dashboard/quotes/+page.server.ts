import type { PageServerLoad } from "./$types";
import {db} from '$lib/server/db';

import {quotes} from '$lib/server/db/schema';


export const load: PageServerLoad = async () => {
     
    const allquotes = await db.select().from(quotes);

     
    
    return { allquotes};
}; 
