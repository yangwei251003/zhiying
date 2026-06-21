import { NextRequest, NextResponse } from "next/server";

/**
 * 知识库收集 AI 对话接口
 * 接收用户输入 + 历史 → 调用 AI → 返回回复
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { kb_id, module, message, history } = body;

    if (!kb_id || !module || !message) {
      return NextResponse.json(
        { error: { code: "INVALID_REQUEST", message: "缺少必要参数" } },
        { status: 400 }
      );
    }

    // TODO: 实际接入 OpenAI / 兼容接口
    // 这里返回一个降级响应，让前端可以继续走流程
    const lowerMsg = message.toLowerCase();

    // 简单的规则判断模块是否完成
    const moduleComplete =
      message.length > 30 ||
      lowerMsg.includes("完成") ||
      lowerMsg.includes("下个") ||
      lowerMsg.includes("next");

    let reply = "收到你的信息。";
    if (moduleComplete) {
      reply = `「${module}」模块的信息已记录。我们可以继续下一个模块。`;
    } else if (message.length < 10) {
      reply = "能再具体一点吗？比如具体做了什么、有什么可衡量的结果？";
    } else {
      reply = "很好，继续。还有要补充的吗？输入"完成"可以进入下一个模块。";
    }

    return NextResponse.json({
      data: {
        reply,
        module_complete: moduleComplete,
        options: moduleComplete
          ? ["继续下一模块", "我想补充这个模块"]
          : ["我已完成这个模块", "需要帮助"],
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "AI 服务暂时不可用",
        },
      },
      { status: 500 }
    );
  }
}
