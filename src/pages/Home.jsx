import {Link} from 'react-router-dom';
import "./styles/home.css";



const Home = () => (
              <div className="home-container">
                  <img src="https://www.icicidirect.com/images//Fund%20manager-202210281647246454795.png" alt="gov" className="gov-logo" />
                  <h1 className="heading">Gov Fund Manager</h1>
                  <Link to="/add-allocation" ><button className="connect-btn" >Add Allocation</button></Link>
              </div>
)


export default Home;