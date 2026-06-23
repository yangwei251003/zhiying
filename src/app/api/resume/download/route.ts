import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
  let inputPath = "";
  let outputPath = "";

  try {
    const body = await req.json();

    // 简单校验数据结构
    if (!body.name || !body.contact_line || !body.sections) {
      return NextResponse.json(
        { error: { code: "INVALID_REQUEST", message: "缺少简历必要字段" } },
        { status: 400 }
      );
    }

    const tempDir = os.tmpdir();
    const timestamp = Date.now();
    inputPath = path.join(tempDir, `resume_${timestamp}.json`);
    outputPath = path.join(tempDir, `resume_${timestamp}.docx`);

    // 1. 将接收到的简历 JSON 写入临时文件
    fs.writeFileSync(inputPath, JSON.stringify(body, null, 2));

    // 2. 获取 build_resume.js 绝对路径 (基于 process.cwd())
    const scriptPath = path.join(
      process.cwd(),
      "../resumecraft-skill/scripts/build_resume.js"
    );

    if (!fs.existsSync(scriptPath)) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: `找不到简历生成脚本: ${scriptPath}` } },
        { status: 500 }
      );
    }

    // 3. 运行子进程执行 build_resume.js 生成 docx
    await new Promise<void>((resolve, reject) => {
      exec(
        `node "${scriptPath}" "${inputPath}" "${outputPath}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("[build_resume.js exec error]", error, stderr);
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });

    if (!fs.existsSync(outputPath)) {
      return NextResponse.json(
        { error: { code: "INTERNAL_ERROR", message: "简历 docx 文件未生成成功" } },
        { status: 500 }
      );
    }

    // 4. 读取生成的二进制 docx 数据
    const fileBuffer = fs.readFileSync(outputPath);

    // 5. 组装响应回传给前端下载
    const response = new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=resume.docx`,
      },
    });

    return response;
  } catch (error: any) {
    console.error("[Download API Error]", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: error.message || "生成下载失败" } },
      { status: 500 }
    );
  } finally {
    // 6. 清理临时生成的文件
    try {
      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }
      if (outputPath && fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    } catch (cleanupError) {
      console.error("[Temp Files Cleanup Error]", cleanupError);
    }
  }
}
