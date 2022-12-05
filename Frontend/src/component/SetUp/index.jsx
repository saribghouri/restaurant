import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../context";
import "./index.css";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Otp from "../Otp";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 48;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "100%",
    },
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SetUp() {
  let { state, dispatch } = useContext(GlobalContext);
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("dedh", event.currentTarget);

    console.log({
      ResName: data.get("ResName"),
      TimeZone: data.get("TimeZone"),
      email: data.get("email"),
      //   catigories: data.get("catigories"),
      Restaurentaddress: data.get("Restaurentaddress"),
      password: data.get("password"),
      Tagline: data.get("Tagline"),
      RestaurentContact: data.get("Restaurent Contact"),
      // agree: data.get("agree"),
      Intrested: data.get("Intrested"),
    });

    try {
      let response = await axios.post(`${state.baseUrl}/SetUp`, {
        ResName: data.get("ResName"),
        Tagline: data.get("Tagline"),
        email: data.get("email"),
        Restaurentaddress: data.get("Restaurentaddress"),
        TimeZone: data.get("TimeZone"),
        RestaurentContact: data.get("Restaurent Contact"),
        password: data.get("password"),
        Intrested: data.get("Intrested"),
      });
      console.log("response: ", response.data.message);
      navigation("/Otp", { state: { email: data.get("email") } });
    } catch (e) {
      console.log("Error in api call: ", e);
    }
  };
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const currency_list = [
    "US Dollar",
    "AFA Afghan Afghani",
    "ALL Albanian Lek",
    "DZD Algerian Dinar",
    "AOA Angolan Kwanza",
    "ARS Argentine Peso",
    "AMD Armenian Dram",
    "AWG Aruban Florin",
    "AUD Australian Dollar",
    "AZN Azerbaijani Manat",
    "BSD Bahamian Dollar",
    "BHD Bahraini Dinar",
    "BDT Bangladeshi Taka",
    "BBD Barbadian Dollar",
    "BYR Belarusian Ruble",
    "BEF Belgian Franc",
    "BZD Belize Dollar",
    "BMD Bermudan Dollar",
    "BTN Bhutanese Ngultrum",
    "BTC Bitcoin",
    "BOB Bolivian Boliviano",
    "BAM Bosnia-Herzegovina Convertible Mark",
    "BWP Botswanan Pula",
    "BRL Brazilian Real",
    "GBP British Pound Sterling",
    "BND Brunei Dollar",
    "BGN Bulgarian Lev",
    "BIF Burundian Franc",
    "KHR Cambodian Riel",
    "CAD Canadian Dollar",
    "CVE Cape Verdean Escudo",
    "KYD Cayman Islands Dollar",
    "XOF CFA Franc BCEAO",
    "XAF CFA Franc BEAC",
    "XPF CFP Franc",
    "CLP Chilean Peso",
    "CNY Chinese Yuan",
    "COP Colombian Peso",
    "KMF Comorian Franc",
    "CDF Congolese Franc",
    "CRC Costa Rican ColÃ³n",
    "HRK Croatian Kuna",
    "CUC Cuban Convertible Peso",
    "CZK Czech Republic Koruna",
    "DKK Danish Krone",
    "DJF Djiboutian Franc",
    "DOP Dominican Peso",
    "XCD East Caribbean Dollar",
    "EGP Egyptian Pound",
    "ERN Eritrean Nakfa",
    "EEK Estonian Kroon",
    "ETB Ethiopian Birr",
    "EUR Euro",
    "FKP Falkland Islands Pound",
    "FJD Fijian Dollar",
    "GMD Gambian Dalasi",
    "GEL Georgian Lari",
    "DEM German Mark",
    "GHS Ghanaian Cedi",
    "GIP Gibraltar Pound",
    "GRD Greek Drachma",
    "GTQ Guatemalan Quetzal",
    "GNF Guinean Franc",
    "GYD Guyanaese Dollar",
    "HTG Haitian Gourde",
    "HNL Honduran Lempira",
    "HKD Hong Kong Dollar",
    "HUF Hungarian Forint",
    "ISK Icelandic KrÃ³na",
    "INR Indian Rupee",
    "IDR Indonesian Rupiah",
    "IRR Iranian Rial",
    "IQD Iraqi Dinar",
    "ILS Israeli New Sheqel",
    "ITL Italian Lira",
    "JMD Jamaican Dollar",
    "JPY Japanese Yen",
    "JOD Jordanian Dinar",
    "KZT Kazakhstani Tenge",
    "KES Kenyan Shilling",
    "KWD Kuwaiti Dinar",
    "KGS Kyrgystani Som",
    "LAK Laotian Kip",
    "LVL Latvian Lats",
  ];

  return (
    <div className="main_parent">
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xy"
          background-color="white
        "
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar className="avator" sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Set up Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="ResName"
                    fullWidth
                    id="ResName"
                    label="Restaurant Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={10} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="TimeZone"
                    label="Time Zone"
                    name="TimeZone"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={6}>
                  <Select
                    item
                    xs={1}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    name="Intrested"
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {currency_list.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="Tagline"
                    label="Restaurent Tag Line"
                    type="text"
                    id="Tagline"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="Restaurentaddress"
                    label="Restaurent address"
                    type="text"
                    id="Restaurentaddress"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="Restaurent Contact"
                    label="Restaurent Contact No"
                    type="number"
                    id="RestaurentContact"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                className="signUp"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit()}
              >
                Set Up
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
