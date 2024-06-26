import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import http from 'http';
import nodeSSPI from 'node-sspi';

const app = express();
var server = http.createServer(app);

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(function (req, res, next) {
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: false
    });
    nodeSSPIObj.authenticate(req, res, function(err){
        console.log('node SSPI authenticate callback.');
        if(res.writableEnded){
            console.log(res);
        }
        res.writableEnded || next();
    });
});

AppDataSource.initialize()
    .then(() => {
        server.listen(3000, () => {
            console.log('Server is running on port 3000');
            const userRepo = AppDataSource.getRepository('User');

            app.get('/users', async (req: Request, res: Response) => {
                console.log(req.connection['user']);
                const users = await userRepo.find();

                res.json({
                    status: 'OK',
                    data: users,
                });
            });

            app.post('/users', async (req: Request, res: Response) => {
                console.log(req.connection['user']);
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
