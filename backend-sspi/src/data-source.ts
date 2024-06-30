import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "./entity/User"

// DB接続情報
export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Passw0rd",
    database: "hellodb",
    options: {
        trustServerCertificate: true, // エラー「self signed certificate」が出た場合はこれを追加
    },
    synchronize: true, // テーブルがない場合は自動で作成する。本番環境では使わない
    logging: true,     // ログ出力
    entities: [User],  // Entityクラスを指定
    migrations: [],
    subscribers: [],
})
