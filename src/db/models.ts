import { IColumn } from "./db-service";

// IColumn[] acts as a table
type TableModels = {
  [key: string]: IColumn[];
};

export const models: TableModels = {
  animals: [
    { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
    { name: "common_name", dataType: "TEXT", defaultValue: "''" },
    { name: "class_animal", dataType: "TEXT", defaultValue: "''" },
    { name: "species", dataType: "TEXT", defaultValue: "''" },
    { name: "image", dataType: "TEXT", defaultValue: "''" },
    { name: "description", dataType: "TEXT", defaultValue: "''" },
  ],

  mammals: [
    { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
    { name: "common_name", dataType: "TEXT", defaultValue: "''" },
    { name: "class_animal", dataType: "TEXT", defaultValue: "''" },
    { name: "species", dataType: "TEXT", defaultValue: "''" },
    { name: "image", dataType: "TEXT", defaultValue: "''" },
    { name: "description", dataType: "TEXT", defaultValue: "''" },
    { name: "has_eggs", dataType: "BOOLEAN", defaultValue: "''" },
  ],

  // reptiles: [
  //   { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
  //   { name: "common_name", dataType: "TEXT", defaultValue: "''" },
  //   { name: "class_animal", dataType: "TEXT", defaultValue: "''" },
  //   { name: "species", dataType: "TEXT", defaultValue: "''" },
  //   { name: "image", dataType: "TEXT", defaultValue: "''" },
  //   { name: "description", dataType: "TEXT", defaultValue: "''" },
  // ],

  // amphibians: [
  //   { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
  //   { name: "common_name", dataType: "TEXT", defaultValue: "''" },
  //   { name: "class_animal", dataType: "TEXT", defaultValue: "''" },
  //   { name: "species", dataType: "TEXT", defaultValue: "''" },
  //   { name: "image", dataType: "TEXT", defaultValue: "''" },
  //   { name: "description", dataType: "TEXT", defaultValue: "''" },
  // ]
};