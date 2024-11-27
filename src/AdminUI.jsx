import Chatroom from "./components/Chatroom";
import Chatroom2 from "./components/Chatroom2";
import Chatroom3 from "./components/Chatroom3"
import Calendar from "./components/calendrier";
import FileUploadForm from "./components/FileUploadForm";
import AllMessage from "./components/AllMessage"

export default function AdminUI() {
    return (
        <>
            <div className="ChatRoom">
                <Chatroom />
                <Chatroom2 />
                <Chatroom3 />
            </div>
            <br />
            <center>

                <AllMessage />
            </center>
            <div className="SecondPart">
                <Calendar />
                <FileUploadForm />
            </div>
        </>
    )
}