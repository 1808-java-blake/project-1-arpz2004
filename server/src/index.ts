import * as bodyParser from 'body-parser';
// this will be the entry point for our application
import * as express from 'express';
import * as session from 'express-session';
import { reimbursementRouter } from './routers/reimbursement-router';
import { userRouter } from './routers/user-router';

// create the app object from express
const app = express();

// set the port
const port = process.env.PORT || 9001; // will use port from computers environment variables or 3000 if there is none
app.set('port', port);

const sess = {
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat'
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// register session middleware
app.use(session(sess));

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// use the body parser to convert request json
app.use(bodyParser.json());

app.use((req, resp, next) => {
  (process.env.REIMBURSEMENT_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.REIMBURSEMENT_APP_URL)
    : resp.header('Access-Control-Allow-Origin', `http://localhost:3000`);
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
  next();
})

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
