/**
 * Database Packer - Compiles Foundry compendium packs
 * 
 * Converts source compendium data (JSON) into Foundry's internal
 * database format for distribution releases.
 */
import fs from "fs";
import { exec } from "child_process";
import getSystemPath from "./foundry-path.mjs";

const manifest = JSON.parse(fs.readFileSync("./system.json"));
const systemPath = getSystemPath(manifest.id);

// List of compendium packs to generate
const PACKS = [
  {
    name: "basic",
    label: "Basic Items",
    inputPath: "./packs/basic"
  },
  {
    name: "careers",
    label: "Careers",
    inputPath: "./packs/careers"
  },
  {
    name: "skills",
    label: "Skills",
    inputPath: "./packs/skills"
  },
  {
    name: "talents",
    label: "Talents",
    inputPath: "./packs/talents"
  },
  {
    name: "spells",
    label: "Spells",
    inputPath: "./packs/spells"
  },
  {
    name: "blessings",
    label: "Blessings",
    inputPath: "./packs/blessings"
  }
];

/**
 * Pack a single compendium
 * @param {Object} pack - Pack configuration
 */
function packCompendium(pack) {
  return new Promise((resolve, reject) => {
    // Check if source directory exists
    if (!fs.existsSync(pack.inputPath)) {
      console.warn(`⚠ Pack source not found: ${pack.inputPath}`);
      resolve();
      return;
    }

    const command = `fvtt package pack --type "System" --in "${pack.inputPath}" -n "${pack.name}" --out "${systemPath}/packs"`;

    console.log(`Packing: ${pack.label}...`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`✗ Error packing ${pack.label}:`, error.message);
        reject(error);
        return;
      }
      console.log(`✓ ${pack.label} packed successfully`);
      if (stderr) console.log(stderr);
      resolve();
    });
  });
}

/**
 * Pack all compendiums sequentially
 */
async function packAll() {
  console.log(`\nStarting compendium packing for ${manifest.id}@${manifest.version}`);
  console.log(`Output path: ${systemPath}\n`);

  try {
    for (const pack of PACKS) {
      await packCompendium(pack);
    }
    console.log(`\n✓ All compendiums packed successfully!`);
  } catch (error) {
    console.error(`\n✗ Packing failed:`, error.message);
    process.exit(1);
  }
}

// Run packing
packAll();
