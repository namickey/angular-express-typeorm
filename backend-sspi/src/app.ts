import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import http from 'http';
import nodeSSPI from 'node-sspi';

const app = express();
var server = http.createServer(app);

app.use(function (req, res, next) {
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: false
    });
    nodeSSPIObj.authenticate(req, res, function(err){
        console.log('err');
        console.log(err);
        //console.log(res);
        res.writableEnded || next();
    });
});
app.use(function (req, res, next) {
    console.log(req.connection['user']);
    next();
});
app.use(cors());
app.use(express.json());
AppDataSource.initialize()
    .then(() => {
        server.listen(3000, () => {
            console.log('Server is running on port 3000');
            const userRepo = AppDataSource.getRepository('User');

            app.get('/users', async (req: Request, res: Response) => {
                const users = await userRepo.find();

                res.json({
                    status: 'OK',
                    data: users,
                });
            });

            app.post('/users', async (req: Request, res: Response) => {
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
