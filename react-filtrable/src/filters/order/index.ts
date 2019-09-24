import FilterGenerator from '../../filter-generator';
import States from './states';
import { ORDER_TYPES} from './order-types'

const Filter = new FilterGenerator(States);
Filter.TYPES = ORDER_TYPES;

export default Filter;