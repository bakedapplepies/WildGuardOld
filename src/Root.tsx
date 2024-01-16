import { useEffect } from "react";
import {
  createAnimal,
  createTable,
  deleteTable,
  getAnimals,
  getDBConnection,
} from "./db/db-service";
import { models } from "./db/models";
import { Text, View } from "react-native";
// import { Text, View } from "native-base";

const Root = () => {
  useEffect(() => {
    const loadDB = async () => {
      const db = await getDBConnection();
      // get all promises to create tables
      await deleteTable(db, "animals");
      const createTablesPromises = Object.keys(models).map((tableName) =>
        createTable(db, tableName, models[tableName])
      );
      const res = await Promise.all(createTablesPromises);

      await createAnimal(db, {
        class_animal: "Luong cu",
        common_name: "Ech xanh",
        species: "Ech",
        image: "abc.jpeg",
        description: "Ech ngoai dong",
      });
      const res1 = await getAnimals(db);
    };
    loadDB();
  }, []);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default Root;
