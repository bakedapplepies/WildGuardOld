import { useEffect } from "react";
import { createAnimal, getAnimals } from "./db/animal.dao";
import { createTable, deleteTable, getDBConnection, leftJoin } from "./db/db-service";
import { models } from "./db/models";
import RootStack from "./navigation/RootStack";
import { createClassrooom, createStudent } from "./db/test.dao";

const Root = () => {
  useEffect(() => {
    const loadDB = async () => {
      const db = await getDBConnection();
      // get all promises to create tables
      await deleteTable(db, "animals");
      await deleteTable(db, "classrooms");
      await deleteTable(db, "students");
      const createTablesPromises = Object.keys(models).map((tableName) =>
        createTable(db, tableName, models[tableName])
      );
      await Promise.all(createTablesPromises);

      // await createAnimal(db, {
      //   class_animal: "Luong cu",
      //   common_name: "Ech xanh",
      //   species: "Ech",
      //   image: "abc.jpeg",
      //   description: "Ech ngoai dong",
      // });
      // await createAnimal(db, {
      //   class_animal: "Co vu",
      //   common_name: "Khi",
      //   species: "Khi",
      //   image: "abc.jpeg",
      //   description: "Khi an chuoi",
      // });
      // const res1 = await getAnimals(db);
      // console.log(res1);

      await createClassrooom(db, { name: "Toan 1", teacher: "TuanNA" });
      await createClassrooom(db, { name: "Van 2", teacher: "Quang Anh" });
      await createClassrooom(db, { name: "Anh 4", teacher: "Hoang Bach" });

      await createStudent(db, { name: "Khanh Ly", classroomId: 1 });
      await createStudent(db, { name: "Tu Linh", classroomId: 2 });
      await createStudent(db, { name: "Viet Anh", classroomId: 1 });

      const results = await leftJoin<any[]>(
        db,
        "classrooms",
        "students",
        ["*", "classrooms.id as cid", "classrooms.name as cname", "students.id as sid"],
        "id",
        "classroomId"
      );
      console.log(results);

      const classroomInfo: any = {};
      results.forEach((item) => {
        if (item.classroomId === null) {
          return;
        }
        if (classroomInfo[item.classroomId]) {
          classroomInfo[item.classroomId].students.push(item.name);
        } else {
          classroomInfo[item.classroomId] = { students: [item.name], teacher: item.teacher };
        }
      });
      console.log("classroomInfo: ", classroomInfo);

      // const results = await leftJoin(db, "students", "classrooms", ["*"], "classroomId", "id");
      // console.log(results);
    };
    loadDB();
  }, []);

  return <RootStack />;
};

export default Root;

// From classroom left join student
[
  { classroomId: 1, id: 1, name: "Khanh Ly", teacher: "TuanNA" },
  { classroomId: 1, id: 3, name: "Viet Anh", teacher: "TuanNA" },
  { classroomId: 2, id: 2, name: "Tu Linh", teacher: "Quang Anh" },
  { classroomId: null, id: null, name: null, teacher: "Hoang Bach" },
];

[
  { classroomId: 1, id: 1, name: "Toan 1", teacher: "TuanNA" },
  { classroomId: 2, id: 2, name: "Van 2", teacher: "Quang Anh" },
  { classroomId: 1, id: 1, name: "Toan 1", teacher: "TuanNA" },
];
[
  { classroomId: 1, id: 1, name: "Khanh Ly", teacher: "TuanNA" },
  { classroomId: 1, id: 3, name: "Viet Anh", teacher: "TuanNA" },
];
const a = {
  "1": { students: ["Khanh Ly", "Viet Anh"], teacher: "TuanNA" },
  "2": { students: ["Tu Linh"], teacher: "Quang Anh" },
};

[
  { cid: 1, classroomId: 1, cname: "Toan 1", id: 1, name: "Khanh Ly", sid: 1, teacher: "TuanNA" },
  { cid: 1, classroomId: 1, cname: "Toan 1", id: 3, name: "Viet Anh", sid: 3, teacher: "TuanNA" },
  { cid: 2, classroomId: 2, cname: "Van 2", id: 2, name: "Tu Linh", sid: 2, teacher: "Quang Anh" },
  {
    cid: 3,
    classroomId: null,
    cname: "Anh 4",
    id: null,
    name: null,
    sid: null,
    teacher: "Hoang Bach",
  },
];
