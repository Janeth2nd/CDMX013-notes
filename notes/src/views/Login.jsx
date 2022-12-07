import { googleAuth } from "../componentes/google";
import {  useNavigate } from "react-router-dom";
import './login.css'

const loginImages = require.context('./../img', true)

export default function Login(props) {

    const navigate = useNavigate();
    const { setUser } = props;
    console.log(props);

    const handleClick= () => {
        const userPromise = googleAuth();
        userPromise.then((user) => {
            setUser(user);
            navigate("/home");
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='login'>

            <img
                src={loginImages(`./titlewhite-figma.png`)}
                alt={""}
                className="labnote-title"
            />

            <img
                src={loginImages(`./googleLogo.png`)}
                alt={""}
                className="google-logo"
            />

            <p>Use your google account</p>

            <button type="button" className="btn-google" onClick={() => { handleClick() }}>Sign in with Google</button>

            <div className="developed">Developed By</div>
            <footer className="footer">2022 Janeth Segundo | Laboratoria</footer>



            <img
                src={loginImages(`./c.png`)}
                alt={""}
                className="c-logo"
            />

        </div>
    )
}