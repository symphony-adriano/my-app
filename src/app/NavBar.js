import { Link } from "react-router-dom";

export const NavBar = () =>
    <nav>
        <section>
            <h1>npm</h1>
            <div className="navContent">
                <div className="navLinks">
                    <Link to='/'>Posts</Link>
                    <Link to='/posts/add'>Add</Link>
                </div>
            </div>
        </section>
    </nav>
