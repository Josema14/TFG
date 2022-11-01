const express = require("express");
const app = express();

//Importamos cors
const cors = require("cors");
//Importamos la conexion a la BD
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnect = require("./db/dbConnect");
const bodyParser = require("body-parser");

//Importamos el schema
const User = require("./models/User");
const Item = require("./models/Item");
const Trade = require("./models/Trade");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//Conectamos con mongo

dbConnect();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

//Inicio
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//Registro
app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      console.log(request.body, hashedPassword);
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        name: request.body.user,
      });

      user
        .save()
        .then((result) => {
          console.log("creando usuario");
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          if (error.code === 11000)
            response.status(400).send({
              message: "Email already in use",
              error,
            });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//Login

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              type: 1,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          // return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            user: user.name,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "EmailError",
        type: 2,
        e,
      });
    });
});

//new Item
app.post("/item", (request, response) => {
  const item = new Item({
    titulo: request.body.titulo,
    ubicacion: request.body.ubicacion,
    fechaInicio: request.body.fechaInicio,
    imagen: request.body.imagen,
    fechaFinal: request.body.fechaFinal,
    descripcion: request.body.descripcion,
    tipo: request.body.tipo,
    personas: request.body.personas,
    precio: request.body.precio,
    propietario: request.body.propietario,
    cantidad: request.body.cantidad,
  });

  item
    .save()
    .then((result) => {
      console.log("creando item");
      response.status(201).send({
        message: "Item Created Successfully",
        result,
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
      response.status(500).send({
        message: "Error creating item",
        error,
      });
    });
});

//new Item
app.post("/tradeMessage", (request, response) => {
  
  let emailPropuesto = request.body.emailPropuesto
  let _idAnfitrion = request.body._idAnfitrion
  let _idPropuesto= request.body._idPropuesto
  let usuarioAnfitrion = request.body.usuarioAnfitrion
  const trade = new Trade({

    propietario : usuarioAnfitrion,
    comprador : emailPropuesto,
    itemPropietario : _idAnfitrion,
    itemComprador : _idPropuesto,


  })

  trade
    .save()
    .then((result) => {
      console.log("creando trade");
      response.status(201).send({
        message: "Trade Created Successfully",
        result,
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
      response.status(500).send({
        message: "Error creating item",
        error,
      });
    });
});


//Repasar codigos de error
//GetItems
app.get("/item", (request, response) => {

  let query = {};
  if (request.query.email !== "null"){
  
    User.findOne({ email: request.query.email }).then(
      (user) => {

        query.propietario = {$regex: "^((?!" + user.name + ").)*$"} ;
        Item.find(query).then((items) => {
    return response.status(200).send(items);
  })
})}

  else{

    Item.find({query}).then((items) => {
      return response.status(200).send(items);
    }

  





)}})


//Compra
app.post("/purchase", (request, response) => {

  console.log(request.body)
  User.findOne({ email: request.body.email }).then((user) => {
    Item.findById(request.body._id)
      .then((item) => {

        console.log(user.inventory)
        for(id of user.inventory){
          console.log(id)
          if(id.equals(item._id) ){
            response.status(500).send({
              message: "Ya posee este objeto",
             
            });
            return;
          }
        }
  

        item.cantidad = item.cantidad - 1;
        item.save();

        user.inventory.unshift(request.body._id);

        user.save().then((result) => {
          response.status(201).send({
            message: "Purchase Created Successfully",
            result,
          });
        });
      })
      .catch((error) => {
        console.log("ERROR", error);
        response.status(500).send({
          message: "No items left",
          error,
        });
      });
  });
});

//Recibir Items
app.get("/inventory", (request, response) => {
  User.findOne({ email: request.query.email }).then((user) => {
    let items;
    let ids = user.inventory;
   ids = ids.concat(user.trading);
 
    Item.find()
      .where("_id")
      .in(ids)
      .exec()
      .then((result) => {
        items = result;
     
        return response.status(200).send({
          items,
        });
      });
  });
});

app.post("/inventory", (request, response) => {
  User.findOne({ email: request.body.email }).then((user) => {
    let items;
    let ids = user.inventory;
    let precio = request.body.precio;
 
    Item.find()
      .where("_id")
      .in(ids)
      .exec()
      .then((result) => {
        items = result;
        let itemsPrecio = []
        for (item of items) {
          if ((item.precio >= precio-100) && (item.precio <= precio +100) ) itemsPrecio.push(item)

        }
     
        return response.status(200).send({
          itemsPrecio,
        });
      });
  });
});




//Búsqueda
app.post("/search", (request, response) => {
  let query = {};

  if (request.body.email !== ""){
    User.findOne({ email: request.body.email }).then(
      (user) => {

        query.propietario = {$regex: "^((?!" + user.name + ").)*$"} ;

        if (request.body.fechaInicial) {
          query.fechaInicio = { $gte: request.body.fechaInicial };
        }
        if (request.body.fechaFinal) {
          query.fechaFinal = { $lte: request.body.fechaFinal };
        }
      
        if (request.body.personas > 0) {
          query.personas = request.body.personas;
        }
        if (request.body.intercambio == false && request.body.oficial == false) {
          query.tipo = "none";
        } else if (request.body.intercambio != request.body.oficial) {
          if (request.body.intercambio == true) query.tipo = "Intercambio";
          else query.tipo = "oficial";
        }
      
        console.log(query);
      
        Item.find({
          $and: [
            {
              $or: [
                { titulo: { $regex: ".*" + request.body.titulo + ".*" } },
                { ubicacion: { $regex: ".*" + request.body.titulo + ".*" } },
              ],
            },
            query,
          ],
        }).then((items) => {
          return response.status(200).send(items);
        });

      }
    )
  }

 
});


//setChange

app.post("/setChange", (request, response) => {
//Hacer códigos de error

 User.findOne({ email: request.body.email }).then((user) => {

  //Buscamos el item original
  Item.findById(request.body._id).then((itemOriginal) => {

    //Registramos el nuevo item

    const item = new Item({
      titulo: itemOriginal.titulo,
      ubicacion: itemOriginal.ubicacion,
      fechaInicio: itemOriginal.fechaInicio,
      imagen: itemOriginal.imagen,
      fechaFinal: itemOriginal.fechaFinal,
      descripcion: itemOriginal.descripcion,
      tipo: "Intercambio",
      personas: itemOriginal.personas,
      precio: itemOriginal.precio,
      propietario: user.name,
      cantidad: 1,
      original: itemOriginal._id
    });

    //Guardamos el nuevo item

    
    item
    .save()
    .then((result) => {
      console.log("creando item");
      response.status(201).send({
        message: "Item Created Successfully",
        result,
      });

      //Se lo añadimos al usuario en la lista de intercambios
      user.trading.unshift(item._id);

      
     
    
    for( var i = 0; i < user.inventory.length; i++){ 
    
        if ( user.inventory[i].equals(itemOriginal._id)  ) { 
            console.log( user.inventory[i] + " " + itemOriginal._id)
            user.inventory.splice(i,1); 
        }
      }
    
      user.save()

    })
    .catch((error) => {
      //console.log("ERROR", error);
      response.status(500).send({
        message: "Error creating item",
        error,
      });
    });





  })
  //Error item no existe
  .catch()
})
//Error usuario no existe
.catch()



  
});


app.post("/removeChange", (request, response) => {
  //Hacer códigos de error
  
   User.findOne({ email: request.body.email }).then((user) => {
  
    //Buscamos el item original
    Item.findById(request.body._id).then((item) => {
  
      //Obtenemos el objeto original
      itemOriginal = item.original;
      itemAnterior = item._id;

      //Lo borramos del usuario

      for( var i = 0; i < user.trading.length; i++){ 
    
        if ( user.trading[i].equals( itemAnterior._id)  ) { 
          
            user.trading.splice(i,1); 
        }
      }
      user.inventory.unshift(item.original)
      user.save()
   

      
      item
      .delete()
      .then((result) => {
      response.status(201).send({
        message: "Item Deleted Successfully",
        result,
      });
  
      })
      .catch((error) => {
        //console.log("ERROR", error);
        response.status(500).send({
          message: "Error deleting item",
          error,
        });
      });

      
  
  
  
  
  
    })
    //Error item no existe
    .catch()
  })
  //Error usuario no existe
  .catch()
  
  
  
    
  });
  







////Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
