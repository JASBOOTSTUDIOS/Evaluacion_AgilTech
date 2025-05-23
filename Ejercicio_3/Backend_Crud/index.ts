import express ,{Request,Response}from 'express';
import productoRoutes from './src/routes/productRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', productoRoutes);
app.get('/',(req: Request, res:Response)=>{
    res.status(200).json({msg:"Funciona Bien"});
});

let PORT:number;
if(process.env.SERVER_PORT){
    PORT = parseInt(process.env.SERVER_PORT);
}else{
    PORT = 3000;
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
