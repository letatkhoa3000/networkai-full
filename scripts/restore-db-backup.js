const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function parseArgs(argv) {
  const options = {
    file: null,
    force: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--file" && argv[i + 1]) {
      options.file = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
    }
  }

  return options;
}

function requireBackupFile(fileArg) {
  const candidate = fileArg
    ? path.resolve(process.cwd(), fileArg)
    : path.resolve(process.cwd(), "backups", "db-20260507-082840", "database-backup.json");

  if (!fs.existsSync(candidate)) {
    throw new Error(`Backup file not found: ${candidate}`);
  }

  return candidate;
}

async function countCurrentRows() {
  const [users, settings, homepageSections, coreValues, services, solutions, projects, projectServices, partners, teamMembers, contactSubmissions] =
    await Promise.all([
      prisma.user.count(),
      prisma.setting.count(),
      prisma.homepageSection.count(),
      prisma.coreValue.count(),
      prisma.service.count(),
      prisma.solution.count(),
      prisma.project.count(),
      prisma.projectService.count(),
      prisma.partner.count(),
      prisma.teamMember.count(),
      prisma.contactSubmission.count(),
    ]);

  return {
    users,
    settings,
    homepageSections,
    coreValues,
    services,
    solutions,
    projects,
    projectServices,
    partners,
    teamMembers,
    contactSubmissions,
  };
}

async function clearAllTables() {
  await prisma.projectService.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.project.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.service.deleteMany();
  await prisma.coreValue.deleteMany();
  await prisma.homepageSection.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();
}

async function insertTables(tables) {
  if (tables.users?.length) {
    await prisma.user.createMany({ data: tables.users });
  }
  if (tables.settings?.length) {
    await prisma.setting.createMany({ data: tables.settings });
  }
  if (tables.homepageSections?.length) {
    await prisma.homepageSection.createMany({ data: tables.homepageSections });
  }
  if (tables.coreValues?.length) {
    await prisma.coreValue.createMany({ data: tables.coreValues });
  }
  if (tables.services?.length) {
    await prisma.service.createMany({ data: tables.services });
  }
  if (tables.solutions?.length) {
    await prisma.solution.createMany({ data: tables.solutions });
  }
  if (tables.projects?.length) {
    await prisma.project.createMany({ data: tables.projects });
  }
  if (tables.projectServices?.length) {
    await prisma.projectService.createMany({ data: tables.projectServices });
  }
  if (tables.partners?.length) {
    await prisma.partner.createMany({ data: tables.partners });
  }
  if (tables.teamMembers?.length) {
    await prisma.teamMember.createMany({ data: tables.teamMembers });
  }
  if (tables.contactSubmissions?.length) {
    await prisma.contactSubmission.createMany({ data: tables.contactSubmissions });
  }
}

async function main() {
  const { file, force } = parseArgs(process.argv.slice(2));
  const backupPath = requireBackupFile(file);
  const payload = JSON.parse(fs.readFileSync(backupPath, "utf8"));
  const tables = payload.tables || {};

  const current = await countCurrentRows();
  const incoming = Object.fromEntries(
    Object.entries(tables).map(([name, rows]) => [name, Array.isArray(rows) ? rows.length : 0]),
  );

  if (!force) {
    console.log(
      JSON.stringify(
        {
          backupPath,
          mode: "dry-run",
          currentCounts: current,
          incomingCounts: incoming,
          note: "Run again with --force to wipe current tables and restore this backup.",
        },
        null,
        2,
      ),
    );
    return;
  }

  await clearAllTables();
  await insertTables(tables);

  const restored = await countCurrentRows();

  console.log(
    JSON.stringify(
      {
        backupPath,
        mode: "restored",
        restoredCounts: restored,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
