

// Import
var bcrypt = require('bcrypt');
var jwtutils = require ('../utils/jwt.utils');
var models = require('../models');
var asynclib = require('async');
// Contantes
const Email_Regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
const PassWord_Regexp = /^(?=.*\d).{4,8}$/;

//Routes 
module.exports = {

    register: function (req, res){
        //To implement

    var numtel =req.body.numtel;
    var username = req.body.username;
    var motdepass = req.body.motdepass;
    var email =req.body.email;
    var descrip = req.body.descrip;

    if(numtel == null || username == null || motdepass == null ){
     return res.status(400).json({ 'error':'Infos manquantes'});
    }

     if (username.length >= 13 || username.length<= 5) {
         return res.status(400).json({ 'error' : 'votre nom utilisateur doit etre compris enntre 5 et 13 Caractetre'});

     }

     if(!Email_Regexp.test(email)){
        return res.status(400).json({ 'error' : 'votre email nest pas valide'});
     }

     if(!PassWord_Regexp.test(motdepass)){
        return res.status(400).json({ 'error' : 'votre mot de passe de etre compris entre 4 et 8 Caractere'});
    }
// verify donness
  models.User.findOne({
  attributes: ['email'],
  where : {email: email}
  })
.then(function(UserFound){

    if(!UserFound){
     bcrypt.hash(motdepass,5,function(err,bcryptedPassword){
      var Newuser = models.User.create({
      email: email,
      username: username,
      numtel: numtel,
      motdepass: bcryptedPassword,
      descrip: descrip
     })

     .then(function(Newuser){
          return res.status(201).json({
          'userID' :Newuser.id
         })
      })
     .catch(function(err){
        return res.status(500).json({ 'error':'Ajout user impossible'});
      });

     });

    }else{
        return res.status(409).json({ 'error':'Utilisateur deja enregistrés'});   
    }


})
.catch(function(err){

    return res.status(500).json({ 'error':'Impossible de verifier user'});
    
});
   
},

    login: function(req, res){
        //To implement
        var numtel = req.body.numtel;
        var motdepass=req.body.motdepass;

        if(motdepass == null || numtel == null){
            return res.status(400).json({ 'error':'Infos manquantes pour se connecter'});
        }
        
        models.User.findOne({
            where : {numtel: numtel}
            })
            .then(function(UserFound){

                if(UserFound){
                   bcrypt.compare(motdepass, UserFound.motdepass, function(errBcrypt,resBcrypt){
                    if(resBcrypt){
                      return res.status(200).json({
                        'UserId' :UserFound.id,
                        'token' : jwtutils.generateTokenForUser(UserFound)
                      });
                    }else{
                        return res.status(403).json({ 'error':'Mot de pass non valide'});
                    }

                   }
                
                
                );
                }else{
                    return res.status(404).json({ 'error':'utilisateur non enregistré'});
                }
               
            })
           .catch(function(err){
              return res.status(500).json({ 'error':'impossible de verifier user'});
            });
    },

    getUserProfile : function(req ,res){
        // Get  Auth header
        
        var hearderAuth = req.headers['authorization'];
        var UserId = jwtutils.getUserId(hearderAuth);
        console.log(UserId);
        if(UserId < 0)
            return res.status(400).json({'error' : 'wrong token' });
       
          models.User.findOne({
            attributes : ['id', 'email', 'numtel','username', 'descrip'],
            where:{id : UserId}
        }).then(function(user){
         if (user){
             res.status(201).json(user);
         }else{
             res.status(404).json({'error': 'utilisateur non trouvé'});
         }

        }).catch(function(err){
            res.status(500).json({'error': 'Recuperation infos impossoble'});
            });
    

    }  ,

    updateUserProfile :  function(req, res) {



    }

 }