import envConfig from "@/config/config";

/**
 * buildCorsHeaders - echo origin in production (if allowed) or use wildcard in dev.
 */
export function buildCorsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "";
  const allowed = [envConfig.NEXT_PUBLIC_BASE_URL, "http://localhost:3000"];
  const allowOrigin =
    process.env.NODE_ENV === "development"
      ? "*"
      : allowed.includes(origin)
      ? origin
      : envConfig.NEXT_PUBLIC_BASE_URL;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  } as Record<string, string>;
}