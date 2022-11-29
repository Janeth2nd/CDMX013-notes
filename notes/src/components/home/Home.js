import './home.css'

export default function Home() { 
    //return <h1>Home</h1>
   const homeImages = require.context('../../img', true)
    return (
        <div className='home'>

            <img
                src={homeImages(`./title-mini.png`)}
                alt={""}
                className="labnote-miniLogo"
            />

            <img
                src={homeImages(`./userIcon.png`)}
                alt={""}
                className="user-icon"
            />

            <img
                src={homeImages(`./out.png`)}
                alt={""}
                className="go-out"
            />
            <img
                src={homeImages(`./writeNew-note.png`)}
                alt={""}
                className="writenote-text"
            />
            <img
                src={homeImages(`./spot-light.png`)}
                alt={""}
                className="spotlight-img"
            />

            <footer className="footer"> </footer>
            <img
                src={homeImages(`./add-newNote.png`)}
                alt={""}
                className="add-new-note"
            />
            <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />


        </div>
    )
}