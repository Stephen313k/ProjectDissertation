import React, {useState, useEffect } from 'react'
import MainChat from './MainChat';
import Members from './Members';
import { getServerData, CreateNewCategory, CreateNewChannel, LeaveServer } from '../services/Servers';
import { SendNewInvitation } from '../services/notifications';
import QuizCategories from './QuizCategories.jsx';

function Server(props) {

    const [serverDetail, setServerDetail] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    //State for the modals
    //category
    const [titleNewCtg, settitleNewCtg] = useState();
    //channel
    const [titleNewCh, settitleNewCh] = useState();
    const [topicNewCh, settopicNewCh] = useState();
    //category for new channel
    const [ctgForNewChannel, setctgForNewChannel] = useState();

   const [username, setUsername] = useState();



    useEffect(()=> {
        //Check for token
        const token = localStorage.getItem("token");
        if(typeof props.ActiveServer !== 'undefined'){
            getServerData(props.ActiveServer, token)
            .then(response =>{
                setServerDetail(response.data);
                if (response.is_admin === true){
                    setIsAdmin(true);
                }
                setDataLoaded(true);
            })
        }

    }, [props.ActiveServer])


/// functions for modals  
  function ModalTrigger(parameter, category_id){
        //pass in parameter
        var modal = document.getElementById(parameter);
        //set channel category with new category id
        setctgForNewChannel(category_id);
        //display the modal
        modal.style.display = 'block';
    }

    function ModalClose(parameter){
        var modal = document.getElementById(parameter);
        setctgForNewChannel('');
        modal.style.display = 'none';
    }
    const handleSubmitCategory = (e) => {
        e.preventDefault();
        //pass in new server detail/id and new title category
        CreateNewCategory(serverDetail.id, titleNewCtg)
        .then(response =>{
          //add reponse to the array and close
            serverDetail.categories.push(response);
            ModalClose("add-category-modal");
        })
    };
    
    const handleSubmitInvitation = (e) => {
        e.preventDefault();
        //Check for token
        const token = localStorage.getItem("token");
        SendNewInvitation(username, serverDetail.id, token)
        .then(response => {
            //save the modal
            console.log(response);
            ModalClose("invite-user-modal");
        })
    };    
    
    const handleSubmitChannel = (e) => {
        e.preventDefault();
          //pass in new server detail/id, category, title and topic
        CreateNewChannel(serverDetail.id, ctgForNewChannel, titleNewCh, topicNewCh)
        .then(response => {
            //filter the category using obj through text_channels and add new channel
            serverDetail.categories.filter(obj=>obj.id === ctgForNewChannel)[0]['text_channels'].push(response);
            ModalClose("add-channel-modal");
        })
    };
    function handleClick(parameter, event){
      //to activate when click on text channel
        props.setTextChannel(parameter);
    };

    //function for leaving server
    const handleLeaveServer = (e) => {
        e.preventDefault();
        //leave server with specific server id
        LeaveServer(serverDetail.id)
        .then(response =>{
            //reload the website
            location.reload();
        })
    };

    if (dataLoaded === true){
    return(
        
        <main>
        {/* Modal for Group/Categories Channel Creation*/}  
            <div className="modal" id="add-category-modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form onSubmit={handleSubmitCategory}>
                <header className="modal-card-head">
                <p className="modal-card-title">Create new category or group</p>
                <a onClick={ModalClose.bind(this, "add-category-modal")} className="delete" aria-label="close"></a>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input id="title" type="text" maxLength="25" className="input" name="titleCategory" onChange={e => settitleNewCtg(e.target.value)} />
                    </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                <button type="submit" className="button is-success">Save changes</button>                
                {/* binding the modal when clicks for save categorys */}

                <a onClick={ModalClose.bind(this, "add-category-modal")} className="button">Cancel</a>
                </footer>
                </form>
            </div>
            </div>
        {/* End modal */}

        {/* Modal for User invitation */}  
        <div className="modal" id="invite-user-modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form onSubmit={handleSubmitInvitation}>
                <header className="modal-card-head">
                <p className="modal-card-title">Invite an user</p>
                  {/* binding the modal when clicks to invite user*/}
                <a onClick={ModalClose.bind(this, "invite-user-modal")} className="delete" aria-label="close"></a>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input id="userinviteipt" type="text" className="input" name="usernameinvi" onChange={e => setUsername(e.target.value)} />
                    </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                <button type="submit" className="button is-success">Save changes</button>
                  {/* binding the modal when clicks for save changes*/}
                <a onClick={ModalClose.bind(this, "invite-user-modal")} className="button">Cancel</a>
                </footer>
                </form>
            </div>
            </div>
        {/* End modal */}

        {/* Modal for Group/Categories Channel Creation*/}  
            <div className="modal" id="add-channel-modal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form onSubmit={handleSubmitChannel}>
                <header className="modal-card-head">
                <p className="modal-card-title">Create new text channel</p>
                 {/* binding the modal when clicks*/}
                <button onClick={ModalClose.bind(this, "add-channel-modal")} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">

                    <div className="field">
                    <label className="label">Title</label>
                    <div className="control">                                                                           {/* setting new title channel */}
                        <input id="titleChannel" type="text" maxLength="25" className="input" name="titleChannel" onChange={e => settitleNewCh(e.target.value)}/>
                    </div>
                    </div>

                    <div className="field">
                    <label className="label">Topic</label>
                    <div className="control">
                        <input id="topic" type="text" maxLength="50" className="input" name="topic" onChange={e => settopicNewCh(e.target.value)}/>
                    </div>
                    </div>


                </section>
                <footer className="modal-card-foot">
                <button type="submit" className="button is-success">Save changes</button>
                {/* binding the modal when clicks*/}
                <a onClick={ModalClose.bind(this, "add-channel-modal")} className="button">Cancel</a>
                </footer>
                </form>
            </div>
            </div>
        {/* End modal */}   

            <div className="columns pt-1">
                <div className="column is-2">
                    <div className="card">
                        <div className="card-image">
                        <figure className="image">
                            <img src={serverDetail.banner} alt="Placeholder image" />
                        </figure>
                        </div>
                        <div className="card-content">
                            <p className="title is-4">{serverDetail.title}</p>
                            <p className="subtitle is-6">{serverDetail.description}</p>
                        </div>
                        <footer className="card-footer">
                            {/* using handle submit invitation modal above */}
                            <a onClick={ModalTrigger.bind(this, "invite-user-modal")} className="card-footer-item">Invite People</a>
                            {/* using handle leave modal above*/}
                            <a onClick={handleLeaveServer} className="card-footer-item">Leave server</a>
                        </footer>
                    </div>

                    <br></br>

                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <button onClick={ModalTrigger.bind(this, "add-category-modal")} className="button is-small is-primary is-rounded">
                                    <span className="icon is-small">
                                        <i className="material-icons">add</i>
                                    </span>
                                    <span>Category</span>
                                </button>
                            
                            {serverDetail.categories.map(category =>(
                                <aside className="menu">
                                    <p key={category.id} className="menu-label">{category.title}</p>

                                    <button onClick={ModalTrigger.bind(this, "add-channel-modal", category.id)} className="button is-small is-primary is-rounded">
                                        <span className="icon is-small">
                                            <i className="material-icons">add</i>
                                        </span>
                                        <span>Channel</span>
                                    </button>

                                    <ul className="menu-list">
                                        {/* Map out the text channels */}
                                        {category.text_channels.map(text_channel =>(
                                            <li key={text_channel.id}><a onClick={handleClick.bind(this, text_channel)}>{text_channel.title}</a></li>
                                        ))}
                                    </ul>
                                </aside>
                            ))}

                            </div>
                        </div>
                    </div>

                </div>
                {/* This is where the main chat is displayed */}
                <div className="column is-7">
                    <MainChat TextChannel={props.TextChannel} chatData={props.chatData} setchatData={props.setchatData} isAdmin={isAdmin} server={serverDetail.id}/>
                </div>

                <div className="column is-2">
                     {/* pass the members in, check if user is admin  */}
                    <Members members={serverDetail.members} isAdmin={isAdmin} server={serverDetail.id} />                  
                </div>
            </div>
        </main>
    )
    } else {
    return (
        
       <div><QuizCategories/></div>
    )
    }
}

export default Server