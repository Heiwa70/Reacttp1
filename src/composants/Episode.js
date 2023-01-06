import GetUrl from "../class/Outils";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import './App.css';




function Episode(){
    console.log(GetUrl())


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
        fetch("https://rickandmortyapi.com/api/episode/?page=1")
            .then(response => response.json())
            // 4. Setting *data* to the image url that we received from the response above
            .then(data => setData(data))




    },[])





console.log(data && data.results.length)


    for (let i = 0; i < 20; i++) {
        //console.log(data && data[4].id)
        console.log("hey")
        tab.push(<div
            className=" cursor-pointer flex flex-col  items-center
               w-60 bg-white border border-gray-200 p-3 rounded-lg
                shadow-lg hover:scale-105 ease-in duration-300 relative
                " style={{height:400}}>


        </div>)}

    return(

        <div className={" w-full p-4 flex flex-col"}>
            <div>
                <button type="button"
                        className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default
                </button>
                <button type="button"
                        className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default
                </button> <button type="button"
                                  className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default
            </button>
            </div>

            {tab.map((data, index) => (
                <div key={index}> { data }</div>
            ))}
        </div>
    );


}

export default Episode;
