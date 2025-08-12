import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { quotes, replies } from "$lib/server/db/schema";


export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }
    
    
     const replyCount = await db
    .select({
id: replies.id    })
    .from(replies);

  // Count unreplied quotes
  const unrepliedCount = await db
    .select({
        id: quotes.id
     })
    .from(quotes);


  return {
    replyCount,
    unrepliedCount,
  };
};
