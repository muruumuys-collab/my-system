/**
 * WFRP2e - Warhammer Fantasy Roleplay 2nd Edition System for Foundry VTT
 * 
 * Main entry point for system initialization.
 * Registers document classes, sheets, data models, and hooks.
 */

// ============================================================================
// IMPORTS
// ============================================================================

// Actor Sheets
import ActorSheetWFRP2eCharacter from "./sheets/actor/character-sheet.js";
import ActorSheetWFRP2eNPC from "./sheets/actor/npc-sheet.js";
import ActorSheetWFRP2eCreature from "./sheets/actor/creature-sheet.js";
import ActorSheetWFRP2eVehicle from "./sheets/actor/vehicle-sheet.js";

// Item Sheets
import AmmunitionSheet from "./sheets/item/ammunition-sheet.js";
import ArmourSheet from "./sheets/item/armour-sheet.js";
import BlessingSheet from "./sheets/item/blessing-sheet.js";
import CareerSheet from "./sheets/item/career-sheet.js";
import ContainerSheet from "./sheets/item/container-sheet.js";
import CriticalSheet from "./sheets/item/critical-sheet.js";
import DiseaseSheet from "./sheets/item/disease-sheet.js";
import DisorderSheet from "./sheets/item/disorder-sheet.js";
import InjurySheet from "./sheets/item/injury-sheet.js";
import MoneySheet from "./sheets/item/money-sheet.js";
import MutationSheet from "./sheets/item/mutation-sheet.js";
import SkillSheet from "./sheets/item/skill-sheet.js";
import SpellSheet from "./sheets/item/spell-sheet.js";
import TalentSheet from "./sheets/item/talent-sheet.js";
import TraitSheet from "./sheets/item/trait-sheet.js";
import TrappingSheet from "./sheets/item/trapping-sheet.js";
import WeaponSheet from "./sheets/item/weapon-sheet.js";

// Document Classes
import ActorWFRP2e from "./documents/actor.js";
import ItemWFRP2e from "./documents/item.js";
import ChatMessageWFRP2e from "./documents/message.js";

// System Configuration & Utilities
import WFRP2E from "./system/config-wfrp2e.js";
import WFRP2E_Utility from "./system/utility-wfrp2e.js";
import WFRP2E_Tables from "./system/tables-wfrp2e.js";
import registerHooks from "./system/hooks.js";

// Data Models - Actors
import { CharacterModel } from "./model/actor/character.js";
import { NPCModel } from "./model/actor/npc.js";
import { CreatureModel } from "./model/actor/creature.js";
import { VehicleModel } from "./model/actor/vehicle.js";

// Data Models - Items
import { AmmunitionModel } from "./model/item/ammunition.js";
import { ArmourModel } from "./model/item/armour.js";
import { BlessingModel } from "./model/item/blessing.js";
import { CareerModel } from "./model/item/career.js";
import { ContainerModel } from "./model/item/container.js";
import { CriticalModel } from "./model/item/critical.js";
import { DiseaseModel } from "./model/item/disease.js";
import { DisorderModel } from "./model/item/disorder.js";
import { InjuryModel } from "./model/item/injury.js";
import { MoneyModel } from "./model/item/money.js";
import { MutationModel } from "./model/item/mutation.js";
import { SkillModel } from "./model/item/skill.js";
import { SpellModel } from "./model/item/spell.js";
import { TalentModel } from "./model/item/talent.js";
import { TraitModel } from "./model/item/trait.js";
import { TrappingModel } from "./model/item/trapping.js";
import { WeaponModel } from "./model/item/weapon.js";

/* ============================================================================
   SYSTEM INITIALIZATION
   ============================================================================ */

