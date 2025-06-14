import * as all from "msw";

// MSW v1.2.1 doesn't support named exports cleanly with Vite.
// This provides a reliable fallback shim.
export const rest = all.rest;
