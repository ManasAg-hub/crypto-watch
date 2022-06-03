import { makeStyles, createTheme } from "@material-ui/core";
export const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "",
  },
  bannerContent: {
    height: 180,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-evenly",
    borderBottom: "1px solid white",
  },
  tagline: {
    display: "flex",
    height: "60%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 15,
    marginTop:15,
    color: "gold",
    fontFamily: "Montserrat",
  },
  subHeading: {
    color: "darkgrey",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
  },
  info:{
      textAlign:"center",
      PaddingBottom:5,
  },
  list:{
      background:"#424242",
      borderRadius:"4px"
  },
  listItem:{
    borderBottom: "1px solid white",  
  },
  chart:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-evenly",
    alignItems:"center",

  }
}));

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
