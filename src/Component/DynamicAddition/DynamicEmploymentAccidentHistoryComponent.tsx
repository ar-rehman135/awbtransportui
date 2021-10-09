import React, { useEffect } from "react";
import {
  Address,
  EmploymentAccidentHistories,
  resolveOverFlowYearIssue,
} from "../../Common/CommonVariables";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionActions from "@material-ui/core/AccordionActions";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { styleClasses } from "../../Common/styleClasses";
import {
  Addresses,
  Form1,
  reqBits,
  states,
  AddressErrorsList,
} from "../../Common/CommonVariables";
import { update } from "../../services/updateApi";
import RadioQuestions from "../SubComponents/RadioQuestions";
import ReactHookFormSelect from "../SubComponents/ReactHookFormSelect";

type Props = {
  idPrefix: string;
  employmentAccidentHistoryList: EmploymentAccidentHistories;
  useForm: any;
  setEmploymentAccidentHistoryList: any;
};

const RequireError: string = "Required *";
const WrongPatternError: string = "Wrong Pattern";

let addr = {
  lastYearAddress: "",
  lastYearAddressCity: "",
  lastYearAddressState: "",
  lastYearAddressZipCode: "",
  lastYearAddressfrom: "1990-01-01",
  lastYearAddressTo: "1990-01-01",
};

export function DynamicEmploymentAccidentHistoryComponent(props: Props) {
  const classes = styleClasses.useStyles();
  const { register, control, handleSubmit, reset, trigger, setError, errors } =
    props.useForm;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: props.idPrefix,
    }
  );

  useEffect(() => {
    if (fields.length === 0) {
      append(props.employmentAccidentHistoryList);
    }
  }, []);

  const submit = (e: any) => {
    e.preventDefault();
    //console.log(e.target.data);
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {fields.map((item, index) => (
          <Accordion defaultExpanded elevation={3} key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Adding Accidents # {index + 1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12}>
                  
                  <TextField
                    variant="outlined"
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].dateOfAccident
                    }
                    inputRef={register({
                      required: {
                        value: reqBits.dateOfAccident,
                        message: RequireError,
                      },
                    })}
                    inputProps={{
                      max: resolveOverFlowYearIssue(),
                    }}
                    name={`${props.idPrefix}[${index}].dateOfAccident`}
                    defaultValue={item.dateOfAccident}
                    helperText={
                      reqBits.dateOfAccident && RequireError + "Accident Date*"
                    }
                    type="date"
                    size="small"
                    className="col-12"
                  ></TextField>
                  </Grid>
                <Grid item xs={6} style={{ padding: "10px 10px" }}>
                  <Button
                    size="small"
                    className="col-8"
                    variant="contained"
                    onClick={() => {
                      //if (index > 0) {
                      remove(index);
                      //}
                    }}
                  >
                    Add Accident
                  </Button>
                </Grid>
                

                <Grid item xs={12}>
                <Grid item xs={6}>
                    <Typography>Was the accident DOT recordable?</Typography></Grid>
                    <Grid item xs={6}>
                    <RadioGroup
                      row
                      aria-label=""
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                    </Grid>
                    </Grid>

                    <Grid item xs={12}>
                    <Grid item xs={6}></Grid>
                    <Typography className="abc"> Was the accident preventable? </Typography></Grid>
                    <Grid item xs={6}>
                    <RadioGroup
                      row
                      aria-label=""
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  
                  </Grid>
                  

                  <Grid item xs={12}>
                    <Grid item xs={6}>
                  <Typography>
                    In What city and state did the accident accur?
                  </Typography></Grid>
                  <Grid item xs={6}>
                  
                  <TextField
                   required
                   id="outlined-required"
                   label="Required"
                   defaultValue=""
                  />
                  </Grid>
                  </Grid>
                  <Grid item xs={12}>
                  <Grid item xs={6}>
                  <Typography> Did the accident involve a hazardous material </Typography> </Grid>
                    <FormControl>
                    <Grid item xs={6}
                    <RadioGroup
                      row=""
                      aria-label=""
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup></FormControl>
                     </Grid>
                    </Grid>
                   <Grid item xs={12}>
                   <Grid item xs={6}>
                  <Typography>Describe the accident*</Typography></Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="outlined-multiline-static"
                    defaultValue={item.LocationOfAccidents}
                    label="Location of Accident"
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].LocationOfAccidents
                    }
                    inputRef={register({
                      required: {
                        value: reqBits.LocationOfAccidents,
                        message: RequireError,
                      },
                    })}
                    helperText={reqBits.LocationOfAccidents && RequireError}
                    name={`${props.idPrefix}[${index}].LocationOfAccidents`}
                    size="small"
                    multiline
                    rows={6}
                    variant="outlined"
                    className="col-12"
                  />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid item xs={6}>
                  <Typography>Any other comments?</Typography></Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="outlined-multiline-static"
                    defaultValue={item.LocationOfAccidents}
                    label="Location of Accident"
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].LocationOfAccidents
                    }
                    inputRef={register({
                      required: {
                        value: reqBits.LocationOfAccidents,
                        message: RequireError,
                      },
                    })}
                    helperText={reqBits.LocationOfAccidents && RequireError}
                    name={`${props.idPrefix}[${index}].LocationOfAccidents`}
                    size="small"
                    multiline
                    rows={6}
                    variant="outlined"
                    className="col-12"
                  />
                  </Grid>
                </Grid>

             </AccordionDetails>
    </Grid>
      </Grid>
    </React.Fragment>
  );
}
