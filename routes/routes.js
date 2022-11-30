import ShortUniqueId from 'short-unique-id';
function physioRoutes(physio,db){
    async function home(req,res){
        res.render('index')
    }
    async function loginGet(req,res){
        res.render('signin')
    }
    async function loginPost(req,res) {
        const theUsername = req.body.username;
        const upperUsername = theUsername.toUpperCase();
        const theCode = req.body.code;
        const user = await physio.getPatient(upperUsername);
        if (user.length > 0) {
            if (user[0].login_code === theCode) {
                req.session.user = user[0].login_code;
                req.flash('success', 'You have successfully logged in');
                setTimeout(() => {
                    res.redirect("back");
                }, 5000);
            } else {
                req.flash('error', 'Invalid login code');
                res.redirect("back");
            }
        }
    }
    async function signupGet(req,res){
        res.render('signup')
    }
    async function signupPost(req,res){
        const theFirstName = req.body.firstname;
        const upperFirstName = theFirstName.toUpperCase();
        const theLastName = req.body.lastname;
        const upperLastName = theLastName.toUpperCase();
        const theUserName = req.body.username;
        const upperUserName = theUserName.toUpperCase();
        const theAge = req.body.age;
        const uid = new ShortUniqueId();
        const user = await physio.getPatient(upperUserName);
        if(user.length === 0){
            await physio.addPatient(upperFirstName,upperLastName,upperUserName,theAge,uid());
            const shortId = await physio.getPatient(upperUserName);
            req.session.user = shortId[0].login_code;
            req.flash('success', 'You have successfully signed up');
            req.flash('theId', shortId[0].login_code);
            setTimeout(() => {
                res.redirect("back");
            }, 5000);
        }else{
            req.flash('error', 'User already exists');
            res.redirect("/signup");
        }
    }
    async function machineScreen(req,res){
        res.render('machine')
    }


    return{
        home,
        loginGet,
        signupGet,
        signupPost,
        loginPost,
        machineScreen
    }
}
export default physioRoutes;
