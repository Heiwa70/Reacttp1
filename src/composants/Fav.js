import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function getRandomNumber() {
    return Math.floor(Math.random() * 826) + 1;
}


function Fav() {


    const [isClicked, setIsClicked] = useState(false);
    var tab = new Array();
    let arrayCookies = new Array();
    let oldArray = new Array();
    let verif = new Array();
    verif = Cookies.get("ArrayCookies")
    var fav = CreateArray();
    let size = fav.length;


    let [data, setData] = useState(null)

    Array.prototype.remove = function (value) {
        this.splice(this.indexOf(value), 1);
    }
    console.log("fav = " + fav)
    // 3. Create out useEffect function
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character/" + fav[size - 1] + "," + fav[size - 2] + "," + fav[size - 3] + "," + fav[size - 4] + "," + fav[size - 5])
            .then(response => response.json())
            // 4. Setting *data* to the image url that we received from the response above
            .then(data => setData(data))

        console.log("data in fetch = " + data)


    }, [])

    function Heart(){
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
        console.log("id = " + id)

        let array = CreateArray();

        console.log("array = "+array); // affiche

        for (let i = 0; i < array.length; i++) {

            if (id == array[i]) {
                console.log(true)
                return true
            }
        }
    }

    function DeleteFavorite(id) {
        let array = CreateArray();
        array.shift();

        const index = array.indexOf(id.toString());
        array.splice(index, 1);
        if (index != -1)
            Cookies.set("ArrayCookies",array)
    }


    oldArray = CreateArray();
    console.log("data = " + verif)
    if (data != null && verif != "null" && size >= 5) {
        for (let i = 0; i < 5; i++) {


            tab.push(<div
                className=" cursor-pointer flex flex-col  items-center
               w-60 bg-white border border-gray-200 p-3 rounded-lg
                shadow-lg hover:scale-105 ease-in duration-300 relative
                " style={{height: 400}}>
                <a href={data && "/personnage?id=" + data[i].id}>
                    {data && <img className=" hauto rounded mt-2" src={data[i].image} alt="image du perso"/>}
                </a>
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

                        if (CheckIsFavorites(data[i].id)) {
                            Heart()
                            console.log("delete")
                            DeleteFavorite(data[i].id)
                        } else {
                            Heart()
                            console.log("add")
                            oldArray.push(data[i].id)
                            oldArray = oldArray.filter((item, index) => oldArray.indexOf(item) === index);
                            Cookies.set('ArrayCookies', oldArray)
                        }

                    }}
                    >❤️


                    </a>
                </div>
            </div>)
        }

    } else {
        tab.push(<div>Pas assez de favoris 5 mini pour aller sur cette page cliquer sur ce <a className={"font-bold"}
                                                                                              href={"/"}>lien</a> pour
            ajouter des favoris</div>)
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


export default Fav;