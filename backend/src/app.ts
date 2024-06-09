import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        app.listen(3000, () => {
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
