import MysQL from '../mysql/mysql';
import{Router,Request,Response} from 'express';

const router = Router();

router.get('/heroes',(req: Request, res: Response )=>{

    const query = 'SELECT * FROM HEROES';
    MysQL.ejecutarQuery(query,(err:any,heroes:Object)=>{
        if (err) {
            res.status(400).json({
                ok:false,
                error:err
            });
        }else{
            res.json({
                ok:true,
                heroes:heroes
            });
        }
    });
});

router.get('/heroes/:id',(req: Request, res: Response )=>{
    const id = req.params.id;

    const escapeID = MysQL.instance.cnn.escape(id);

    const query = `SELECT * FROM HEROES WHERE ID=${escapeID}`;

    MysQL.ejecutarQuery(query,(err:any,heroes:Object)=>{
        if (err) {
            res.status(400).json({
                ok:false,
                error:err
            });
        }else{
            res.json({
                ok:true,
                heroe:heroes
            });
        }
    });
});

export default router;