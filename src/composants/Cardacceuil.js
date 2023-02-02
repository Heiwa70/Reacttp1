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
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const connect = bdd.IsConnected()
        connect.then((users) => {
            console.log("connect = " + users)
            if (users == false)
                setLoad(false)
            else
                setLoad(users)
        })

    }, [])


    const [isClicked, setIsClicked] = useState(false);
    var tab = new Array();
    let arrayCookies = new Array();
    let oldArray = new Array();
    let verif = new Array();
    verif = Cookies.get("ArrayCookies")

    if (verif == undefined) {
        Cookies.set("ArrayCookies", null)
    }

    const name = useSelector((state) => state.login)
    // console.log("-------------CARD -------------")
    //console.log(name[0].nom)
    //console.log("--------------------------")

    let [data, setData] = useState(null)

    Array.prototype.remove = function (value) {
        this.splice(this.indexOf(value), 1);
    }

    // 3. Create out useEffect function
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character/" + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber() + "," + getRandomNumber())
            .then(response => response.json())
            // 4. Setting *data* to the image url that we received from the response above
            .then(data => setData(data))


    }, [])


    function DeleteFavorite(id) {
        let array = CreateArray();
        array.shift();

        const index = array.indexOf(id.toString());
        array.splice(index, 1);
        if (index != -1)
            Cookies.set("ArrayCookies", array)
    }


// Écoute le clic sur tous les éléments avec l'ID "coeur"
    document.querySelectorAll("#coeur").forEach(function (heartElement) {
        heartElement.addEventListener("click", (call) => {
            // console.log(heartElement.textContent)
            // Vérifie si le contenu de l'élément est "🤍"
            if (heartElement.textContent === "🤍") {
                // Si oui, remplace le contenu par "❤️"
                heartElement.textContent = "❤️";
            } else {
                // Sinon, remplace le contenu par "🤍"
                heartElement.textContent = "🤍";
            }
        });
    });

    function CreateArray() {
        // Supprimer le premier caractère (une virgule)
        let chaine = verif.substring(1);
        // Diviser la chaîne de caractères en un tableau en utilisant la virgule comme délimiteur
        let array = chaine.split(",");


        return array;
    }

    function CheckIsFavorites(id) {
        // console.log("id = "+id)

        let array = CreateArray();

//        console.log(array); // affiche

        let index = array.indexOf(id.toString())
        //      console.log("index = "+ index)
        if (index != -1)
            return true
        else
            return false
    }


    oldArray = CreateArray();
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

                <a id={"coeur"}
                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
                     rounded-lg  cursor-pointer
                     focus:ring-4 focus:outline-none bg-gray-900
                      hover:bg-gray-600 ease-in duration-300 absolute bottom-0 mb-1 left-1/2 " onClick={() => {


                    if (CheckIsFavorites(data[i].id)) {
                        console.log("delete")
                        oldArray.remove(100)
                        DeleteFavorite(data[i].id)

                    } else {
                        console.log("add")
                        oldArray.push(data[i].id)
                        oldArray = oldArray.filter((item, index) => oldArray.indexOf(item) === index);
                        Cookies.set('ArrayCookies', oldArray)

                    }


                    //else
                    //  Cookies.set('ArrayCookies',[...oldArray,...arrayCookies])

                    console.log(Cookies.get('ArrayCookies'))

                }}
                >{data && CheckIsFavorites(data[i].id) ? "❤️" : "🤍"}


                </a>
            </div>
        </div>)
    }

    return (

        <div
            className={" w-full grid grid-cols-4 gap-4 mt-4 justify-items-center max-lg:grid-cols-3 max-sm:grid-cols-1"}>
            {tab.map((data, index) => (
                <div key={index}> {data}</div>
            ))}
        </div>
    );


}

export default Cardacceuil;
