import GetUrl from "../class/Outils";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import './App.css';
import {Link} from "react-router-dom";
import FireBase from "../class/FireBase";


function Episode() {
    console.log(GetUrl())


    const bdd = new FireBase()
    bdd.IsConnected();


    const [isClicked, setIsClicked] = useState(false);
    var tab = new Array();
    let arrayCookies = new Array();
    let oldArray = new Array();
    let verif = new Array();
    verif = Cookies.get("ArrayCookies")


    let [data, setData] = useState(null)

    Array.prototype.remove = function (value) {
        this.splice(this.indexOf(value), 1);
    }

    // 3. Create out useEffect function
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/episode/?page=" + GetUrl())
            .then(response => response.json())
            // 4. Setting *data* to the image url that we received from the response above
            .then(data => setData(data))


    }, [])

    if (data) console.log("data = " + data.results)

    if (data) {
        let taille = data.results.length
        for (let i = 0; i < taille; i++) {
            //console.log(data && data[4].id)

            tab.push(
                <p>{data && data.results[i].name + " | " + data.results[i].episode + " | " + data.results[i].air_date}</p>)
        }
    }


    return (

        <div className={" w-full p-4 flex flex-col"}>
            <div>
                <a href={"http://localhost:3000/episode?id=1"}>
                    <button type="button"
                            className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Page
                        1
                    </button>
                </a>

                <a href={"http://localhost:3000/episode?id=2"}>
                    <button type="button"
                            className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Page
                        2
                    </button>
                </a>

                <a href={"http://localhost:3000/episode?id=3"}>
                    <button type="button"
                            className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Page
                        3
                    </button>
                </a>

            </div>

            {tab.map((data, index) => (

                <div key={index}>
                    <div className={"flex justify-center align-middle  w-1/1"}>{console.log("index = " + index)}
                        <Link to={"/SingleEpisode?id=2"} className={"w-1/2"}>
                            <div
                                className={"w-1/1 border-b-2 text-center my-2 py-4 cursor-pointer bg-blue-400 rounded-2xl hover:bg-blue-500 transition ease-in delay-200"}>
                                {data}

                            </div>
                        </Link>

                    </div>
                </div>))}
        </div>);


}

export default Episode;
