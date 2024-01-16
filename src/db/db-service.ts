import { ResultSet, SQLiteDatabase, enablePromise, openDatabase } from "react-native-sqlite-storage"

enablePromise(true);

/**
 * @returns SQLiteDatabase object
 */
export const getDBConnection = async () => {
    return openDatabase({ name: "wildguard.animals.db", location: "default" })
}

// types of each column for each object
export interface IColumn {  // can be extended
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
    results.forEach(result => {
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
export const createTable = async (db: SQLiteDatabase, tableName: string, columns: IColumn[]) => {
    let colInfos = '';  // all table info
    columns.forEach((col, index) => {  // boilerplate stuff
        colInfos += `${col.name} ${col.dataType}`;
        // default value
        if (typeof col.defaultValue !== 'undefined') {
            colInfos += ` DEFAULT ${col.defaultValue}`;
        }
        // not null
        if (col.notNull) {
            colInfos += ` NOT NULL`;
        }
        // Primary key
        if (col.primaryKey) {
            colInfos += ' PRIMARY KEY AUTOINCREMENT';
        }
        // Unique
        if (col.unique) {
            colInfos += ' UNIQUE';
        }
        // add , if not last col
        if (index < columns.length - 1) {
            colInfos += ',';
        }
    });
    // create table if it doesn't exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${colInfos});`;
    console.log(query);  // log queries for debugging
    await db.executeSql(query);
}

/**
 * Delete table from DB
 * @param db DB object
 * @param tableName Table name
 */
export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
    const query = `drop table ${tableName}`;
    console.log(query);
    await db.executeSql(query);
};

export interface Animal {
    id?: number;
    common_name: string;
    class_animal: string;
    species: string;
    image: URL | string;  // TODO: Check URL need, and it it's compatible with SQLite
    description: string;
}

export const createAnimal = async (db: SQLiteDatabase, animal: Animal): Promise<void> => {
    const {
        common_name,
        class_animal,
        species,
        image,
        description
    } = animal;

    const query = `
        INSERT INTO animals (common_name, class_animal, species, image, description)
        VALUES (
            ${common_name},
            ${class_animal},
            ${species},
            ${image},
            ${description},
        );
    `;
    console.log(`[db-service - createAnimal] Query creating animal:\n${query}`);
    // const result = await db.executeSql(query);
    await db.executeSql(query);
}

export const getAnimals = async (db: SQLiteDatabase): Promise<Animal[]> => {
    const query = `
        SELECT * FROM animals;
    `;
    const result = await db.executeSql(query);
    return dbResultToArray<Animal>(result);
}