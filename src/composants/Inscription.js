import {Link} from "react-router-dom";
import FireBase from "../class/FireBase";
import SecurityMail from "../services/SecurityMail";
import SecurityPassword from "../services/SecurityPassword";

function Inscription() {
    const bdd = new FireBase();

    function handleClick() {


        const inputNom = document.getElementById("nom");
        const inputEmail = document.getElementById("email");

        const nom = inputNom.value;
        const email = inputEmail.value;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (SecurityMail(email) == false) {
            alert("Email non valide");
            return;
        }

        const inputPassWord = document.getElementById("password");
        const password = inputPassWord.value;

        if (SecurityPassword(password) == false) {
            alert("Mot de passe trop court, minimun 8 caractères");
            return;
        }

        bdd.InscriptionFireBase(nom, email, password)
            .then((isConnected) => {
                if (isConnected) {
                    alert(`Tu es inscrit ${nom} avec l'email : ${email} ✅`);
                    document.location = "/gestion";
                } else {
                    alert("Email ou mot de passe incorrect ❌");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function handlePassword() {

    }



    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">

                <div id="blockSIG"
                     className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inscris toi 😄
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="nom"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nom</label>
                                <input type="text" name="nom" id="nom"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                   focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Jacky" required/>
                            </div>
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
                                       minLength="6"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required onChange={handlePassword}/>
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
                                 dark:focus:ring-primary-800 cursor-pointer"> Inscription
                            </div>

                            <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                                Tu as déja un compte ? <Link
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                to={"/compte"}>Connexion</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Inscription
