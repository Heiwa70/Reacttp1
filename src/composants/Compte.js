import {useDispatch, useSelector} from "react-redux";
import FireBase from "../class/FireBase";
import {Link} from "react-router-dom";


function Compte() {
//const vueData = useSelector((state)=>console.log("Useselec = "+state.login[0].name))
    const dispatch = useDispatch()
    const bdd = new FireBase();



        //const users = bdd.readData("clement70200@gmail.com")

/*

    console.log(users)
    users.then(res => {
        console.log("---------readDATA---------------")
        console.log(res)
        bdd.UpdateFavoris()
    })
    console.log(users)
    bdd.readData().then(res => {
        console.log("---------readDATA---------------")
        console.log(res)

    })

*/

    function handleClick() {
        const inputEmail = document.getElementById("email")
        const inputPassWord = document.getElementById("password")
        const email = inputEmail.value
        const password = inputPassWord.value
        console.log(email)
        console.log(password)
        bdd.ConnexionFireBase(email, password)
            .then((isConnected) => {
                console.log(isConnected)
                if (isConnected == true) {
                    alert("Tu es est connecter avec l'email : " + email + "🤗")

                    dispatch({
                        type: "login/SetUsers", payload: email
                    })
                    document.location ="/gestion"

                } else {
                    alert("Email ou mot de passe incorrect ❌")
                }
            })
            .catch((error) => {
                alert("Email ou mot de passe incorrect ❌")

            })


    }

    return (<section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">

            <div id="blockSIG"
                 className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Connecte toi sur ton compte
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Mail</label>
                            <input type="email" name="email" id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="toto@gmail.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de
                                passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">


                            </div>

                        </div>
                        <div id="btnSignIn" onClick={handleClick}
                             className="w-full text-white bg-blue-600 hover:bg-blue-700
                                focus:ring-4 focus:outline-none focus:ring-primary-300
                                font-medium rounded-lg text-sm px-5 py-2.5
                                text-center dark:bg-primary-600 dark:hover:bg-primary-700
                                 dark:focus:ring-primary-800 cursor-pointer"> Connexion
                        </div>
                        <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                            Tu n'as pas de compte ? <Link
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            to={"/inscription"}>Inscription</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>)
}


export default Compte;