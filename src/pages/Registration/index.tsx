import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { IRegisterReq } from "../../utils/interfaces";

const Registration: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [language, setLanguage] = useState<string>("English");

  const handleClick = () => {
    const req: IRegisterReq = {
      name,
      language,
      gender,
    };
    history.push({
      pathname: "/quiz",
      state: req,
    });
  };

  return (
    <div className="registration-page">
      <Container component="main" maxWidth="sm">
        <h2>Registration Form</h2>
        <FormControl fullWidth>
          <TextField
            required
            id="outlined-required"
            label="Name"
            inputProps={{ "data-testid": "nameField" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value={"Male"}
              control={<Radio />}
              label={"Male"}
            />
            <FormControlLabel
              value={"Female"}
              control={<Radio />}
              label={"Female"}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value={"English"}>{"English"}</MenuItem>
            <MenuItem value={"Hindi"}>{"Hindi"}</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ mt: 3 }}
          data-testid="submitForm"
          disabled={!name || !gender || !language}
        >
          Register
        </Button>
      </Container>
    </div>
  );
};

export default Registration;
