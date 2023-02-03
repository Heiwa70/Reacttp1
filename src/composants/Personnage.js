import GetUrl from "../class/Outils";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import './App.css';
import FireBase from "../class/FireBase";




function Personnage(){
    console.log(GetUrl())

    const bdd = new FireBase()

    const [load, setLoad] = useState(null);

    useEffect(() => {
        const connect = bdd.IsConnected()
        connect.then((users) =>{
            console.log("connect = "+ users)
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



    let [data, setData] = useState(null)

    Array.prototype.remove = function(value) {
        this.splice(this.indexOf(value), 1);
    }

    // 3. Create out useEffect function
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character/"+GetUrl()+","+2+","+3+","+4+","+5)
            .then(response => response.json())
            // 4. Setting *data* to the image url that we received from the response above
            .then(data => setData(data))




    },[])



// Écoute le clic sur tous les éléments avec l'ID "coeur"
    document.querySelectorAll("#coeur").forEach(function(heartElement) {
        heartElement.addEventListener("click", (call)=>{
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

    if (load == false) {
        console.log("load  false")

        document.querySelectorAll("#coeur").forEach((items) => {
            if (!items) {
                return;
            }

            items.style.display = "none";

        })
    }


    for (let i = 0; i < 1; i++) {
        //console.log(data && data[4].id)

        tab.push(<div
            className=" cursor-pointer flex flex-col  items-center
               w-60 bg-white border border-gray-200 p-3 rounded-lg
                shadow-lg hover:scale-105 ease-in duration-300 relative
                " style={{height:400}}>
            <a href={data && "/personnage?id="+data[4].id}>
                {data && <img className=" hauto rounded mt-2" src={data[4].image} alt="image du perso"/>}
            </a>
            <div className="p-5">
                <a href="src/composants/App#">
                    { data && <h5 className="mb-2 text-2xl font-bold tracking-tight text-black text-center">{data[4].name}</h5>}
                </a>
                { data && <p style={{fontSize:10}} className=" text-black text-gray-400 truncate">{data[4].url}</p>}

                <a id={"coeur"}
                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white
                     rounded-lg  cursor-pointer
                     focus:ring-4 focus:outline-none bg-gray-900
                      hover:bg-gray-600 ease-in duration-300 absolute bottom-0 mb-1 left-1/2" onClick={() =>{

                }  }
                >🤍


                </a>
            </div>
        </div>)}

    return(

        <div className={" w-full p-4 flex flex-col"}>
            {tab.map((data, index) => (
                <div key={index}> { data }</div>
            ))}
            <div id={"perso"} className={"shadow-lg w-1/2 h-96 absolute mb-2 text-2xl font-bold tracking-tight text-black text-center"}>
                <p> {data && data[4].status}</p>
                <p>{data && data[4].gender}</p>
                <p>{data && data[4].species}</p>
                <p>Origin : {data && data[4].origin.name}</p>


            </div>
        </div>
    );


}

export default Personnage;
