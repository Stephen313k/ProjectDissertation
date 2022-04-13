import React, {useState} from 'react'
import { Link } from 'react-router-dom';

function ServersNav(props) {

    //Set the active server overlay
    const [ActiveServerCSS, setActiveServerCSS] = useState(null);

    function handleClick(parameter, event){
        props.setActiveServer(parameter);
        props.setTextChannel(null);
        props.setchatData([]);

        if(ActiveServerCSS !== null){
            document.getElementById(ActiveServerCSS).classList.remove('active-img');
        }

        document.getElementById(parameter).classList.add('active-img');
        //this function allows the user click on the sidenav servers to change the value on setactiveserver
        setActiveServerCSS(parameter);

    }

    return (
        <div className="box">
            <ul>
                <li style={{ paddingTop: "15px", paddingLeft: "5px"}}>
                    <Link to="/createserver" className="button is-dark is-small is-rounded ">Create</Link>
                </li>
                <li style={{ paddingTop: "15px", paddingLeft: "5px"}}>
                    <Link to="/explore" className="button is-dark is-small is-rounded">Explore</Link>
                </li>
                {props.servers.map(server =>(
                    <li key={server.id} style={{ paddingTop: "15px", paddingLeft: "5px"}}>
                        <figure className="image is-64x54">
                            <a onClick={handleClick.bind(this, server.id)}>
                                <img id={server.id} src={server.picture} className="is-rounded"></img>
                            </a>
                        </figure>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServersNav
/*
import React, {useState} from 'react'
import { Link } from 'react-router-dom';

//using props
function ServersNav(props) {

  //create new state
  //when click on server from navbar create an overlay 
  const [ActiveServerCSS, setActiveServerCSS] = useState(null);

  function handleClick(parameter, event){
    props.setActiveServer(parameter); //parameter is id of server
    props.setTextChannel(null);
    props.setchatData([]);

    if(ActiveServerCSS !== null){
      //remove if you're in an active server so you are able to sign into another one
      document.getElementById(ActiveServerCSS).classList.remove('active-img');
    }
    //assign it
    document.getElementById(parameter).classList.add('active-img');
    //this function allows the user to clock on the sidenav for servers
    //to change the value on setactiveserver
    setActiveServerCSS(parameter);
  }

  return (
    <div className="box">
        <ul>
            <li style={{paddingTop: "15px", paddingLeft:"5px"}}>
                <Link to="/createServer" className="button is-link is-small is-rounded">Create</Link>
            </li>
            <li style={{paddingTop: "15px", paddingLeft:"5px"}}>
                <Link to="/explore" className="button is-link is-small is-rounded">Explore</Link>
            </li>
            {props.servers.map(server =>(
                 <li key={server.id} style={{paddingTop:"15px", paddingLeft: "5px"}}>
                   <figure className="image is-65x54">
                      <a onClick = {handleClick.bind(this, server.id)}>
                        <img id={server.id} src={server.picture} className="is-rounded"></img>
                      </a>
                   </figure>
                </li>
            ))}
 
        </ul>

    </div>
  )
}

export default ServersNav*/