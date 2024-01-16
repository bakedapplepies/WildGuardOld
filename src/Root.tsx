import { useEffect } from "react"
import { createTable, getDBConnection } from "./db/db-service"
import { models } from "./db/models"
import { Text, View } from "native-base"

const Root = () => {
    useEffect(() => {
      const loadDB = async () => {
        const db = await getDBConnection();

        // get all promises to create tables
        const createTablesPromises = Object.keys(models).map(tableName => createTable(db, tableName, models[tableName]));
        await Promise.all(createTablesPromises);

        // fill in 'animals' table
        
      }
    }, [])
    

    return (
        <View>
            <Text>
                Hello
            </Text>
        </View>
    )
}

export default Root;