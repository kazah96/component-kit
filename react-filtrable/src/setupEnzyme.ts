import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

(configure as any)({ adapter: new Adapter() }); 