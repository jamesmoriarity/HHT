import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Website} from './components/Website/Website';

ReactDOM.render(<Website/>, document.getElementById("root"));
serviceWorker.unregister();