import { Link, makeStyles, Theme } from "@material-ui/core";
import { FOOTER_HEIGHT, FOOTER_TEXT } from "../utils/constants";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        background: theme.palette.background.paper,
        minHeight: FOOTER_HEIGHT,
        "& .MuiTypography-colorPrimary": {
            color: theme.palette.text.primary,
        },
    },
    footer: {
        textTransform: "uppercase",
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Link
                href={`${process.env.REACT_APP_API_URL}`}
                target="_blank"
                rel="noreferrer"
                className={classes.footer}
            >
                {FOOTER_TEXT}
            </Link>
        </div>
    )
}

export default Footer
