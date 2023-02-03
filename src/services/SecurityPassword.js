function SecurityPassword(password) {
    if (password.length < 8) {
        return false;
    } else return true
}

export default SecurityPassword;