import { useNavigate } from "react-router-dom";

function Feed(props) {
    console.log(props);
    const navigate = useNavigate();

    const navigateTo = (route) => {
        navigate(route);
    };

    return (
     <>
     <h1>Feed</h1> 
     <button type="button" onClick={() => {navigateTo("/about");
      }}>
     About
     </button>
     </>

);
    }
export default Feed;