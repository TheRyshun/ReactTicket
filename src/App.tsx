import {
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  useMediaQuery,
  Button,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { AccountCircle } from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import Stack from "@mui/joy/Stack";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import { useState } from "react";

const validateEmail = (email: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

let ValidatePrenom: boolean;
let ValidateNom: boolean;
let ValidatePhone: boolean;
let ValidateMessage: boolean;

function App() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [formValues, setFormValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    phone: "",
    message: "",
    messageLength: 0,
  });

  const [formErrors, setErrors] = useState({
    prenomErr: false,
    nomErr: false,
    phoneErr: false,
    emailErr : false,
    messageErr: false,
  });

  const handleClick = () => {
    setErrors({
      prenomErr: formValues.prenom.length <= 2,
      nomErr: formValues.nom.length <= 2,
      phoneErr: formValues.phone.length <= 10,
      emailErr: !validateEmail(formValues.email),
      messageErr: formValues.message.length < 11,
    })

    formValid();
  };

    const formValid = () => {
        if (ValidatePrenom == true && ValidateNom == true && validateEmail(formValues.email) && ValidatePhone == true && ValidateMessage === true) {
          alert("Validation du formulaire");
          const CardPrenom = document.getElementById('cardPrenom')
          CardPrenom.textContent = "Prénom : "+ formValues.prenom
          const CardNom = document.getElementById('cardNom')
          CardNom.textContent = "Nom : "+ formValues.nom
          const cardEmail = document.getElementById('cardEmail')
          cardEmail.textContent = "Email : "+ formValues.email
          const cardPhone = document.getElementById('cardPhone')
          cardPhone.textContent = "Phone : "+ formValues.phone
          const cardMessage = document.getElementById('cardMessage')
          cardMessage.textContent = "Message : "+ formValues.message      
        }
    }
    
  return (
    <>
    <Box sx={{display: "flex"}}>
    <Card sx={{ maxWidth: 450, margin: "0 auto", padding: "0px 5px" }}>
      <CardContent>
        <Typography
          id="test"
          variant="h3"
          color="initial"
          align="center"
          mb={2}
          borderBottom={1}
          borderTop={1}
          paddingY={2}
          letterSpacing={"8px"}
        >
          TICKET
        </Typography>
        <Grid container spacing={1} direction="row">
          <Grid item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                <AccountCircle />
                <Typography variant="h6" color="initial">
                  Prénom
                </Typography>
                {formErrors.prenomErr && (
                  <Typography variant="caption" color="error">
                    (ERREUR)
                  </Typography>
                )}
              </Stack>
            </Box>

            <TextField
              sx={isMobile ? { width: "100%" } : { flexGrow: 1 }}
              label=""
              variant="standard"
              value={formValues.prenom}
              color={formValues.prenom.length >2  ? "success" : "error"}
              onChange={(event) => {
                if (event.target.value.length > 2) {
                  ValidatePrenom = true; 
                } else {
                  ValidatePrenom = false;
                }
                setFormValues({
                  ...formValues,
                  prenom: event.target.value,
                });
                setErrors({
                  ...formErrors,
                  prenomErr: event.target.value.length <= 2,
                });
              }}
            />
          </Grid>

          <Grid item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                <AccountCircle />
                <Typography variant="h6" color="initial">
                  Nom
                </Typography>
                {formErrors.nomErr && (
                  <Typography variant="caption" color="error">
                    (ERREUR)
                  </Typography>
                )}
              </Stack>
            </Box>

            <TextField
              sx={isMobile ? { width: "100%" } : { flexGrow: 1 }}
              label=""
              variant="standard"
              value={formValues.nom}
              color={formValues.nom.length > 2 ? "success" : "error"}
              onChange={(event) => {
                if (event.target.value.length > 2) {
                  ValidateNom = true; 
                } else {
                  ValidateNom = false;
                }
                setFormValues({
                  ...formValues,
                  nom: event.target.value,
                });
                setErrors({
                  ...formErrors,
                  nomErr: event.target.value.length <= 2,
                });
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} direction="row" mt={4}>
          <Grid item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                <AlternateEmailIcon />
                <Typography variant="h6" color="initial">
                  Email
                </Typography>
                {formErrors.emailErr && (
                  <Typography variant="caption" color="error">
                    (ERREUR)
                  </Typography>
                )}
              </Stack>
            </Box>
            <TextField
              type="email"
              inputMode="email"
              label=""
              variant="standard"
              color={
                formValues.email &&
                formValues.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)
                  ? "success"
                  : "error"
              } // ajout de la validation regex pour la couleur
              sx={{ width: "100%", mb: "6px" }}
              onChange={(event) => {
                setFormValues({
                  ...formValues,
                  email: event.target.value,
                });
                setErrors({
                  ...formErrors,
                  emailErr: !validateEmail(formValues.email),
                });
              }}
              onKeyPress={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
            />
          </Grid>

          <Grid item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                <PhoneIcon />
                <Typography variant="h6" color="initial">
                  Téléphone
                </Typography>
                {formErrors.phoneErr && (
                  <Typography variant="caption" color="error">
                    (ERREUR)
                  </Typography>
                )}
              </Stack>
            </Box>
            <Box mt={"6px"}>
              <PhoneInput
                inputStyle={{ width: "100%" }}
                country="fr"
                onlyCountries={["fr", "es", "it"]}
                value={formValues.phone}
                onChange={(event) => {
                  if (event.length >= 11) {
                    ValidatePhone = true; 
                  } else {
                    ValidatePhone = false;
                  }
                  setFormValues({
                    ...formValues,
                    phone: event,
                  });
                  setErrors({
                    ...formErrors,
                    phoneErr: event.length < 11,
                  });
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} mt={4}>
            <Box sx={{ display: "flex" }}>
              <Stack
                spacing={1}
                direction={"row"}
                sx={{ alignItems: "center" }}
              >
                <MessageIcon />
                <Typography variant="h6" color="initial">
                  Message
                </Typography>
                {formErrors.messageErr && (
                  <Typography variant="caption" color="error">
                    (ERREUR)
                  </Typography>
                )}
              </Stack>
            </Box>
            <TextField
              id="text"
              multiline
              rows={4}
              variant="outlined"
              sx={{ width: "100%" }}
              value={formValues.message}
              onChange={(event) => {
                if (event.target.value.length > 10) {
                  ValidateMessage = true; 
                } else {
                  ValidateMessage = false;
                }
                setFormValues({
                  ...formValues,
                  message: event.target.value,
                  messageLength: event.target.value.length,
                });
                setErrors({
                  ...formErrors,
                  messageErr: event.target.value.length <= 10,
                });
              }}
              inputProps={{
                maxLength: 500,
              }}
            />
            <Typography
              variant="caption"
              color={formValues.messageLength === 500 ? "error" : "initial"}
              mt={0.5}
              sx={{
                display: "flex",
                justifyContent: "end",
                fontWeight:
                  formValues.messageLength === 500 ? "bold" : "italic",
              }}
            >
              {formValues.messageLength}/500
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            mt={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              variant="contained"
              color={
                ValidatePrenom &&
                ValidateNom &&
                ValidatePhone &&
                ValidateMessage &&
                validateEmail(formValues.email)
                  ? "success"
                  : "error"
              }
              sx={{
                width: "100%",
                justifyContent: "space-between",
                letterSpacing: "8px",
                borderRadius: "16px",
              }}
              endIcon={<SendIcon />}
              onClick={handleClick}
            >
              Envoyer
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
      <Box>
        <Card sx={{paddingX: "15px", paddingY: "15px"}}>
          <Typography variant="body1" color="initial">Répertoire Ticket</Typography>
          <Card sx={{padding: "5px"}}>
            <Typography marginY={1} variant="body1" color="initial" id="cardPrenom"></Typography>
            <Typography marginY={1} variant="body1" color="initial" id="cardNom"></Typography>
            <Typography marginY={1} variant="body1" color="initial" id="cardEmail"></Typography>
            <Typography marginY={1} variant="body1" color="initial" id="cardPhone"></Typography>
            <Typography marginY={1} variant="body1" color="initial" id="cardMessage"></Typography>

          </Card>
        </Card>
      </Box>
    </Box>
    </>
  );
}


export default App;
