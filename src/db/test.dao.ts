import { SQLiteDatabase } from "expo-sqlite";
import { runQuery } from "./db-service";

export type Classroom = {
  id?: number;
  name: string;
  teacher: string;
};

export type Student = {
  id?: number;
  name: string;
  classroomId: number;
};

export const createClassrooom = async (db: SQLiteDatabase, info: Classroom): Promise<void> => {
  const { name, teacher } = info;

  const query = `
    INSERT INTO classrooms (name, teacher)
    VALUES (
        '${name}',
        '${teacher}'
    );
  `;
  console.log(
    `=========[db-service - createClassrooom]===========\n${query}\n========================================`
  );
  // const result = await db.executeSql(query);
  await runQuery(db, query);
};

export const createStudent = async (db: SQLiteDatabase, info: Student): Promise<void> => {
  const { name, classroomId } = info;

  const query = `
    INSERT INTO students (name, classroomId)
    VALUES (
        '${name}',
        '${classroomId}'
    );
  `;
  console.log(
    `=========[db-service - createClassrooom]===========\n${query}\n========================================`
  );
  // const result = await db.executeSql(query);
  await runQuery(db, query);
};


