# Database Changes

We made **one critical change** to the database schema (`prisma/schema.prisma`) to support clean URLs (e.g., `/solutions/climate-resilient-coffee`).

## The Change

We added a `slug` field to the `Solution` model:

```prisma
model Solution {
  id          String   @id @default(cuid())
  code        String   @unique 
+ slug        String?  @unique  // We added this field
  title       String
  description String   @db.Text
  ...
}
```

## Why This Causes an Error

When your Next.js server started (38 minutes ago), it loaded the **old** database definition (without `slug`).

Our new code tries to run this query:
```typescript
prisma.solution.findFirst({
  where: { 
    OR: [
      { id: id },
      { slug: id } // <--- This line fails 
    ]
  }
})
```

Because the running server doesn't know `slug` exists in the database model, it throws the `Unknown argument 'slug'` error.

**Restarting the server (`Ctrl+C` then `npm run dev`) forces it to load the new definition.**
