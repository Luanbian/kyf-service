import 'dotenv/config';
import { app } from './services';
import * as features from './features';

app.use('/api', features.documents.controller.router);
app.use('/api', features.socialmedia.controller.router);
app.use('/api', features.customer.controller.router);
