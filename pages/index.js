import App from './app';
import withData from '../lib/withData'
import ThingsList from '../components/thingsList'

export default withData((props) => (
  <App url={props.url} />
))
