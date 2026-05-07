const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const stamp =
    process.argv[2] ||
    new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "-");
  const outDir = path.join(process.cwd(), "backups", `db-${stamp}`);
  fs.mkdirSync(outDir, { recursive: true });

  const data = {
    exportedAt: new Date().toISOString(),
    source: "supabase-session-pooler",
    tables: {},
  };

  data.tables.users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  data.tables.settings = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  data.tables.homepageSections = await prisma.homepageSection.findMany({
    orderBy: [{ sortOrder: "asc" }, { key: "asc" }],
  });
  data.tables.coreValues = await prisma.coreValue.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  data.tables.services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  data.tables.solutions = await prisma.solution.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  data.tables.projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  data.tables.projectServices = await prisma.projectService.findMany({
    orderBy: [{ projectId: "asc" }, { serviceId: "asc" }],
  });
  data.tables.partners = await prisma.partner.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  data.tables.teamMembers = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  data.tables.contactSubmissions = await prisma.contactSubmission.findMany({
    orderBy: [{ createdAt: "asc" }],
  });

  const counts = Object.fromEntries(
    Object.entries(data.tables).map(([name, rows]) => [name, rows.length]),
  );

  data.counts = counts;

  fs.writeFileSync(path.join(outDir, "database-backup.json"), JSON.stringify(data, null, 2));
  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify(
      {
        exportedAt: data.exportedAt,
        source: data.source,
        counts,
      },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(outDir, "README.md"),
    [
      "# Database Backup",
      "",
      `- Export time: ${data.exportedAt}`,
      `- Source: ${data.source}`,
      "",
      "## Included tables",
      ...Object.entries(counts).map(([name, count]) => `- ${name}: ${count}`),
      "",
      "## Files",
      "- `database-backup.json`: full exported rows",
      "- `manifest.json`: row counts summary",
    ].join("\n"),
  );

  console.log(JSON.stringify({ outDir, counts }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
