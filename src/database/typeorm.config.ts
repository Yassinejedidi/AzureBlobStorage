import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'
import { User } from "src/enteties/user.entity";

const dbConfig = config.get('db')

export const typeOrmConfig: TypeOrmModuleOptions={
    type: dbConfig.type,
    host:  dbConfig.host,
    port:dbConfig.port,
    username:dbConfig.username,
    password:dbConfig.password,
    database: dbConfig.database,
    entities:[User],
    synchronize: dbConfig.synchronize,

    
}