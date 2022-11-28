import React, { useState, useEffect, createRef } from "react";
import { useParams } from "react-router-dom";
//importamos avatar
import Avatar from "@mui/material/Avatar";
import { getUsuarioServidor } from "../../Controlador";
import { useNavigate } from "react-router-dom";
import AddAPhotoTwoToneIcon from "@mui/icons-material/AddAPhotoTwoTone";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import { updateUser } from "../../Controlador";

import "./Profile.css";

export default function Profile() {
  const [usuario, setUsuario] = useState({});
  const [socials, setSocials] = useState({
    twitter:"",
    instagram:"",
    facebook:"",
  });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    img: null,
    description: "",
    twitter: "",
    instagram: "",
    facebook: "",
    imageData: null,
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  useEffect(() => {
    //Obtenemos el usuario

    getUsuarioServidor(username)
      .then((res) => {
        setUsuario(res?.data?.usuario);
        if(res.data.usuario.profile!== null && res.data.usuario.profile!==undefined){
        setImage(res.data.usuario.profile.image);
        setDescription(res.data.usuario.profile.description);
        setSocials({
          twitter:res.data.usuario.profile.twitter,
        instagram:res.data.usuario.profile.instagram,
        facebook:res.data.usuario.profile.facebook,
        })
      }
      })
      .catch((error) => {
       
       console.log(error)
       navigate("/");
      });
  }, []);

  const [open, setOpen] = React.useState(false);
  const inputFileRef = createRef(null);

  function handleUpdate() {
    
    updateUser(form).then((result) =>{
      console.log(result.data.image)
      localStorage.setItem("img",result.data.image)
      navigate(0)
    })
   
    
    
  }

  const handleClickOpen = () => {
    setOpen(true);
    setForm({
      description: description,
      twitter: socials.twitter,
      instagram: socials.instagram,
      facebook: socials.facebook,
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleImgChange(e) {
    const newImage = e.target?.files?.[0];

    console.log(newImage);

    if (newImage) {
      let url = URL.createObjectURL(newImage);
      updateForm({ img: url, imageData: newImage });
    }
  }

  return (
    <div className="profile">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puede actualizar su perfil con una imagen de perfil, una descripción
            y enlaces sus redes sociales de preferencia.
          </DialogContentText>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <label htmlFor="myInputFile">
              <Avatar
                alt="Imagen de perfil"
                src={form.img || "http://localhost:5000/avatar/" + image}
                sx={{
                  width: 150,
                  height: 150,
                  filter: "brightness(50%)",
                  zIndex: 0,
                  position: "relative",
                }}
              />

              <AddAPhotoTwoToneIcon
                sx={{
                  position: "relative",
                  bottom: 80,
                  zIndex: 1,
                  left: 65,
                  cursor: "pointer",
                  color: "white",
                }}
              />
              <input
                name="myInputFile"
                id="myInputFile"
                accept="image/*"
                ref={inputFileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleImgChange}
              />
            </label>
          </div>
          <p style={{ textAlign: "center" }}>
            Pulse en la imagen para modificarla
          </p>
          <TextField
            margin="dense"
            id="description"
            label="Descripción"
            type="text"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            fullWidth
            inputProps={{ maxLength: 120 }}
            variant="standard"
            multiline
            rows={2}
          />

          <TextField
            margin="dense"
            id="Twitter"
            label="Usuario de Twitter"
            type="text"
            value={form.twitter}
            onChange={(e) => updateForm({ twitter: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="Instagram"
            label="Usuario de Instagram"
            type="text"
            value={form.instagram}
            onChange={(e) => updateForm({ instagram: e.target.value })}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="Facebook"
            label="Usuario de Facebook"
            type="text"
            value={form.facebook}
            onChange={(e) => updateForm({ facebook: e.target.value })}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <button className="profile-container-button" onClick={handleClose}>
            Cancelar
          </button>
          <button className="profile-container-button" onClick={handleUpdate}>
            Actualizar
          </button>
        </DialogActions>
      </Dialog>

      <div className="profile-container">
        <div className="profile-container-img">
          {/*Avatar*/}
          <Avatar
            alt="Imagen de perfil"
            src={"http://localhost:5000/avatar/" + image}
            sx={{ width: 150, height: 150 }}
            className="icon"
          />
        </div>
        {localStorage.getItem("user") === username ? (
        <div className="profile-container-buttonContainer">
          <button
            className="profile-container-button profile-container-button-update"
            onClick={handleClickOpen}
          >
            Editar Perfil
          </button>
        </div>
) : <></>}
        <div className="profile-container-body">
          <div className="profile-container-body-name">{usuario.name}</div>
          <div className="profile-container-body-desc">{description} </div>
          <div className="profile-container-body-desc">
            Miembro desde: <strong>{usuario?.date} </strong>{" "}
          </div>

          {/*Estadísticas*/}
          <div className="profile-container-body-stats">
            <div className="profile-container-body-stats-item">
              <div className="profile-container-stats-item-title">52</div>
              <div className="profile-container-stats-item-txt">
                Intercambios
              </div>
            </div>
            <div className="profile-container-body-stats-item">
              <div className="profile-container-stats-item-title">300</div>
              <div className="profile-container-stats-item-txt">Compras</div>
            </div>

            <div className="profile-container-body-stats-item">
              <div className="profile-container-stats-item-title">52</div>
              <div className="profile-container-stats-item-txt">Anuncios</div>
            </div>
          </div>

          {/*Redes*/}

          <div className="profile-container-body-social">
            {socials.twitter !== undefined && socials.twitter !== ""  ? (
              <div className="profile-container-body-stats-item">
                <a
                  href={"https://twitter.com/" + socials.twitter}
                  class="profile-container-social-item twitter"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon-font">
                    <TwitterIcon />
                  </span>
                </a>
              </div>
            ) : (
              <></>
            )}
          {socials.instagram !== undefined && socials.instagram !== ""  ? (
            <div className="profile-container-body-stats-item">
              <a
                href={"https://www.instagram.com/" + socials.instagram}
                class="profile-container-social-item instagram"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon-font">
                  <InstagramIcon />
                </span>
              </a>
            </div>) : (
              <></>
            )}

              {socials.facebook!== undefined && socials.facebook !== ""  ? (
            <div className="profile-container-body-stats-item">
              <a
                href={"https://www.facebook.com/" + socials.facebook}
                class="profile-container-social-item facebook"
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon-font">
                  <FacebookIcon />
                </span>
              </a>
            </div>): (<></>)}
          </div>
        </div>
      </div>
    </div>
  );
}
