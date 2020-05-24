import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/comment";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Divider, Button } from "@material-ui/core";
import CommentForm from "./CommentForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
// import commentApi from "..actions/commentApi.js"

//customize material UI
const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    }
})

const Comments = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    //useState to define component state properties
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllComments()
    }, [])//like ComponentDidMount() in class based com

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Comment Box"
                    content="Comment Deleted Successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('Are you sure to Delete this Comment?'))
            props.deleteComment(id,onSuccess)
    }


    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <CommentForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            //list items for each items inside the array
                            props.commentList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <div>
                                                    {record.message}
                                                </div>
                                                <div>
                                                    {record.rating}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => setCurrentId(record._id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => onDelete(record._id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}


//to map the list
const mapStateToProps = state => ({
    commentList: state.comment.list
})

const mapActionToProps = {
    fetchAllComments: actions.fetchAll,
    deleteComment: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Comments));
