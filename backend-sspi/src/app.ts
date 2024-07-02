import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import http from 'http';
import nodeSSPI from 'node-sspi';

const app = express();
var server = http.createServer(app);

// frontend資材をbackendからbackendと同じホスト名及びポート番号で提供するための設定
//app.use(express.static('../frontend/dist/frontend/browser/'));

// cors設定の順序は認証処理の前に定義する。
// またPreflight Requestの処理はここで行われる。
app.use(cors({
    origin: 'http://localhost:4200', // 指定したfrontend(Angular)のURLのみからのリクエストを許可
    credentials: true,
}));

// NTML認証処理
app.use(function (req, res, next) {
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: false
    });

    // NTML認証を行う
    nodeSSPIObj.authenticate(req, res, function(err){
        // 以下の場合にはresにヘッダが設定されるため判定を行い、次のWEBAPI処理には進まない。
        //  ・NTML認証処理向けのリクエストの場合
        //  ・認証エラーの場合
        if(!res.writableEnded){
            // WEBAPIの処理を行う
            next();
        }
    });
});

// JSONのパース
app.use(express.json());

// ログ出力
app.use((req, res, next) => {
    next();
    console.log('---------- ' + req.method + ', ' + req.originalUrl + ', ' + res.statusCode);
});

AppDataSource.initialize()
    .then(() => {
        server.listen(3000, 'localhost', () => {
            console.log('Server is running on port 3000');
            const userRepo = AppDataSource.getRepository('User');

            app.get('/users', async (req: Request, res: Response) => {
                //console.log(req.connection['user']); // NTML認証で取得したユーザー情報を取得可能
                const users = await userRepo.find();

                res.json({
                    status: 'OK',
                    data: users,
                });
            });

            app.post('/users', async (req: Request, res: Response) => {
                //console.log(req.connection['user']); // NTML認証で取得したユーザー情報を取得可能
                const data: User = req.body;

                const result = await userRepo.save(data);

                res.json({
                    status: 'OK',
                    data: result,
                });

            });
        });
    }).catch((err) => {
        console.error(err);
    });
