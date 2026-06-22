import { NextRequest, NextResponse } from "next/server";

const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY || "";
const ZHIPU_BASE_URL = process.env.ZHIPU_BASE_URL || "https://open.bigmodel.cn/api/paas/v4";
const ZHIPU_MODEL = process.env.ZHIPU_MODEL || "glm-4-flash";

const MODULE_GUIDES: Record<string, string> = {
  basic_info:
    "姓名、性别、求职意向（目标岗位）、意向城市。也请说说你当前的身份（大三/大四/研二/已毕业等）。",
  education:
    "学校名称、专业、学历、起止时间。核心课程和毕设方向也可以写上来——这些在匹配岗位时很关键。",
  core_experiences:
    "用「背景 → 具体做了什么 → 可衡量的结果」的格式，写 1-3 条最有分量的经历。每一条控制在 3-5 句话。",
  internships_jobs:
    "实习或工作经历。公司、职位、时间段，并按「问题 → 方案 → 结果」的结构说清楚。",
  projects:
    "项目经历。请区分「我做了什么」和「团队做了什么」，说明项目产出、用到的技术栈、你的角色。",
  skills:
    "按类别列出技能并标注熟练度（了解 / 基础 / 熟悉 / 熟练 / 精通）。分类参考：编程语言、框架工具、专业软件、语言能力、办公技能、软技能、行业知识。每项最好附一个能证明的场景。",
  certificates_honors:
    "证书、奖项、荣誉。请写颁发机构、时间、获奖范围（省级/国家级/校级）。",
  portfolio:
    "作品或案例。论文标题、代码仓库、设计链接、作品集——写标题、简短描述和链接即可。",
  self_reflection:
    "自我认知。说出 2+ 条优势和 2+ 条短板，不要写空话——每条都要用一个具体例子说明。最后可以用一两句总结你的核心竞争力和职业目标。",
};

const MODULE_LABELS: Record<string, string> = {
  basic_info: "基本信息",
  education: "教育经历",
  core_experiences: "核心经历",
  internships_jobs: "实习/工作",
  projects: "项目经历",
  skills: "技能清单",
  certificates_honors: "证书荣誉",
  portfolio: "作品案例",
  self_reflection: "自我认知",
};

const MODULE_ORDER = [
  "basic_info",
  "education",
  "core_experiences",
  "internships_jobs",
  "projects",
  "skills",
  "certificates_honors",
  "portfolio",
  "self_reflection",
];

