const express =require('express')
const fs= require('fs')
const path=require('path')
const router=express.Router();

const usersPath=path.join(__dirname,'../data/users.json');
 router.post('/login',(req,res,next)=>{
    const {username, password}=req.body;
    fs.readFile(usersPath,'utf-8',(err,data)=>{
        if(err){
            const err=new Error("Error reading the user credentials");
            err.status=500;
            return next(err);
        }
        let users=[];
        if(data){
            users=JSON.parse(data);
        }
        const user=users.find(user=> user.username===username);
        if(!user)
        {
            return res.status(401).render('login',{errorMessage:'Invalid username'})
        }
        if(user.password!==password)
        {
            return res.status(401).render('login',{errorMessage:'Inavalid Password'})
        }
        req.session.userId=user.username;
        req.session.user=user;
        return res.redirect('/home');
    });
});

router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); 
    }
    res.render('/home', { user: req.session.user });
});

router.get('/profile', (req, res)=>{
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('/home', { user: req.session.user });
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out. Please try again.");
        }
        res.redirect('/login');
    });
});

module.exports = router;

