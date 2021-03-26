import {Link} from 'react-router-dom'
import '../stylesheets/App.css'

const Footer = (props)=> {
    return(
    <div>
        <nav  className="header">
          <Link to="/" className="header-li"> Accueil </Link>
          <Link to="/myaccount" className="header-li"> Mon compte </Link>
          <Link to="/logpage" className="header-li"> Se connecter </Link>
        </nav>
    </div>
    )
}

export default Footer;