import './App.css';
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FireBase from "../class/FireBase";


function getRandomNumber() {
    return Math.floor(Math.random() * 826) + 1;
}


function Cardacceuil() {

    const bdd = new FireBase()
    const [load, setLoad] = useState(null);

    useEffect(() => {
        const connect = bdd.IsConnected()
        connect.then((users) => {
            console.log("connect = " + users)
            if (users == false) setLoad(false)
            else setLoad(users)
        })

    }, [])


    const [isClicked, setIsClicked] = useState(false);


    const dataRedux = useSelector((state) => state.login)
    if (dataRedux[0].nom != null) {
        const userName = dataRedux[0].nom
    }

    const tab = [];


    let [data, setData] = useState(null)


    // 3. Create out useEffect function
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character/" + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber())
            .then(response => response.json())
            // 4. Setting *data* to the image url that we received from the response above
            .then(data => setData(data))


    }, [])

    function AddFavoris(id, nameDoc) {
        const response = bdd.readData(nameDoc)
        response.then((data) => {
            const newArrayFavoris = data
            newArrayFavoris.push(id)

            bdd.UpdateFavoris(newArrayFavoris, nameDoc)
        })
    }

    function DeleteFavorite(id, nameDoc) {
        const response = bdd.readData(nameDoc)
        response.then((data) => {
            const newArrayFavoris = data
            const index = newArrayFavoris.indexOf(id)
            const arrayWithDelete = newArrayFavoris.splice(index, 1)
            console.log(arrayWithDelete)
        })
    }




    function CreateArray() {

    }

    function CheckIsFavorites(id, nameDoc) {

        console.log("here")
        const response = bdd.readData(nameDoc)
        response.then((data) => {
            const newArrayFavoris = data
            const index = newArrayFavoris.indexOf(id)
            console.log(index)
            if (index == -1) {
                const item = document.getElementById(id.toString())
                item.textContent = "🤍"
                item.addEventListener("click",(obj)=>{
                    item.textContent = "❤️"
                })
                item.removeEventListener("click",(obj)=>{
                    item.textContent = "❤️"

                })
            } else {
                const item = document.getElementById(id.toString())
                item.textContent = "❤️"
                item.addEventListener("click",(obj)=>{
                    item.textContent = "🤍️"
                })
                item.removeEventListener("click",(obj)=>{
                    item.textContent = "🤍️"

                })

            }

            // alert()
        })


    }


    if (load == false) {
        console.log("load  false")

        document.querySelectorAll("#coeur").forEach((items) => {
            if (!items) {
                return;
            }

            items.style.display = "none";

        })
    }


    for (let i = 0; i < 5; i++) {


        tab.push(<div
            className=" cursor-pointer flex flex-col  items-center
               w-60 bg-white border border-gray-200 p-3 rounded-lg
                shadow-lg hover:scale-105 ease-in duration-300 relative
                " style={{height: 400}}>
            <Link to={data && "/personnage?id=" + data[i].id}>
                {data && <img className=" hauto rounded mt-2" src={data[i].image} alt="image du perso"/>}
            </Link>
            <div className="p-5">
                <a href="src/composants/App#">
                    {data &&
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black text-center">{data[i].name}</h5>}
                </a>
                {data && <p style={{fontSize: 10}} className=" text-black text-gray-400 truncate">{data[i].url}</p>}

                {data && <a id={data[i].id.toString()}
                            className="fav inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
                     rounded-lg  cursor-pointer
                     focus:ring-4 focus:outline-none bg-gray-900
                      hover:bg-gray-600 ease-in duration-300 absolute bottom-0 mb-1 left-1/2 " onClick={() => {
                    for (let j = 0; j < 1; j++) {
                        if (dataRedux[0].nom != null && data) {
                            const userName = dataRedux[0].nom
                           AddFavoris(data[i].id, userName)
                        }
                    }


                }}
                >{data && dataRedux[0].nom != null ? CheckIsFavorites(data[i].id, dataRedux[0].nom) : "err"}


                </a>}
            </div>
        </div>)

    }
    /*
        if (data)
            for (let i = 0; i < data.length; i++) {
                if (data) Heart(data[i].id.toString())

            }
            /*
     */
    /*
    for (let i = 0; i < data.length; i++) {
        if (data) Heart(data[i].id)

    }
    */

    return (

        <div
            className={" w-full grid grid-cols-4 gap-4 mt-4 justify-items-center max-lg:grid-cols-3 max-sm:grid-cols-1"}>
            {tab.map((data, index) => (<div key={index}> {data}</div>))}
        </div>);


}

export default Cardacceuil;
