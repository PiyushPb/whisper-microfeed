# Design Notes

## Routing Choice
This project uses **Next.js route handlers** for server logic rather than server actions. Route handlers provide a clear separation of API concerns from UI components and follow familiar REST conventions, which makes the endpoints explicit and easier to test in isolation. This approach also allows granular control over HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`) while keeping the client-side React components focused on rendering and user interaction.

## Validation and Error Handling
All client inputs are validated with **Zod** on both the client and server. This ensures consistent validation rules and prevents invalid data from reaching the database. Error handling is intentionally lightweight to keep the user informed without blocking the main flows; toasts and generic messages are used to surface issues. More detailed error states could be added in a production setting.

## Optimistic UI
Optimistic updates are implemented for both post creation and like/unlike interactions. The UI is updated immediately in response to user actions, providing a fast and responsive feel. Supabase serves as the ultimate source of truth; in case of backend failures, the UI reverts to a consistent state. This approach balances responsiveness with data integrity.

## Security and RLS
**Row Level Security (RLS)** in Supabase enforces ownership rules. Users can only insert, update, or delete their own posts, and can only like/unlike posts as themselves. All posts and profiles remain publicly readable. This ensures correct access control at the database level, independent of client logic.

---

# Trade-offs and Timeboxing

This project was developed with a focus on correctness, structure, and core functionality, while deliberately time-boxing advanced features:

- **Email verification** was skipped to prioritize core authentication and posting flows.  
- **Error handling** is minimal, with generic messages instead of detailed error-specific feedback.  
- **Styling** is modest and functional, focusing on clarity rather than visual polish.  
- **Automated tests** and edge-case handling were de-prioritized in favor of completing essential user flows.  

These trade-offs allowed the project to deliver a clear, working prototype within limited time while leaving room for future refinement in production.

Github Repo : [https://github.com/PiyushPb/whisper-microfeed](https://github.com/PiyushPb/whisper-microfeed)
Live demo : [https://whisper-micro-feed.vercel.app/](https://whisper-micro-feed.vercel.app/)