Hooks.once("init", function () {
  console.log("Initializing WFRP2e System");

  // Set up system namespace
  game.wfrp2e = {
    appVersion: "1.0.0",
    config: WFRP2E,
    utility: WFRP2E_Utility,
    tables: WFRP2E_Tables,
    sheets: {},
    rolls: {}
  };

  // =========================================================================
  // REGISTER DOCUMENT CLASSES
  // =========================================================================
  CONFIG.Actor.documentClass = ActorWFRP2e;
  CONFIG.Item.documentClass = ItemWFRP2e;
  CONFIG.ChatMessage.documentClass = ChatMessageWFRP2e;

  // =========================================================================
  // REGISTER DATA MODELS
  // =========================================================================

  // Actor Data Models
  CONFIG.Actor.dataModels["character"] = CharacterModel;
  CONFIG.Actor.dataModels["npc"] = NPCModel;
  CONFIG.Actor.dataModels["creature"] = CreatureModel;
  CONFIG.Actor.dataModels["vehicle"] = VehicleModel;

  // Item Data Models
  CONFIG.Item.dataModels["ammunition"] = AmmunitionModel;
  CONFIG.Item.dataModels["armour"] = ArmourModel;
  CONFIG.Item.dataModels["blessing"] = BlessingModel;
  CONFIG.Item.dataModels["career"] = CareerModel;
  CONFIG.Item.dataModels["container"] = ContainerModel;
  CONFIG.Item.dataModels["critical"] = CriticalModel;
  CONFIG.Item.dataModels["disease"] = DiseaseModel;
  CONFIG.Item.dataModels["disorder"] = DisorderModel;
  CONFIG.Item.dataModels["injury"] = InjuryModel;
  CONFIG.Item.dataModels["money"] = MoneyModel;
  CONFIG.Item.dataModels["mutation"] = MutationModel;
  CONFIG.Item.dataModels["skill"] = SkillModel;
  CONFIG.Item.dataModels["spell"] = SpellModel;
  CONFIG.Item.dataModels["talent"] = TalentModel;
  CONFIG.Item.dataModels["trait"] = TraitModel;
  CONFIG.Item.dataModels["trapping"] = TrappingModel;
  CONFIG.Item.dataModels["weapon"] = WeaponModel;

  // =========================================================================
  // REGISTER ACTOR SHEETS
  // =========================================================================
  const { DocumentSheetConfig } = foundry.applications.apps;
  const actorClass = CONFIG.Actor.documentClass;

  // Unregister core sheets
  DocumentSheetConfig.unregisterSheet(actorClass, "core", foundry.appv1.sheets.ActorSheet);

  // Register WFRP2e sheets
  DocumentSheetConfig.registerSheet(actorClass, "wfrp2e", ActorSheetWFRP2eCharacter, {
    types: ["character"],
    makeDefault: true,
    label: "SHEET.CharacterSheet"
  });
  DocumentSheetConfig.registerSheet(actorClass, "wfrp2e", ActorSheetWFRP2eNPC, {
    types: ["npc"],
    makeDefault: true,
    label: "SHEET.NPCSheet"
  });
  DocumentSheetConfig.registerSheet(actorClass, "wfrp2e", ActorSheetWFRP2eCreature, {
    types: ["creature"],
    makeDefault: true,
    label: "SHEET.CreatureSheet"
  });
  DocumentSheetConfig.registerSheet(actorClass, "wfrp2e", ActorSheetWFRP2eVehicle, {
    types: ["vehicle"],
    makeDefault: true,
    label: "SHEET.VehicleSheet"
  });

  // =========================================================================
  // REGISTER ITEM SHEETS
  // =========================================================================
  const itemClass = CONFIG.Item.documentClass;

  // Unregister core sheets
  DocumentSheetConfig.unregisterSheet(itemClass, "core", foundry.appv1.sheets.ItemSheet);

  // Register WFRP2e item sheets
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", AmmunitionSheet, {
    types: ["ammunition"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", ArmourSheet, {
    types: ["armour"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", BlessingSheet, {
    types: ["blessing"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", CareerSheet, {
    types: ["career"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", ContainerSheet, {
    types: ["container"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", CriticalSheet, {
    types: ["critical"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", DiseaseSheet, {
    types: ["disease"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", DisorderSheet, {
    types: ["disorder"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", InjurySheet, {
    types: ["injury"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", MoneySheet, {
    types: ["money"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", MutationSheet, {
    types: ["mutation"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", SkillSheet, {
    types: ["skill"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", SpellSheet, {
    types: ["spell"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", TalentSheet, {
    types: ["talent"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", TraitSheet, {
    types: ["trait"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", TrappingSheet, {
    types: ["trapping"],
    makeDefault: true
  });
  DocumentSheetConfig.registerSheet(itemClass, "wfrp2e", WeaponSheet, {
    types: ["weapon"],
    makeDefault: true
  });

  // =========================================================================
  // CONFIGURE SYSTEM SETTINGS
  // =========================================================================

  // Token attributes
  CONFIG.primaryTokenAttribute = "status.wounds";
  CONFIG.secondaryTokenAttribute = "status.fortune";

  // Grid and distance
  CONFIG.gridDistance = 2;
  CONFIG.gridUnits = "yd";

  // Cursor customization
  CONFIG.cursors.default = "systems/wfrp2e/ui/cursors/normal.png";
  CONFIG.cursors["default-down"] = "systems/wfrp2e/ui/cursors/normal.png";
  CONFIG.cursors.pointer = "systems/wfrp2e/ui/cursors/active.png";
  CONFIG.cursors["pointer-down"] = "systems/wfrp2e/ui/cursors/active.png";

  // =========================================================================
  // REGISTER SYSTEM SETTINGS
  // =========================================================================

  game.settings.register("wfrp2e", "systemMigrationVersion", {
    name: "System Migration Version",
    hint: "Used for system data migration. Do not change manually.",
    scope: "world",
    config: false,
    type: String,
    default: "0.0.0"
  });

  game.settings.register("wfrp2e", "useSimpleInsanity", {
    name: "SETTINGS.SimpleInsanity",
    hint: "SETTINGS.SimpleInsanityHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    requiresReload: false
  });

  game.settings.register("wfrp2e", "useSimpleCorruption", {
    name: "SETTINGS.SimpleCorruption",
    hint: "SETTINGS.SimpleCorruptionHint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    requiresReload: false
  });

  // =========================================================================
  // REGISTER SYSTEM HOOKS
  // =========================================================================
  registerHooks();

  console.log("WFRP2e System Initialized Successfully");
});

/* ============================================================================
   READY HOOK - Runs after all systems have initialized
   ============================================================================ */

Hooks.once("ready", function () {
  console.log("WFRP2e System Ready");

  // Perform migrations if needed
  // This will be implemented in the migration system
});
