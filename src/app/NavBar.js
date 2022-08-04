import { Link } from "react-router-dom";

export const NavBar = () =>
    <nav>
        <section>
            <h1>React!</h1>
            <div className="navContent">
                <div className="navLinks">
                    <Link to='/'>Posts</Link>
                </div>
            </div>
        </section>
    </nav>
