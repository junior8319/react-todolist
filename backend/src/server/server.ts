import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3005;

app.listen(Number(PORT));
