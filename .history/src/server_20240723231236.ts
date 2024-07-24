import 'reflect-metadata';
import { AppDataSource } from './data-source'
import { app } from './app';

console.log('Database Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME
});

const startServer = async () => {
  try {
    console.log('Attempting to connect to the database...');
    
    AppDataSource.initialize().then(() => {
      console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    
    console.log('Database connected successfully ✅');

    app.listen(3010, () => {
      console.log('Server started on port 3010 🗄️');
    });
  } catch (error) {
    console.error('Error starting the server: ❌', error);
  }
};

startServer();
