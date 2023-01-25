const express = require("express");
const app = express();

const mime = require("mime-types");

//Multer
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatar/");
  },
  filename: function (req, file, cb) {
    console.log();
    cb(null, req.body.username + "." + mime.extension(file.mimetype));
  },
});

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    console.log();
    cb(
      null,
      req.body.propietario +
        req.body.titulo +
        "." +
        mime.extension(file.mimetype)
    );
  },
});

const avatar = multer({ storage: storage });
const images = multer({ storage: storage2 });
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

//Servicios

const itemService = require("./servicioItem");
const userService = require("./servicioUser");
const tradeService = require("./servicioTrade");
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/avatar", express.static(__dirname + "/avatar"));
app.use("/images", express.static(__dirname + "/images"));
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

/*
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
*/
//Búsqueda CORRECTO
app.get("/items/search", (request, response) => {

  
  itemService
    .searchItems(request.query)
    .then((result) => {
      //Devolvemos los items
      return response.status(200).send(result);
    }) //Error
    .catch((error) => {
      console.log(error);
    });
});

app.post("/users/search", async (request, response) => {

 
  let user = await userService.getFullUsuarioByName(request.body.name);

  if(user){

    //Si tenemos el usuario, realizaremos la búsqueda de items

    let items = await itemService.searchUserItems(user, request.body)

    return response.status(200).send({
      items: items,
    })
    
  }

});

//Registro arreglado
app.post("/users", async (request, response) => {
  //Comprobación por si Front-End falla
  if (request.body.password.lenght < 8) {
    return response.status(400).send({
      message: "Invalid Credentials",
    });
  }

  try {
    //Intentamos crear el usuario
    let user = await userService.createUser(request.body);

    response.status(201).send({
      message: "User Created Successfully",
      userId: user._id,
    });
  } catch (error) {
    //Comprobación de errores
    //Error email
    console.log(error);
    if (error.code === 11000) {
      //Mensaje con todos los errores
      let message = {};
      //Si hubiera varios mensajes de error
      for (const property in error.keyPattern) {
        if (error.keyPattern[property] !== null)
          message[property] = `${property} already in use`;
      }

      //Enviamos los errores
      response.status(400).send({
        message,
      });
    }
  }
});

//Login antiguo
/*
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
          let image = "josemaria.png";
          if (user.profile?.image != undefined) image = user.profile.image;
          // return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            user: user.name,
            image,
            points:user.tripPoints,
            token,
          });
        })
        .catch((error) => {
          console.log(error);
          response.status(400).send({
            message: "Passwords does not match2",
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
*/
app.post("/users/login", async (request, response) => {
  //Le enviamos la información al servicio de usuarios
  let result = await userService.userLogin(request.body);

  //Si el resultado no es nulo lo enviamos.

  if (result != null) response.status(200).send({ result });
  else
    response.status(400).send({
      message: "Invalid Credentials",
    });
});

app.get("/user/:name", async (request, response) => {
  let usuario = await userService.getUsuarioByName(request.params.name);
  response.status(200).send({
    usuario,
  });
});

