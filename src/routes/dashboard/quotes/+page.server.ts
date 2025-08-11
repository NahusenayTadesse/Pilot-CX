import type { PageServerLoad } from "./$types";
import {db} from '$lib/server/db';
import { asc, desc } from "drizzle-orm";

import {quotes} from '$lib/server/db/schema';


export const load: PageServerLoad = async () => {
     
    const allquotes = await db.select({
         id: quotes.id,
         firstName: quotes.firstName,
         lastName: quotes.lastName,
         email: quotes.email,
         phone: quotes.phone,
         submittedAt: quotes.submittedAt


    }).from(quotes).orderBy(desc(quotes.submittedAt));

     
    
    return { allquotes};
}; 
