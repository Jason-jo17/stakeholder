# Issue: Runtime PrismaClientValidationError (Unknown argument `slug`)

You are encountering a **runtime error** because the running Next.js development server is using an outdated, cached version of the Prisma Client that does not know about the `slug` field we just added.

## Solution

To fix this, you **must restart your development server** so it loads the generated client.

1.  **Stop the server:** Go to the terminal running `npm run dev` and press `Ctrl+C`.
2.  **Restart the server:** Run `npm run dev` again.
3.  **Refresh the page:** The error should be resolved.

### Stuck? ("Port 3000 is in use" / "Unable to acquire lock")

If you see an error about **Port 3000 being in use** or **Unable to acquire lock**, it means the old server wasn't stopped properly.

**Run this command to force-stop it:**
```bash
npx kill-port 3000
```
Then try `npm run dev` again.

The red squiggly lines (`Property 'slug' does not exist...`) in VS Code are for the same reason: the editor's TypeScript server is using cached definitions.

**To fix in VS Code:**
1.  Open Command Palette (`Ctrl+Shift+P`).
2.  Type **"TypeScript: Restart TS Server"**.
3.  Press Enter.
