var bcrypt = require('bcryptjs')

function encryptPwd(pwd)
{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(pwd , salt);
        return hash
    }
    catch (err) {
        console.log(err);
    }
}

function decrypetPwd(pwd, dbPwd)
{
    try{
        return bcrypt.compareSync(pwd, dbPwd)
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {encryptPwd, decrypetPwd}