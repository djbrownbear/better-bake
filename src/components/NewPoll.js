import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";
import PollHeader from "./PollHeader";
import { 
  Box,
  Typography, 
  Button,
  Card,
  CardMedia,
  CardActions,
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";

const NewPoll = ({ dispatch, id, avatar, name, allOptions }) => {
  const navigate = useNavigate();
  const [optionOneNew, setOptionOneNew] = useState(""); 
  const [optionTwoNew, setOptionTwoNew] = useState(""); 
  const [optionOneImage, setOptionOneImage] = useState("");
  const [optionTwoImage, setOptionTwoImage] = useState("");

  useEffect(() => {
    setOptionOneNew(allOptions[0].text);
    setOptionTwoNew(allOptions[1].text);
    setOptionOneImage(allOptions[0].bakeURL);
    setOptionTwoImage(allOptions[1].bakeURL);
    const el = document.querySelector('#optionTwoNew');
    el.value = allOptions[1].text;
  }, []);

  const handleChange = (e) => {
    let idx = e.target.options.selectedIndex;
    let imgURL = e.target.options[idx].dataset.imgurl;

    if (e.target.id === "optionOneNew") {
      const optionOneNew = e.target.value;
      setOptionOneNew(optionOneNew);
      setOptionOneImage(imgURL);
    } else if (e.target.id === "optionTwoNew") {
      const optionTwoNew = e.target.value;
      setOptionTwoNew(optionTwoNew);
      setOptionTwoImage(imgURL);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddPoll(optionOneNew, optionTwoNew, optionOneImage, optionTwoImage));
    setOptionOneNew("");
    setOptionTwoNew("");
    setOptionOneImage("");
    setOptionTwoImage("");

    if (!id) {
      navigate("/dashboard");
    }
  };

  return (
    <Box>
      <Box className="page-wrapper inner">
        <form name="new-poll" className="poll-info wrapper" onSubmit={handleSubmit}>
          <PollHeader 
            avatar={avatar}
            name={name}
            timestamp={new Date()}
          />
          <Grid container spacing={5} className="poll-info">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  // className="poll-option-img" 
                  component="img"
                  image={ optionOneImage } 
                  alt={`${optionOneNew}`} 
                />
                <CardActions>
                  <FormControl fullWidth>
                    <InputLabel id="optionOneNew">Option One</InputLabel>
                    <NativeSelect 
                      inputProps={{
                        labelid:"optionOneNew",
                        name:"optionOneNew",
                        id:"optionOneNew",
                        // className="new-poll-option"
                      }}
                      onChange={handleChange}                      
                    >
                      {allOptions && 
                        allOptions.map((curOption) => (
                          <option 
                            key={curOption.text}
                            data-imgurl={curOption.bakeURL} 
                            value={curOption.text}
                          >
                            {curOption.text}
                          </option>
                        ))
                      }
                    </NativeSelect>
                  </FormControl>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia 
                  component="img"
                  image={ optionTwoImage } 
                  alt={`${optionTwoNew}`}                   
                />      
                <CardActions>   
                  <FormControl fullWidth>
                    <InputLabel id="optionTwoNew">Option Two</InputLabel>
                    <NativeSelect 
                      inputProps={{
                        labelid:"optionTwoNew",
                        name:"optionTwoNew",
                        id:"optionTwoNew",
                        // className="new-poll-option",
                      }}
                      onChange={handleChange}
                    >
                      {allOptions && 
                        allOptions.map((curOption) => (
                        <option 
                          key={curOption.text}
                          data-imgurl={curOption.bakeURL} 
                          value={curOption.text}
                        >
                          {curOption.text}
                        </option>
                        ))
                      }
                    </NativeSelect>
                  </FormControl>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ pt: 4 }}>
            <Button 
              variant="contained"
              type="submit" 
              disabled={(optionOneNew === "" || optionTwoNew === "")}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

const mapStateToProps = ({ dispatch, authedUser, users, bakers }) => {
  const user = users[authedUser];
  const name = user.name;
  const avatar = user.avatarURL;

  // modified based on function from the following source:
  // https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object
  function findAllByProp(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(obj)
        : (typeof value === 'object')
        ? acc.concat(findAllByProp(value, keyToFind))
        : acc
      , [])
  }

  const allOptions = findAllByProp(bakers,'bakeURL');

  return{
    dispatch,
    authedUser,
    name,
    avatar,
    allOptions,
  };
}

export default connect(mapStateToProps)(NewPoll);