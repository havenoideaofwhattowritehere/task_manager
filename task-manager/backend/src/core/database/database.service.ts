import {ConfigService} from "@nestjs/config";
import {Sequelize} from "sequelize-typescript";
import {Task} from "../../modules/tasks/entities/task.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
//                dialect: 'mysql',
//                dialectModule: require('mysql2'),
                dialect: 'postgres',
                dialectModule: require('pg'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
            });
            sequelize.addModels([
                Task
            ]);
            return sequelize;
        },
        inject: [ConfigService],
    },
];