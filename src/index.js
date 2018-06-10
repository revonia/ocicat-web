import dva from 'dva';
import createLoading from 'dva-loading';

import './index.css';


// 1. Initialize
const app = dva({
  // onError(error) {
  //   console.error('app onError -- ', error);
  // },
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require('./models/app'));
app.model(require('./models/me'));
app.model(require('./models/student'));
app.model(require('./models/teacher'));
app.model(require('./models/res'));
app.model(require('./models/callTheRoll'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
