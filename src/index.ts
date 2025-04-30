import 'dotenv/config';
import { app } from './services';
import * as features from './features';

app.use(features.documents.controller.router);
app.use(features.socialmedia.controller.router);
