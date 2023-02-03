// helloWorld.test.js
import fireBase from "../class/FireBase";
import SecurityMail from "../services/SecurityMail";
import SecurityPassword from "../services/SecurityPassword";
import FireBase from "../class/FireBase";

test('Rentrer un mot de passe de plus de 8 caractères', () => {
    expect(SecurityPassword("12082002")).toBe(true)
})

test('Rentrer un mot de passe de moins de 8 caractères', () => {
    expect(SecurityPassword("1234")).toBe(false)
})

test('Envoyer le mail doré', () => {
    expect(SecurityMail("clement70200@gmail.com")).toBe(true)
})

test('Envoyer mail suspect', () => {
    expect(SecurityMail("clement/password = 'null'")).toBe(false)
})

test('Test de connexion avec Firebase', async () => {
    const fire = new FireBase()
    const email = "clement70200@gmail.com";
    const password = "12082002";
    const result = await fire.ConnexionFireBase(email, password);
    expect(result).toBe(true);
});
