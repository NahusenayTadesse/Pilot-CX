import type { Actions, PageServerLoad } from "./$types";
import { db } from '$lib/server/db';
import { desc, eq } from "drizzle-orm";
import { quotes, replies } from '$lib/server/db/schema';
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    try {
        const allquotes = await db.select({
            id: quotes.id,
            firstName: quotes.firstName,
            lastName: quotes.lastName,
            email: quotes.email,
            phone: quotes.phone,
            submittedAt: quotes.submittedAt
        })
        .from(quotes)
        .orderBy(desc(quotes.submittedAt));

        return { success: true, allquotes };
    } catch (error) {
        console.error("Error loading quotes:", error);
        return { success: false, error: "Failed to load quotes" };
    }
};

export const actions: Actions = {
    delete: async ({ request }) => {
        try {
            const formData = await request.formData();
            const id = formData.get('id') as string;

            if (!id) {
                return { success: false, error: "Missing ID" };
            }

            await db.delete(quotes).where(eq(quotes.id, id));
            await db.delete(replies).where(eq(replies.quoteId, id));


            return { success: true, message: 'Quote Successfully Deleted' };
        } catch (error) {
            console.error("Error deleting quote:", error);
            return { success: false, message: "Failed to delete quote" };
        }
    }
};
