//material ui
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    toolbarTitle:{
        flexGrow: 1,

    }
}));


export default function Header(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position = "static"
                    color = "default"
                    elevation={2}>
                    
                    <Toolbar>
                        <Typography
                            variant = "h6"
                            color = "inherit"
                            className = {classes.toolbarTitle}
                        >
                            Quizzer
                        </Typography>
                    </Toolbar>
            </AppBar>
        </div>
    )
}