import React, { useEffect } from "react";
import InfoIcon from "@material-ui/icons/Info";

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
  SvgIcon,
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
import { yellow } from "@material-ui/core/colors";
import { 
blue800,

} from "material-ui/styles/colors";
import { error } from "console";

type Props = {
  idPrefix: string;
  employmentAccidentHistoryList: EmploymentAccidentHistories;
  useForm: any;
  setEmploymentAccidentHistoryList: any;
  accidentHistoryFlag: boolean;
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
  dateOfAccident: "",
  recordableAccident: "",
  preventableAccident: "",
  accidentAccur: "",
  stateOfLicence: "",
  injuredPeople: "",
  fatalittiesInAccident: "",
  preventableAccidents: "",
  drivingInTheAccident: "",
  accidentDescribe: "",
  anyComments: "",
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
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >

        {props.accidentHistoryFlag === false 
        ? (<>
            {fields.map((item, index) => (
              <Accordion
                defaultExpanded
                elevation={3}
                style={{ paddingBottom: 20 }}
                key={item.id}
              >
                <AccordionSummary
                  style={{ paddingInline: 17}}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Adding Accidents #{index + 1}
                  </Typography>
                </AccordionSummary>
                <Grid
                  container
                  style={{ paddingInline: 17 }}
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item md={5}>
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
                  <Grid container>
                    <Grid
                      item
                      style={{ paddingLeft: 10}} 
                    >
                      <Typography className="def">
                        Was the accident DOT recordable?
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{ paddingRight: 362, paddingTop: 5, paddingLeft: 15}}
                    >
                        <RadioGroup row id="recordableAccident">
                          <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                          ></FormControlLabel>
                            <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                          ></FormControlLabel>
                        </RadioGroup> 
                    </Grid>
                  </Grid>
                  <Grid container  style={{ display: "flex", flexDirection: "row" , paddingRight:20}}>
                    <Grid
                      item 
                      style={{ paddingLeft: 10}}
                    >
                      <Typography className="abc">
                        Was the accident preventable?
                      </Typography>
                    </Grid>
                    <Grid
                      item  
                      style={{ paddingRight: 362, paddingTop:5, paddingLeft: 15}}
                    >
                      <RadioGroup
                        row
                        aria-label=""
                        name="row-radio-buttons-group"
                        id="preventableAccident"
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        ></FormControlLabel>
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        ></FormControlLabel>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <Grid container style={{ display: "flex", flexDirection: "row"}}> 
                    <Grid
                      item
                        style={{paddingLeft: 10}}
                    >
                      <Typography>
                        In What city and state did the accident accur?
                      </Typography>
                    </Grid>
                  
                    <Grid  style={{ display: "flex", flexDirection: "row", paddingLeft:  282}}>
                    <Grid item md={12} xs={12} sm={12} xl={12}>
                      <TextField
                        name={`${"employmentAccidentsHistory"}[${index}].accidentAccur`}
                        size="small"
                        multiline
                        rows={1}
                        variant="outlined"
                        className="col-11"
                      />
                    </Grid>
                    <Grid item md={12} xs={12} sm={12} xl={12}>
                      <ReactHookFormSelect
                        nameVal={`${props.idPrefix}[${index}].stateOfLicence`}
                        label="State"
                        control={control}
                        forms={props.useForm}
                        defaultValue={item.stateOfLicence}
                        variant="outlined"
                        size="small"
                        className="col-11"
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
                    </Grid>
                  <Grid container style={{ display: "flex", flexDirection: "row" }}>
                    <Grid
                      item
                        style={{paddingLeft: 10, paddingTop: 10}}
                    >
                      <Typography>
                        How many people were injured in the accident?
                      </Typography>
                    </Grid>
                    <Grid  style={{  }}>
                      <TextField
                        name={`${"employmentAccidentsHistory"}[${index}].injuredPeople`}
                        id="outlined-number"
                        type="number"
                        rows={1}
                        variant="outlined"
                        style={{paddingTop: 15, paddingLeft: 170}}
                        size="small"
                        // InputLabelProps={{
                        // shrink: true,
                        // }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid container style={{ display: "flex", flexDirection: "row" }}>
                    <Grid
                      item
                        style={{paddingLeft: 10}}
                    >
                      <Typography>
                        How many fatalitties were there in the accident?
                      </Typography>
                    </Grid>
                    <Grid>
                      <TextField
                        name={`${"employmentAccidentsHistory"}[${index}].fatalittiesInAccident`}
                        id="outlined-number"
                        type="number"
                        rows={1}
                        variant="outlined"
                        style={{paddingLeft: 165, paddingTop: 10}}
                        size="small"
                        // InputLabelProps={{
                        // shrink: true,
                        // }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container >
                    <Grid
                      item
                      style={{paddingLeft: 10}}
                    >
                      <Typography className="lmn">
                        Did the accident involve a hazardous material?
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{ paddingRight: 362, paddingTop: 5, paddingLeft: 15}}
                    >
                      <RadioGroup
                        row
                        aria-label=""
                        name="row-radio-buttons-group"
                        id="preventableAccidents"
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        ></FormControlLabel>
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        ></FormControlLabel>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                  >
                    <Grid
                      item 
                        style={{paddingLeft: 10}}
                    >
                      <Typography>
                        What was the employee/independent contractor driving in the
                        accident?
                      </Typography>
                    </Grid>
                    <Grid  style={{paddingLeft: 96, paddingTop: 1, paddingBottom: 10}}>
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
                    <Grid item md={12} xs={12} sm={12} xl={12}  style={{ paddingBottom: 10 }}>
                      <TextField
                        name={`${"employmentAccidentsHistory"}[${index}].accidentDescribe`}
                        label="Describe the accident*"
                        size="small"
                        multiline
                        rows={4}
                        variant="outlined"
                        className="col-12"
                        style={{paddingLeft: 10, paddingRight: 10}}
                      />  
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={12}  xs={12} sm={12} xl={12} >
                      <TextField
                        name={`${"employmentAccidentsHistory"}[${index}].anyComments`}
                        label="Any other comments?"
                        size="small"
                        multiline
                        rows={4}
                        variant="outlined"
                        className="col-12"
                        style={{paddingLeft: 10, paddingRight: 10}}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12} xl={12}>
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
            <Grid item md={12} xs={12} sm={12} xl={12} style={{ padding: "20px 10px" }}>
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
        </>) 
        
        : (<>
            <Grid container>
              <Grid item md={12} xs={12} sm={12} xl={12}>
                <Grid style={{ width: "100%" }}>
                  <Paper elevation={1} style={{ paddingLeft: 10, textAlign: "left" }}>
                    <Typography>
                      <InfoIcon style={{ color: blue800 }} />
                      You have indicated this individual has no accidents.
                    </Typography>
                    <Typography style={{paddingLeft: 20}}>
                      Any previously entered accidents will be ignored. You will not
                      be able to enter any new accidents until you un-check the "No Accidents"
                    box above.
                    </Typography>
                  </Paper>
                </Grid>
                </Grid>
              </Grid>
        </>)}
      </Grid>
    </React.Fragment>
  );
}
