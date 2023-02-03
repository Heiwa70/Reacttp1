import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import FireBase from "../class/FireBase";
import {useSelector} from "react-redux";

function getRandomNumber() {
    return Math.floor(Math.random() * 826) + 1;
}


function Fav() {

    const bdd = new FireBase();
    const [load, setLoad] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [data, setData] = useState(null);
    const [arrayFav, setArrayFav] = useState([]);

    const dataRedux = useSelector((state) => state.login);
    const userName = dataRedux[0].nom || null;

    useEffect(() => {
        const connect = bdd.IsConnected();
        connect.then((users) => {
            console.log("connect = " + users);
            if (users === false) {
                setLoad(false);
            } else {
                setLoad(users);
            }
        });
    }, []);

    useEffect(() => {
        if (!userName) return;

        const response = bdd.readData(userName);
        response.then((data) => {
            console.log(data);
            setArrayFav(data);
        });
    }, [userName]);

    useEffect(() => {
        if (!arrayFav.length) return;
        const sizeArray = arrayFav.length
        console.log(sizeArray)
        fetch(
            "https://rickandmortyapi.com/api/character/" + arrayFav[sizeArray - 1] + "," + arrayFav[sizeArray - 2] +
            "," + arrayFav[sizeArray - 3] + "," + arrayFav[sizeArray - 4] + "," + arrayFav[sizeArray - 5]
        )
            .then((response) => response.json())
            .then((data) => setData(data));
    }, [arrayFav]);

    function CheckIsFavorites(id) {
    }

    function DeleteFavorite(id, nameDoc) {
        const response = bdd.readData(nameDoc)
        response.then((data) => {
            const newArrayFavoris = data
            const index = newArrayFavoris.indexOf(id)
            if (index != -1){
                //console.log(index)
                 newArrayFavoris.splice(index, 1)
                bdd.UpdateFavoris(newArrayFavoris, nameDoc)

            }


            //bdd.UpdateFavoris(newArrayFavoris, nameDoc)
        })
    }

    let tab = new Array()
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
                      hover:bg-gray-600 ease-in duration-300 absolute bottom-0 mb-1 left-1/2"

                   onClick={() => {
                       for (let j = 0; j < 1; j++) {
                           if (dataRedux[0].nom != null && data) {
                               const userName = dataRedux[0].nom
                               DeleteFavorite(data[i].id, userName)
                           }
                       }

                   }}
                >❤️


                </a>
            </div>
        </div>)
    }


    return load == false ? (
        <div>Connectez-vous sur ce <Link to={"/compte"} className={"font-bold"}>lien </Link>
            pour avoir assez
            à vos favoris</div>
    ) : (

        <div
            className={" w-full grid grid-cols-4 gap-4 mt-4 justify-items-center max-lg:grid-cols-3 max-sm:grid-cols-1"}>
            {tab.map((data, index) => (
                <div key={index}> {data}</div>
            ))}
        </div>
    );


}


export default Fav;