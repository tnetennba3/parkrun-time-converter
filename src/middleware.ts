import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = "https://5krun.co.uk";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "10 m"),
});

export const middleware = async (req: NextRequest) => {
  const origin = req.headers.get("origin");

  if (origin && origin !== allowedOrigin) {
    return new NextResponse("Forbidden origin", { status: 403 });
  }

  const ip = ipAddress(req) || "unknown";
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Rate limit exceeded", { status: 429 });
  }

  const res = NextResponse.next();

  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());
  res.headers.set("X-RateLimit-Reset", reset.toString());

  return res;
};

export const config = {
  matcher: ["/api/:path*"],
};
