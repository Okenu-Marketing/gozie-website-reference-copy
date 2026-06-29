# Antigravity IDE Memory / Rules
- **Always double check port conflicts and server statuses.** When starting a local development server (like Vite or React), do not blindly trust the terminal output stating "Local: http://localhost:8080/". Before giving the user a link or opening the browser, verify:
  1. No other service was already running on that port.
  2. Perform a local `curl` to ensure the server is responding with the expected application, rather than returning a 404 from a silent port conflict.
  3. If a port conflict is suspected, modify the configuration (e.g., `vite.config.ts`) to use a guaranteed free port.

- **Writing Copy & Titles for Videos:** Always prioritize the literal first 10 seconds of a transcript to find the spoken hook. Do not rely on generic marketing templates or carry over assumptions about the target audience from previous chats. The title should create exact continuity with the spoken words at the beginning of the video (e.g., if the user says "I am going to show you exactly what I build", the title should be "Exactly what I will build for you").
