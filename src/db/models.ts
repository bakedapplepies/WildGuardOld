import { IColumn } from "./db-service";


type TableModels = {
    [key: string]: IColumn[];
}
export const models: TableModels = {  // IColumn[] acts as a table
    animals: [
        { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
        { name: "common_name", dataType: "TEXT", defaultValue: "''" },
        { name: "class", dataType: "TEXT", defaultValue: "''" },
        { name: "species", dataType: "TEXT", defaultValue: "''" },
        { name: "image", dataType: "TEXT", defaultValue: "''" },
        { name: "description", dataType: "TEXT", defaultValue: "''" },
    ]
}