import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import FilesRoute from './routes/files.route';
import IndexRoute from './routes/index.route';
import StreamsRoute from './routes/streams.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new FilesRoute(), new StreamsRoute()]);

app.listen();
