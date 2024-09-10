import { makeStyles } from "@mui/styles";

const Style = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#efefef",
    borderRadius: "15px",
    margin: "30px 0",
    display: "flex",
    flexDirection: "row !important",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: "#55133b",
    fontWeight: "400",
    textTransform: "capitalize",
  },
  image: {
    marginLeft: "15px",
    width: "5rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignContent: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: "#570861",
    backgroundColor: "#570861",
  },
}));

export default Style;
