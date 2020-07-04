import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/sidebar-nav.css';
import './styles/global.scss';
import './styles/style.css' //All globals styles should be imported there. I.e. any CSS frameworks or something like this.

import './styles/default.css';

import App from './App.html';

const app = new App({
	target: document.body,
	data: {
		name: 'MyApp'
	}
});

export default app;