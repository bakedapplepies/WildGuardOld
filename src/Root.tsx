import { useEffect } from "react";
import { createAnimal, getAnimals } from "./db/animal.dao";
import {
  createTable,
  deleteTable,
  getDBConnection,
} from "./db/db-service";
import { models } from "./db/models";
import RootStack from "./navigation/RootStack";


const Root = () => {
  useEffect(() => {
    const loadDB = async () => {
      const db = await getDBConnection();
      // get all promises to create tables
      await deleteTable(db, "animals");
      const createTablesPromises = Object.keys(models).map((tableName) =>
        createTable(db, tableName, models[tableName])
      );
      await Promise.all(createTablesPromises);

      await createAnimal(db, {
        class_animal: "Luong cu",
        common_name: "Ech xanh",
        species: "Ech",
        image: "abc.jpeg",
        description: "Ech ngoai dong",
      });
      await createAnimal(db, {
        class_animal: "Co vu",
        common_name: "Khi",
        species: "Khi",
        image: "abc.jpeg",
        description: "Khi an chuoi",
      });
      const res1 = await getAnimals(db);
      console.log(res1);
    };
    loadDB();
  }, []);

  return (
    <RootStack/>
  );
};

export default Root;
