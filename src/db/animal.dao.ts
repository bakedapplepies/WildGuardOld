import { SQLiteDatabase } from "expo-sqlite";
import { runQuery } from "./db-service";

export interface Animal {
  id?: number;
  common_name: string;
  kingdom: string;
  class_animal: string;
  species: string;
  image: URL;  // TODO: May need to be converted to string for SQL
  description: string;
  populationDecreasing: boolean;
  location: string;
  status: string;
}  // TODO: Add SQL arguments for new fields
// TODO: try switching to enums or string variants

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
  return result._array as Animal[];
};
