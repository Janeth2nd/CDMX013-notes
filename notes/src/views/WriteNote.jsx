//import { Home } from'./Home'
import './writeNote.css'

const homeImages = require.context('../img', true)

export default function WriteNote(props) {
    console.log(props);

    return (
        <div className='writeNote'>

            <img
                src={homeImages(`./title-mini.png`)}
                alt={""}
                className="labnote-miniLogo"
            />

             <button className="go-out" type="button"> </button>
             

             <button className="saveNote" type="button"> </button>

             <footer className="containerFooter"> </footer>

             <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />
             <img
                src={homeImages(`./backto.png`)}
                alt={""}
                className="back-to"
            />



        </div>

    )
}