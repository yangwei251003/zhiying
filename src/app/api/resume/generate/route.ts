import { NextRequest, NextResponse } from "next/server";

/**
 * 简历生成接口
 * POST /api/resume/generate
 * 接收 match_id → 生成简历 → 返回内容 + 文件 URL
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { match_id, options } = body;

    if (!match_id) {
      return NextResponse.json(
        { error: { code: "INVALID_REQUEST", message: "缺少 match_id" } },
        { status: 400 }
      );
    }

    // TODO: 实际项目流程：
    // 1. 从 DB 查询 match 结果
    // 2. 调用 Python resumeWriter 生成 content_json + traceability_map
    // 3. 调用 Node.js build_resume.js 生成 .docx
    // 4. docx → PDF 转换 + pdfinfo 校验页数
    // 5. 上传到 Supabase Storage
    // 6. 返回完整结果

    const resume_id = `resume_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({
      data: {
        resume_id,
        status: "generated",
        content_json: {
          /* 简历内容 JSON */
        },
        traceability: [
          { sentence_index: 0, sentence_text: "示例", source_module: "core_experiences" },
        ],
        docx_url: `https://storage.example.com/${resume_id}.docx`,
        pdf_url: `https://storage.example.com/${resume_id}.pdf`,
        page_count: 1,
        word_count: 420,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "简历生成失败" } },
      { status: 500 }
    );
  }
}
