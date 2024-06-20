import express  from 'express';
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';
import globalError from './middlewares/errMiddleware.js';

const app = express();
app.use(express.json());

app.use('/product',productRoute)
app.use('/category', categoryRoute)
app.use('/user',userRoute)

app.use(globalError)

app.use('*', (req, res) => {
    res.json({ msg: "Cannot find the URL :" + req.originalUrl });
  });
 
export default app