app.put("/user", avatar.single("imageData"), async (request, response) => {
  let urlImagen;
  if (request.file != undefined) urlImagen = request.file.filename;
  try {
    let user = await userService.updateProfile(request.body, urlImagen);
    return response.status(200).send({
      image: user.profile.image,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/user/tripPoints", async (request, response) => {
  console.log(request.body);
  try {
    let user = await userService.addPoints(
      request.body.name,
      request.body.points
    );
    return response.status(200).send({
      points: user.tripPoints,
    });
  } catch (error) {
    console.error(error);
  }
});

//new Item
/*
app.post("/item", (request, response) => {
  itemService
    .newItem(request.body)
    .then((result) => {
      console.log("creando item");
      response.status(201).send({
        message: "Item Created Successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(400).send({
        message: "Bad Request: Error Creating Item",
        error,
      });
    });
});
*/

app.post("/item", images.single("imagen"), async (request, response) => {
  let urlImagen;
  if (request.file != undefined) urlImagen = request.file.filename;
  else return response.status(400).send();

  try {
    console.log(request.body);
    let item = await itemService.newItem(request.body, urlImagen);
    
    if(request.body.tipo === "Intercambio") await userService.addNewTradeItem(request.body.propietario,item._id)
    else await userService.addPublishedItem(request.body.propietario,item._id)
    
    return response.status(200).send();
  } catch (error) {
    console.error(error);
  }
});

//CAMBIOS 
//GetItems CORRECTO
app.get("/items", (request, response) => {
  itemService
    .getItems(request.query.name)
    .then((items) => {
      response.status(200).send(items);
    })
    .catch((e) => {
      //Solo puede ocurrir un error de servidor
      response.status(500).send({
        message: "Internal Server Error",
      });
    });
});

//GetItems CORRECTO
app.get("/items/:id", (request, response) => {
  itemService
    .getItem(request.query.id)
    .then((item) => {
      response.status(200).send(item);
    })
    .catch((e) => {
      //Solo puede ocurrir un error de servidor
      response.status(500).send({
        message: "Internal Server Error",
      });
    });
});

//Recibir inventario CORRECTO por ahora
app.get("/users/:name/items", async (request, response) => {

  //Enviamos al servicio la información

  let result = await userService.getUsuarioPopulated(request.query)
  
  //Si existe el resultado lo enviamos
  if (result){
    return response.status(200).send({
      items : result.inventory.concat(result.trading) 
    })
  }
  //Si ha surgido algún problema envíamos error
  else {
    response.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
  /*
  userService
    .getUsuarioPopulated(request.query.name)
    .then((resultado) => {
      let items = itemService.getInventory(resultado);
      return response.status(200).send({
        items,
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
      response.status(500).send({
        message: "Internal Server Error",
        error,
      });
    });
    */
});


//InventoryValid 
//Correcto
app.get("/users/:name/items/:id", async (request, response) => {

  //Obtenemos el usuario y el paquete
  let user = await userService.getUsuarioPopulated(request.query);
 
  //Si existe el usuario obtenemos su inventario
  if(user){
    
    let result = await itemService.getValidInventory(user,request.query.price, request.query._id)
    console.log(result)
    return response.status(200).send({
      result,
    })
  }
  //Si no existe el usuario envíamos error
  else{
    return response.status(400).send({
      message: "Bad Request"
    })
  }

});

//Mensajes de intercambio
app.get("/messages", (request, response) => {
  userService
    .getUsuarioByName(request.query.name)
    .then((result) => {
      tradeService
        .getMessages(result.message)
        .then((result) => {
          console.log(result);
          return response.status(200).send({
            result,
          });
        })
        .catch((error) => {
          //Fallo con los mensajes
          console.log("ERROR", error);
          return response.status(500).send({
            message: "Internal Server Error",
            error,
          });
        });
    })
    .catch((error) => {
      //Fallo con el usuario

      console.log("ERROR", error);
      return response.status(404).send({
        message: "User Not Found",
        error,
      });
    });
});

//Lista de intercambios CORRECTO FALTA ERRORES
app.get("/users/:name/trades", async (request, response) => {

  //Le envíamos la información al servicio de usuario
  let user = await userService.getUsuarioTradesPopulated(request.query.token)


  
  if(user){
    return response.status(200).send({
      trades: user.message
    })
  }

  else return response.status(400).send({
    message: "Bad Request"
  })
 
});

//proponerTrade 
app.post("/proposeTrade", (request, response) => {
  tradeService
    .newTrade(
      request.body.usuarioAnfitrion,
      request.body._idAnfitrion,
      request.body.usuarioPropuesto,
      request.body._idPropuesto
    )
    .then((result) => {
      userService.saveTradeUsers(
        result.propietario,
        result.comprador,
        result._id
      );
      return response.status(200).send();
    })
    .catch((error) => {
      //Error interno, si ha llegado hasta aquí no puede ser otro fallo
      console.log("ERROR", error);
      return response.status(500).send({
        message: "Internal Server Error",
        error,
      });
    });
});

//trade/new CORRECTO, FALTA ERRORES
app.post("/trades", async (request, response) => {

    let item1 = await itemService.getItem(request.body._idAnfitrion);
    let item2 = await itemService.getItem(request.body._idPropuesto);
  
  //Le pasamos al servicio de intercambios la información de la aplicación
  let result = await tradeService.newTrade(
      request.body.usuarioAnfitrion,
      request.body._idAnfitrion,
      request.body.usuarioPropuesto,
      request.body._idPropuesto,
      request.body.token,
      item1.titulo,
      item2.titulo,
     
    )



  
  //Si se ha creado el intercambio, se lo aplicamos a ambos usuarios
  if (result){
    //Una vez tengamos la respuesta de vuelta, envíamos la respuesta
    let respuesta = await userService.saveTradeUsers(request.body.usuarioAnfitrion, request.body.usuarioPropuesto,result)

    if (respuesta) return response.status(201).send({
      id: result,
      message: "New Trade Created",
    })

    else return response.status(500).send({
      message: "Internal Server Error"
    })

  }
  else return response.status(400).send({
    message: "Bad Request"
  })
   
});


app.post("/acceptTrade", (request, response) => {
  tradeService
    .getTrade(request.body.idTrade)
    .then((trade) => {
      tradeService
        .cancelTradesByProduct(trade.itemPropietario)
        .then(() => {
          tradeService.acceptTrade(trade);
        })
        .catch((error) => {});
    })
    .catch((error) => {});
});

//Aceptar intercambio
app.post("/trades/accept", async (request, response) => {

  //Llamamos al servicio de intercambios para obtener el intercambio

  let trade = await tradeService.getTradePopulated(request.body.idTrade);
  console.log(trade)
  
  //Si hemos obtenido el intercambio, cancelamos todos los intercambios que tengan el ítem propietario.
  if (trade){
    
       //Cada usuario debe eliminar de su inventario el item intercambiado y añadir el nuevo
       await userService.acceptTradeHost(trade.propietario, trade.itemPropietario._id, trade.itemComprador._id);
       await userService.acceptTradeClient(trade.comprador, trade.itemComprador._id, trade.itemPropietario._id,trade.itemComprador.tipo);
       //Aceptamos el intercambio y devolvemos la respuesta.

    await tradeService.endTrade(trade)

    //Si ambos fueran intercambios se haría en ambos
    await tradeService.cancelTradesByProduct(trade)

    
 

  

 
  }

  
  else return response.status(500).send({
    message:"Internal Server Error"
  })

});

//CancelTrade
app.post("/refuseTrade", (request, response) => {
  console.log(request.body.idTrade);

  //Cancelamos el trade
  tradeService
    .cancelTrade(request.body.idTrade)
    .then(() => {
      return response.status(200).send();
    }) //errores
    .catch((error) => {});
});

//CancelTrade Correcto por ahora
app.post("/trades/refuse", async (request, response) => {
  console.log(request.body);

  //Le pasamos la id del intercambio al servicio

  let result = await tradeService.cancelTrade(request.body.idTrade, request.body.token);

  //Si es correcto devolvemos la respuesta, si no, devolvemos un error
  if (result){
    return response.status(200).send();
  }

  else return response.status(500).send({
    message: "Internal Server Error"
  })

});

//Compra Correcto por ahora
app.post("/users/items/", async (request, response) => {
  
   //Enviamos al servicio la información

   let result = await userService.itemPurchased(request.body)

   
   //Si existe el resultado se lo añadiremos a su inventario
   if (result.user !== null){
    
    //Disminuimos la cantidad del paquete
    
    let itemResult = await itemService.purchaseItem(request.body._id, result.user.tripPoints)

    //Si no ha surgido ningun error añadimos el item 
    if(itemResult.item !==null){

      let points = await userService.addItem(result.user, itemResult.item._id, itemResult.item.precio)
      return response.status(200).send({
        message: "Purchase Successfully",
        points: points
      });

    }
    //Si ha surgido algún error lo indicamos
    else{
      response.status(500).send({
        message: itemResult.message, 
      })

    }
   }
   //Si ha surgido algún problema envíamos el error
   else {
     response.status(500).send({
       message: result.message,
      
     });
    }   
});



//Anunciar intercambio CORRECTO

app.post("/items/trade", async (request, response) => {


  //Enviamos la información al servicio de items
  
  let result = await itemService.setTradeItem(request.body);

  //Si no ha surgido ningún problema envíamos la respuesta
  if (result.item) {

    await userService.addTradeItem(request.body, result.item);

    return response.status(201).send({
      message: "Item Created Successfully"
    })
  }
  //Si ha surgido un problema envíamos el error
  else {
    return response.status(500).send({
      message: result.message,
    });
  }
/*
  itemService.setTrade(request.body._id, request.body.name).then((result) => {
    userService
      .addTradeItem(request.body.name, result._id, result.original)
      .then((result) => {
        return response.status(201).send({
          message: "Item Created Successfully",
          result,
        });
      });
  });*/
});

//Borrar
app.post("/cancelTrade", (request, response) => {
  itemService.getOriginalId(request.body._id).then((result) => {
    userService.cancelTrade(
      request.body.name,
      request.body._id,
      result.original
    );
    itemService.deleteItemById(request.body._id).then((result) => {
      return response.status(201).send({
        message: "Item Deleted Successfully",
        result,
      });
    });
  });

  //Hacer códigos de error
});

//ItemTrade delete CORRECTO FALTA CANCELADO EN CASCADA
app.delete("/items/trade", async (request, response) => {

  //Enviamos la información al servicio de items
  
  let result = await itemService.getOriginalId(request.body._id);
  
  if(result.id){
   //Llamamos al servicio usuarios con la nueva id para hacer el cambio
   console.log(result)
   await userService.deleteTradeItemOriginal(request.body.name,
      request.body._id,
      result.id)

   //Cancelar intercambios en cadena si estaba en alguno

   
   await tradeService.cancelAllTradesById(request.body._id);

   await itemService.cancelItem(request.body._id);

   
  //Enviamos la respuesta
  return response.status(200).send({
    message: "Item Deleted Successfully",
  });
}

  else{
    //Lo borramos del usuario
    await userService.deleteTradeItem(request.body.name,request.body._id);
    //Cancelamos en cascada
    await tradeService.cancelAllTradesById(request.body._id);

    await itemService.cancelItem(request.body._id);

    

     //Enviamos la respuesta
  return response.status(200).send({
    message: "Item Deleted Successfully",
  });

  }

});

////Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
