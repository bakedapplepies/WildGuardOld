import { Database, ResultSet, SQLiteDatabase, openDatabase } from "expo-sqlite";
import * as AnimalDAO from "./animal.dao"

export const runQuery = (db: Database, query: string) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rows }) => resolve(rows),
        (tx, err) => {
          console.log("======QUERY ERROR=======\n");
          console.log(`========================================\n${query}\n`);
          console.log(err);
          console.log("=============\n");
          reject(err);
          return true;
        }
      );
    });
  });

/**
 * @returns SQLiteDatabase object
 */
export const getDBConnection = async () => {
  return openDatabase("wildguard.animals.db");
};

// types of each column for each object
export interface IColumn {
  // can be extended
  name: string;
  dataType: string;
  defaultValue?: any;
  primaryKey?: boolean;
  notNull?: boolean;
  unique?: boolean;
}

/**
 * @param results : query from "SELECT" calls to DB
 * @returns constructed array of T objects from query
 */
const dbResultToArray = <T>(results: [ResultSet]): T[] => {
  const arr: T[] = [];
  results.forEach((result) => {
    for (let index = 0; index < result.rows.length; index++) {
      arr.push(result.rows.item(index));
    }
  });
  return arr;
};

/**
 * Boilerplate stuff
 * @param db DB object
 * @param tableName Table name
 * @param columns Columns constituting a table
 */
export const createTable = async (db: Database, tableName: string, columns: IColumn[]) => {
  let colInfos = ""; // all table info
  columns.forEach((col, index) => {
    // boilerplate stuff
    colInfos += `${col.name} ${col.dataType}`;
    // default value
    if (typeof col.defaultValue !== "undefined") {
      colInfos += ` DEFAULT ${col.defaultValue}`;
    }
    // not null
    if (col.notNull) {
      colInfos += ` NOT NULL`;
    }
    // Primary key
    if (col.primaryKey) {
      colInfos += " PRIMARY KEY AUTOINCREMENT";
    }
    // Unique
    if (col.unique) {
      colInfos += " UNIQUE";
    }
    // add , if not last col
    if (index < columns.length - 1) {
      colInfos += ",";
    }
  });
  // create table if it doesn't exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${colInfos});`;
  console.log(query); // log queries for debugging
  return runQuery(db, query);
};

/**
 * Delete table from DB
 * @param db DB object
 * @param tableName Table name
 */
export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  console.log(query);
  await runQuery(db, query);
};

export interface Animal {
  id?: number;
  common_name: string;
  class_animal: string;
  species: string;
  image: URL | string; // TODO: Check URL need, and it it's compatible with SQLite
  description: string;
}

export const createAnimal = async (db: SQLiteDatabase, animal: Animal): Promise<void> => {
  const { common_name, class_animal, species, image, description } = animal;

  const query = `
        INSERT INTO animals (common_name, class_animal, species, image, description)
        VALUES (
            '${common_name}',
            '${class_animal}',
            '${species}',
            '${image}',
            '${description}'
        );
    `;
  console.log(
    `=========[db-service - createAnimal]===========\n${query}\n========================================`
  );
  // const result = await db.executeSql(query);
  await runQuery(db, query);
};

export const getAnimals = async (db: SQLiteDatabase): Promise<Animal[]> => {
  const query = `
        SELECT * FROM animals;
    `;
  const result = (await runQuery(db, query)) as any;
  //   return dbResultToArray<Animal>(result);
  return result._array as Animal[];
};
