import { googleAuth } from '../google';
import './login.css'

export default function Login() {
    const loginImages = require.context('../../img', true)
    const play = () =>{
        googleAuth()
        console.log("it works");
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

            <button className="btn-google" onClick={()=>{play()}}>Sign in with Google</button>

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