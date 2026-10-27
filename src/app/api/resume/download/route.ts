import { NextRequest, NextResponse } from "next/server";
import {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, TabStopPosition, TabStopType,
  BorderStyle, LevelFormat
} from "docx";

// 字号系统（半磅 = half-points，1pt = 2 half-points）
const SIZE = {
  name: 36,           // 18pt
  contact: 18,        // 9pt
  sectionTitle: 23,   // 11.5pt
  body: 21,           // 10.5pt
  subheading: 19,     // 9.5pt (比正文小1pt)
};

const FONT = "Microsoft YaHei";
const ACCENT_COLOR = "1F3864";   // 深蓝
const GRAY_DARK   = "444444";    // 联系方式
const GRAY_MEDIUM  = "555555";    // 日期、副标题

// A4: 11906 x 16838 DXA (1 DXA = 1/20 pt = 1/1440 inch)
const PAGE = { width: 11906, height: 16838 };
const MARGIN = 720; // 0.5 inch = 720 DXA

const SPACING = {
  afterName: 70,
  afterContact: 140,
  beforeSection: 190,
  afterSectionTitle: 80,
  afterEntryHeading: 40,
  afterSubheading: 30,
  afterBullet: 50,
  afterEntry: 110,
};

function clean(text: any) {
  if (text === null || text === undefined) return "";
  return String(text).replace(/[\t\r\n]+/g, " ").replace(/ {2,}/g, " ").trim();
}

function buildHeader(name: string, contactLine: string) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: SPACING.afterName },
      children: [new TextRun({ text: clean(name), bold: true, size: SIZE.name, font: FONT, color: ACCENT_COLOR })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: SPACING.afterContact },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR, space: 4 } },
      children: [new TextRun({ text: clean(contactLine), size: SIZE.contact, font: FONT, color: GRAY_DARK })],
    })
  ];
}

function sectionTitle(title: string) {
  return new Paragraph({
    spacing: { before: SPACING.beforeSection, after: SPACING.afterSectionTitle },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT_COLOR, space: 2 } },
    children: [new TextRun({ text: clean(title), bold: true, size: SIZE.sectionTitle, font: FONT, color: ACCENT_COLOR })],
  });
}

function buildEntry(entry: any, isLastEntry: boolean) {
  const paragraphs = [];
  const headingChildren = [];
  if (entry.heading) {
    headingChildren.push(new TextRun({ text: clean(entry.heading), bold: true, size: SIZE.body, font: FONT }));
  }
  if (entry.date) {
    headingChildren.push(new TextRun({ text: "\t" + clean(entry.date), size: SIZE.body, font: FONT, color: GRAY_MEDIUM }));
  }

  const hasSub = entry.subheading && entry.subheading.trim();
  const hasBullets = entry.bullets && entry.bullets.length > 0;
  const headingSpacing = (hasSub || hasBullets) ? SPACING.afterEntryHeading : (isLastEntry ? 0 : SPACING.afterEntry);

  paragraphs.push(new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { after: headingSpacing },
    children: headingChildren,
  }));

  if (hasSub) {
    const subSpacing = hasBullets ? SPACING.afterSubheading : (isLastEntry ? 0 : SPACING.afterEntry);
    paragraphs.push(new Paragraph({
      spacing: { after: subSpacing },
      children: [new TextRun({ text: clean(entry.subheading), size: SIZE.subheading, font: FONT, italics: true, color: GRAY_MEDIUM })],
    }));
  }

  if (hasBullets) {
    entry.bullets.forEach((bullet: string, bi: number) => {
      const isLastBullet = bi === entry.bullets.length - 1;
      const bulletSpacing = isLastBullet ? (isLastEntry ? 0 : SPACING.afterEntry) : SPACING.afterBullet;
      paragraphs.push(new Paragraph({
        numbering: { reference: "resume-bullets", level: 0 },
        spacing: { after: bulletSpacing },
        children: [new TextRun({ text: clean(bullet), size: SIZE.body, font: FONT })],
      }));
    });
  }

  return paragraphs;
}

function buildSection(section: any) {
  const paragraphs = [];
  paragraphs.push(sectionTitle(section.title));

  if (section.entries && section.entries.length > 0) {
    section.entries.forEach((entry: any, ei: number) => {
      paragraphs.push(...buildEntry(entry, ei === section.entries.length - 1));
    });
  }

  if (section.freeform_bullets && section.freeform_bullets.length > 0) {
    section.freeform_bullets.forEach((text: string) => {
      paragraphs.push(new Paragraph({
        numbering: { reference: "resume-bullets", level: 0 },
        spacing: { after: SPACING.afterBullet },
        children: [new TextRun({ text: clean(text), size: SIZE.body, font: FONT })],
      }));
    });
  }

  return paragraphs;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.contact_line || !body.sections) {
      return NextResponse.json({ error: { code: "INVALID_REQUEST", message: "缺少简历必要字段" } }, { status: 400 });
    }

    const bodyChildren = [];
    bodyChildren.push(...buildHeader(body.name, body.contact_line));

    body.sections.forEach((section: any) => {
      bodyChildren.push(...buildSection(section));
    });

    const doc = new Document({
      numbering: {
        config: [{
          reference: "resume-bullets",
          levels: [{
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 260, hanging: 260 } } },
          }],
        }],
      },
      styles: {
        default: { document: { run: { font: FONT, size: SIZE.body } } },
      },
      sections: [{
        properties: {
          page: {
            size: { width: PAGE.width, height: PAGE.height },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        children: bodyChildren,
      }],
    });

    const buffer = await Packer.toBuffer(doc);

    return new Response(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${encodeURIComponent(body.name)}_简历.docx`,
      },
    });
  } catch (error: any) {
    console.error("[Download API Error]", error);
    return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: error.message || "生成下载失败" } }, { status: 500 });
  }
}
