import Logout from '../assets/logout.png';
import FireBase from "../class/FireBase";
import {Link} from "react-router-dom";


function Gestion() {
    const bdd = new FireBase()

    function HandleLogout() {
        bdd.LogOut()
    }

    return (
        <section name="DataUserLogin">
        <div className="w-full h-96 flex justify-center align-middle mt-10 relative">
            <div className=" w-52 h-64 bg-gray-200 rounded-xl">

            </div>
            <a href="/compte">

                <button onClick={HandleLogout} className="w-14 h-10 rounded-xl
                 bg-blue-400 hover:bg-blue-500 absolute bottom-[0]
                 flex justify-center items-center translate-x-[-50%] left-1/2">
                    <img src={Logout} className="w-1/2 h-auto"
                    />
                </button>
            </a>

        </div>


    </section>)
}

export default Gestion