function buildSystemPrompt(module: string): string {
  const label = MODULE_LABELS[module] || module;
  const guide = MODULE_GUIDES[module] || "请提供相关信息。";
  const idx = MODULE_ORDER.indexOf(module);

  return `你是「职映 ZhiYing」的 AI 职业顾问，名叫小镜。你的任务是用对话式引导帮助用户填写知识库的「${label}」模块。

## 你的角色
- 友善、专业、不机械，像一位有经验的学长/学姐在聊天
- 回复控制在 2-4 句话，不要长篇大论
- 关键是引导用户说出具体信息，不满足于模糊回答

## 当前模块要求
${guide}

## 对话原则
1. 如果用户回答了但不够具体，追问细节。比如用户说"我会 Python"，可以问"熟练程度如何？有没有用它做过的具体项目？"
2. 如果用户回答了且信息充足，给予肯定，然后引导下一维度。
3. 如果用户表示想跳过或换模块，不要强行挽留，直接同意。
4. 不要替用户编造内容，不要假设用户具备某些技能或经历。
5. 每 2-3 轮对话后，判断是否需要推进模块。

## 输出格式（严格遵守）
你必须返回一个 JSON 对象，格式如下：
{
  "reply": "你的对话回复（纯文本，2-4 句话）",
  "module_complete": true或false,
  "next_question": "如果模块未完成，下一轮你打算追问什么方向（简短）",
  "options": ["提供 2-3 个快捷回复选项，帮助用户更快表达意图"]
}

## 判断 module_complete 为 true 的条件
- 用户已经提供了本模块 70% 以上的关键信息
- 用户明确说"完成/下个/继续"
- 用户已回复 3 轮以上且信息量充足

注意：${idx >= 0 && idx < MODULE_ORDER.length - 1 ? `下一个模块是「${MODULE_LABELS[MODULE_ORDER[idx + 1]]}」` : "这是最后一个模块"}
`;
}

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

    // 如果没有配 API Key，走规则降级
    if (!ZHIPU_API_KEY) {
      return fallbackResponse(message, module);
    }

    // 构建对话消息
    const messages: { role: string; content: string }[] = [
      { role: "system", content: buildSystemPrompt(module) },
    ];

    // 注入历史对话（最近 8 条）
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-8)) {
        const role = msg.role === "ai" ? "assistant" : "user";
        let content = msg.content || "";
        // 去掉过长的历史
        if (content.length > 800) content = content.slice(0, 800) + "...";
        messages.push({ role, content });
      }
    }

    // 添加当前用户输入
    messages.push({ role: "user", content: message });

    // 调用智谱 API
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    let apiResponse: Response;
    let data: any;

    try {
      apiResponse = await fetch(`${ZHIPU_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ZHIPU_API_KEY}`,
        },
        body: JSON.stringify({
          model: ZHIPU_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 800,
          stream: false,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        console.error("[Zhipu API Error]", apiResponse.status, errText);
        return fallbackResponse(message, module);
      }

      data = await apiResponse.json();
    } catch (fetchErr) {
      clearTimeout(timeout);
      console.error("[Zhipu Fetch Error]", fetchErr);
      return fallbackResponse(message, module);
    }

    // 解析 AI 回复
    const aiContent = data?.choices?.[0]?.message?.content?.trim() || "";

    // 尝试解析 JSON 格式回复
    let parsed: { reply?: string; module_complete?: boolean; next_question?: string; options?: string[] } = {};

    // 智谱可能会包裹在 markdown 代码块中，也可能直接返回 JSON
    let jsonStr = aiContent;
    const codeBlockMatch = aiContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1].trim();
    }
    // 尝试找 JSON 对象
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        // 不是合法 JSON，当作纯文本回复
      }
    }

    const reply = parsed.reply || aiContent || "收到你的信息，我们继续。";
    const moduleComplete = parsed.module_complete || false;
    const options = parsed.options || (moduleComplete ? ["继续下一模块", "我想再补充一些"] : ["我完成了这个模块", "帮我换个问题"]);

    return NextResponse.json({
      reply,
      module_complete: moduleComplete,
      options,
      next_question: parsed.next_question || "",
    });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "服务异常" } },
      { status: 500 }
    );
  }
}

/** 未配置 API Key 或调用失败时的规则降级 */
function fallbackResponse(message: string, module: string) {
  const msg = message.trim();
  const label = MODULE_LABELS[module] || module;
  const guide = MODULE_GUIDES[module] || "";

  let reply: string;
  let moduleComplete = false;

  if (msg.length < 10) {
    reply = `好的，能再具体一点吗？${guide.slice(0, 60)}…`;
  } else if (msg.length > 80 || msg.includes("完成") || msg.includes("下个") || msg.includes("继续")) {
    reply = `「${label}」模块信息已记录，很有价值！准备好进入下一模块了吗？`;
    moduleComplete = true;
  } else {
    reply = `收到！关于这个模块还有要补充的吗？比如${guide.slice(0, 50)}也可以说说。输入「完成」可进入下一模块。`;
  }

  return NextResponse.json({
    reply,
    module_complete: moduleComplete,
    options: moduleComplete
      ? ["继续下一模块", "我想补充这个模块"]
      : ["填写完成，进入下一个", "需要帮助，不知道怎么写"],
  });
}
