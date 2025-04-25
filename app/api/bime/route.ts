import { serverAxiosInstance } from "@/app/http/axiosInstance";
import { SubmitOrderRq } from "@/app/types/order";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await serverAxiosInstance.get("/my-addresses");
    const cookies = response.headers["set-cookie"];

    return NextResponse.json({
      data: response.data,
      cookie: cookies?.[0],
    });
  } catch (e) {
    if (isAxiosError(e)) {
      return NextResponse.json({ error: "Failed to submit order" }, { status: e.response?.status || 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmitOrderRq = await request.json();
    const { session, ...rest } = body;

    const response = await serverAxiosInstance.post("/order/completion/", rest, {
      headers: {
        Cookie: session,
      },
    });

    return NextResponse.json(response.data);
  } catch (e) {
    if (isAxiosError(e)) {
      return NextResponse.json({ error: "Failed to submit order" }, { status: e.response?.status || 500 });
    }
  }
}
