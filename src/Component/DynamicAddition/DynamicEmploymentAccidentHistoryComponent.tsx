import React, { useEffect } from "react";
import {
  Address,
  driving,
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
 let dummyAddaccidendData = {
  dateOfAccident:"",
  recordableAccident:"",
  preventableAccident:"",
  accidentAccur:"",
  stateOfLicence:"",
  injuredPeople:"",
  fatalittiesInAccident:"",
  preventableAccidents:"",
  drivingInTheAccident:"",
  accidentDescribe:"",
  anyComments:"",
};


export function DynamicEmploymentAccidentHistoryComponent(props: Props) {
  const classes = styleClasses.useStyles();
  const { register, control, handleSubmit, reset, trigger, setError, errors } =
    props.useForm;
  const { fields, append, prepend, remove, swap, move, insert} = useFieldArray(
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
          <Accordion defaultExpanded elevation={3} style={{paddingBottom:20}} key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading} style={{marginLeft: 33}}>
                Adding Accidents # {index + 1}
              </Typography>
            </AccordionSummary>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={3}
            >
              <Grid item md={5}>
                <TextField
                  variant="outlined"
                  style={{marginLeft: 42}}
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
                  className="col-10"
                ></TextField>
              </Grid>
              {/* <Grid item md={5} style={{ padding: "10px 10px" }}>
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
              </Grid> */}
              <Grid item md={10}>
                <Grid item md={5} style={{marginLeft: 40}}>
                  <Typography className="def">
                    Was the accident DOT recordable?
                  </Typography>
                </Grid>
                <Grid item md={5} style={{marginLeft: 50}}>
                  <RadioGroup  row id="recordableAccident" >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio/>}
                      label="Yes"
                    ></FormControlLabel>
                    <FormControlLabel
                      value="No"
                      control={<Radio/>}
                      label="No"
                    ></FormControlLabel>
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid item md={10}style={{margin:0,padding:0}}>
                <Grid item md={5}style={{marginLeft:29}}>
                  <Typography className="abc">
                    Was the accident preventable?
                  </Typography>
                </Grid>
                <Grid item md={5}style={{marginLeft: 70}}>
                  <RadioGroup row aria-label="" name="row-radio-buttons-group" id="preventableAccident">
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    ></FormControlLabel>
                    <FormControlLabel
                      value="No"
                      control={<Radio/>}
                      label="No"
                    ></FormControlLabel>
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container style={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={4} style={{marginLeft: 30}}>
                  <Typography>
                    In What city and state did the accident accur?
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                <TextField  name={`${"employmentAccidentsHistory"}[${index}].accidentAccur`}
                
                    size="small"
                    multiline
                    rows={1}
                    variant="outlined"
                    className="col-11"
                  />
                </Grid>
                <Grid item xs={3}style={{width:8}}>
                  <ReactHookFormSelect
                    nameVal={`${props.idPrefix}[${index}].stateOfLicence`}
                     label="State"
                    control={control}
                    forms={props.useForm}
                    defaultValue={item.stateOfLicence}
                    variant="outlined"
                    size="small"
                    className="col-12"
                    isReq={reqBits.stateOfLicence}
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].stateOfLicence
                    }
                    isPartOfDynamicComponent={true}
                    parentId={props.idPrefix}
                    childSubId="stateOfLicence"
                    parentIndex={index}
                  >
                    <option aria-label="None" value="" />
                    {states.map(function (object: any, i: number) {
                      return (
                        <option value={object.value} key={i}>
                          {object.value}
                        </option>
                      );
                    })}
                  </ReactHookFormSelect>
                </Grid>
              </Grid>
              <Grid container style={{ display: "flex", flexDirection: "row" }}>
                <Grid item md={5} style={{marginLeft: 25}}>
                  <Typography>
                    How many people were injured in the accident?
                  </Typography>
                </Grid>
                <Grid item md={3} style={{marginBottom: 10}}>
                <TextField  name={`${"employmentAccidentsHistory"}[${index}].injuredPeople`}
                  id="outlined-number"
                  type="number"
                  rows={1}
                  variant="outlined"
                  style={{width: 80}}
                  size="small"
                  // InputLabelProps={{
                  // shrink: true,
                  // }}
                  InputProps={{
                      inputProps: { 
                           min: 0 
                      }
                  }}
                  />
                </Grid>{" "}
              </Grid>
              <Grid container style={{ display: "flex", flexDirection: "row" }}>
                <Grid item md={5} style={{marginLeft: 25}}>
                  <Typography>
                    How many fatalitties were there in the accident?
                  </Typography>
                </Grid>
                <Grid item md={3}>
                <TextField  name={`${"employmentAccidentsHistory"}[${index}].fatalittiesInAccident`}
                  id="outlined-number"
                  type="number"
                  rows={1}
                  variant="outlined"
                  style={{width: 80}}
                  size="small" 
                  // InputLabelProps={{
                  // shrink: true,
                  // }}
                  InputProps={{
                    inputProps: { 
                         min: 0 
                    }
                }}
                  />
                </Grid>
              </Grid>
              <Grid item md={10}>
                <Grid item md={5} style={{marginLeft: 19}}>
                  <Typography className="abc">
                    {" "}
                    Was the accident preventable?{" "}
                  </Typography>
                </Grid>
                <Grid item md={5} style={{marginLeft: 60}}>
                  <RadioGroup row aria-label="" name="row-radio-buttons-group" id="preventableAccidents">
                    <FormControlLabel
                      value="Yes"
                      control={<Radio/>}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio/>}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ display: "flex", flexDirection: "row" }}
                spacing={2}
              >
                <Grid item md={6} style={{marginLeft: 30 }}>
                  <Typography>
                    What was the employee/independent contractor driving in the
                    accident?
                  </Typography>
                </Grid>
                <Grid item xs={3}style={{width:10}}>
                  <ReactHookFormSelect
                    nameVal={`${props.idPrefix}[${index}].drivingInTheAccident`}
                     label=""
                    control={control}
                    forms={props.useForm}
                    defaultValue={item.stateOfLicence}
                    variant="outlined"
                    size="small"
                    className="col-12"
                    isReq={false}
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].stateOfLicence
                    }
                    isPartOfDynamicComponent={true}
                    parentId={props.idPrefix}
                    childSubId="stateOfLicence"
                    parentIndex={index}
                  >
                    <option aria-label="None" value="" />

                    {driving.map(function (object: any, i: number) {
                      return (
                        <option value={object.value} key={i}>
                          {object.value}
                        </option>
                      );
                    })}
                  </ReactHookFormSelect>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={4} style={{marginLeft: 0}}>
                  <Typography>Describe the accident*</Typography>
                </Grid>
                <Grid item md={6}style={{marginBottom: 10}}>
                  <TextField  name={`${"employmentAccidentsHistory"}[${index}].accidentDescribe`}
                    size="small"
                    multiline
                    rows={3}
                    variant="outlined"
                    className="col-10"
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={4} style={{marginLeft: 0}}>
                  <Typography>Any other comments?</Typography>
                </Grid>
                <Grid item md={6}>
                  <TextField  name={`${"employmentAccidentsHistory"}[${index}].anyComments`}
                    size="small"
                    multiline
                    rows={3}
                    variant="outlined"
                    className="col-10"
                  />
                </Grid>
              </Grid>
              <Grid item  xs={12} style={{ padding: "20px 10px" }}>
                <Button
                  size="small"
                  className="col-3"
                  variant="contained"
                  color="default"
                  onClick={(e) => {
                    // if(fields.length > props.minElementLimit) 
                    // {
                      remove(index);
                    // }
                  }}
                >
                  Delete Entry
                </Button>
              </Grid>
            </Grid>
          </Accordion>
        ))}
         <Accordion defaultExpanded elevation={12} style={{paddingBottom:20}}>
        
          <Grid item xs={12}>
           <Grid style={{ width: '100%'}} > 
         <Grid>
          This is an info alert — check it out!
        </Grid>
          </Grid> 
    
        </Grid></Accordion>
        
        
          <Grid item xs={12} style={{ padding: "20px 10px" }}>
          <Button
            size="small"
            className="col-3"
            variant="contained"
            color="primary"
            onClick={() => {
              append(dummyAddaccidendData);
            }}
          >
            Add More
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
