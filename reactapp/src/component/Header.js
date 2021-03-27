import {Link} from 'react-router-dom'
import '../stylesheets/App.css'
import logo from '../assets/logo.png'

const Header = (props)=> {
    return(
    <div>
        <nav  className="header">
          <div>
        <img className="header-img" src={logo} alt='logo'/>
        </div>
        <div>
          <Link to="/" className="header-li"> Accueil </Link>
          <Link to="/myaccount" className="header-li"> Mon compte </Link>
          <Link to="/logpage" className="header-li"> Se connecter </Link>
          </div>
        </nav>
    </div>
    )
}

export default Header;
