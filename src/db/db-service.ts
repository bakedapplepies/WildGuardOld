import { Database, ResultSet, SQLiteDatabase, openDatabase } from "expo-sqlite";
// import * as AnimalDAO from "./animal.dao"

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

export const innerJoin = async (db: SQLiteDatabase,
  tableName1: string, tableName2: string, selectedCols: string[], matchCol: string) => {

  let cols: string = "";
  selectedCols.forEach((col, index) => {
    cols += col;
    if (index != selectedCols.length - 1) cols += ", ";
  });

  const query = `
    SELECT ${cols}
    FROM ${tableName1}
    INNER JOIN ${tableName2}
    ON ${tableName1}.${matchCol} = ${tableName2}.${matchCol}
  `;
  console.log(query);
  const result = await runQuery(db, query) as any;
  return result._array;
}

export const leftJoin = async (db: SQLiteDatabase,
  tableName1: string, tableName2: string, selectedCols: string[], matchCol: string) => {

  let cols: string = "";
  selectedCols.forEach((col, index) => {
    cols += col;
    if (index != selectedCols.length - 1) cols += ", ";
  });

  const query = `
    SELECT ${cols}
    FROM ${tableName1}
    LEFT JOIN ${tableName2}
    ON ${tableName1}.${matchCol} = ${tableName2}.${matchCol}
  `;
  console.log(query);
  const result = await runQuery(db, query) as any;
  return result._array;
}