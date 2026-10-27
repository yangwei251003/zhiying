const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 读取 .env.local
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) {
  console.error("❌ 找不到 .env.local 配置文件！");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const lines = envContent.split("\n");

const token = process.env.VERCEL_TOKEN || "";

console.log("🚀 开始将本地 .env.local 环境变量同步至 Vercel...");

for (let line of lines) {
  line = line.trim();
  if (!line || line.startsWith("#")) continue;
  
  const equalsIdx = line.indexOf("=");
  if (equalsIdx === -1) continue;
  
  const key = line.slice(0, equalsIdx).trim();
  const value = line.slice(equalsIdx + 1).trim();
  
  if (!key || !value) continue;
  
  // 只同步 Supabase 与智谱 AI 的关键环境变量
  if (!key.startsWith("NEXT_PUBLIC_SUPABASE") && !key.startsWith("SUPABASE_SERVICE_ROLE") && !key.startsWith("ZHIPU_")) {
    continue;
  }

  console.log(`\n--------------------------------------------`);
  console.log(`⚙️ 正在处理环境变量: ${key}...`);

  // 1. 先尝试删除旧的环境变量以防止冲突 (即使报错也继续，捕获异常)
  try {
    console.log(`[1/2] 正在清理已存在的 ${key} (production)...`);
    execSync(`npx vercel env rm ${key} production --token ${token} --yes`, { stdio: "ignore" });
    console.log(`✅ 清理完成`);
  } catch (rmError) {
    // 忽略找不到等常规错误
    console.log(`ℹ️ 无需清理或清理跳过`);
  }

  // 2. 重新上传添加环境变量
  try {
    console.log(`[2/2] 正在添加 ${key} -> Vercel (production)...`);
    execSync(`npx vercel env add ${key} production --value "${value}" --token ${token} --yes`, { stdio: "inherit" });
    console.log(`🎉 成功配置 ${key}！`);
  } catch (addError) {
    console.error(`❌ 添加 ${key} 失败:`, addError.message);
  }
}

console.log("\n============================================");
console.log("🌟 环境变量一键配置流程已结束。");
console.log("====================================");
