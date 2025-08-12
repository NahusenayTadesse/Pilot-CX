import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

import { invalidateSession, deleteSessionTokenCookie, sessionCookieName } from '$lib/server/auth';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';


export const actions: Actions = {    
  logout: async (event) => {
        const token = event.cookies.get(sessionCookieName);
        if (token) {
            // Hash token to get session ID
            const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
            // Remove from DB
            await invalidateSession(sessionId);
            // Remove cookie
            deleteSessionTokenCookie(event);
        }

        return redirect(303, "/");
    }
  };