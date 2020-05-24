import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/comment";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';

const initialFieldValues = {
    message: '',
    rating: ''
}
//styles
const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const CommentForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.commentList.find(x => x._id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.message = values.message ? "" : "This field is Required!!!"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Comment Box"
                    content="Comment Added Successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId === 0)
                props.createComment(values, onSuccess)
            else
                props.updateComment(props.currentId, values, onSuccess)
        }
    }

    ////////////////////////////////////////////
    /////////////////

    //   const [rating, setRating] = useState('');
    //   const [open, setOpen] =useState(false);

    //   const handleChange = (event) => {
    //     setRating(event.target.value);
    //   };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    //   const handleOpen = () => {
    //     setOpen(true);
    //   };
    ///////////
    const options = ['1', '2', '3', '4', '5'];
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>

            <TextField
                name="message"
                variant="outlined"
                label="type your comment..."
                fullWidth
                multiline
                rows={4}
                value={values.message}
                onChange={handleInputChange}
                {...(errors.message && { error: true, helperText: errors.message })}
            />

            <Autocomplete
                name="rating"
                value={values.rating}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Rating" variant="outlined" />}
            />
            {/* <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={values.rating}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    commentList: state.comment.list
})

const mapActionToProps = {
    createComment: actions.create,
    updateComment: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentForm));