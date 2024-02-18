import { SQLiteDatabase } from "expo-sqlite";
import { runQuery } from "./db-service";
import { Animal } from "./animal.dao";

export interface Mammal extends Animal {
  hasEggs: boolean;
}

export const createMammal = async (db: SQLiteDatabase, mammal: Mammal): Promise<void> => {
  const { common_name, class_animal, species, image, description, hasEggs } = mammal;

  const query = `
    INSERT INTO mammals (common_name, class_animal, species, picimage, description)
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

export const getAnimals = async (db: SQLiteDatabase): Promise<Partial<Animal & Mammal>[]> => {
  const query = `
          SELECT * FROM animals;
      `;
  const result = (await runQuery(db, query)) as any;
  return result._array as Animal[];
};
