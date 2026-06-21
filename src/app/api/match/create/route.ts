import { NextRequest, NextResponse } from "next/server";

/**
 * 创建岗位匹配分析
 * POST /api/match/create
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { kb_id, jd_text, jd_image_url } = body;

    if (!kb_id || (!jd_text && !jd_image_url)) {
      return NextResponse.json(
        { error: { code: "INVALID_REQUEST", message: "缺少 kb_id 或 jd 内容" } },
        { status: 400 }
      );
    }

    // 生成 match_id（实际项目会写入数据库）
    const match_id = `match_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({
      data: {
        match_id,
        status: "processing",
        estimated_time_sec: 15,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "创建匹配失败" } },
      { status: 500 }
    );
  }
}
