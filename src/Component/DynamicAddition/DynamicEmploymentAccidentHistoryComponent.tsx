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

type Props = {
  idPrefix: string;
  employmentAccidentHistoryList: EmploymentAccidentHistories;
  useForm: any;
  setEmploymentAccidentHistoryList: any;
  noAccident: boolean;
  
};
const RequireError: string = "Required *";
const WrongPatternError: string = "Wrong Pattern";

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
        {props.noAccident === false 
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
                    <Grid
                      item  
                      >
                         <RadioQuestions
                         id={`${props.idPrefix}[${index}].recordableAccident`}
                         optionList={["Yes", "No"]}
                         optionValue={["Yes", "No"]}
                         useForm={props.useForm}
                         question="Was the accident DOT recordable?"
                         defaultSelected={props.employmentAccidentHistoryList[index]?.recordableAccident}
                         isReq={reqBits.recordableAccident}
                         isPartOfDynamicComponent={true}
                         parentId={props.idPrefix}
                         justifyContent="space-between"
                         childSubId={"recordableAccident"}
                         parentIndex={index}
                        ></RadioQuestions>
                    </Grid>
                    <Grid
                       item  
                        >  
                         <RadioQuestions
                         id={`${props.idPrefix}[${index}].preventableAccident`}
                         optionList={["Yes", "No"]}
                         optionValue={["Yes", "No"]}
                         useForm={props.useForm}
                         question= "Was the accident preventable?"
                         defaultSelected={props.employmentAccidentHistoryList[index]?.preventableAccident}
                         isReq={reqBits.preventableAccident}
                         isPartOfDynamicComponent={true}
                         parentId={props.idPrefix}
                         justifyContent="space-between"
                         childSubId={"preventableAccident"}
                         parentIndex={index}   
                        ></RadioQuestions>
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
                    <Grid  style={{ display: "flex", flexDirection: "row", paddingLeft:  272}}>
                    <Grid item md={12} xs={12} sm={12} xl={12}>
                      <TextField
                      error={  
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].accidentAccurCity
                       }
                      inputRef={register({
                      required: {
                      value: reqBits.accidentAccurCity,
                      message: RequireError,
                      },
                      })}
                     inputProps={{
                     max: resolveOverFlowYearIssue(),
                      }}
                        name={`${props.idPrefix}[${index}].accidentAccurCity`}
                        defaultValue={item.accidentAccurCity}
                        size="small"
                        multiline
                        rows={1}
                        variant="outlined"
                        className="col-11"
                        label="City"
                      />
                    </Grid>
                    <Grid item md={12} xs={12} sm={12} xl={12}>
                      <ReactHookFormSelect
                        nameVal={`${props.idPrefix}[${index}].accidentAccurState`}
                        label="State"
                        control={control}
                        forms={props.useForm}
                        defaultValue={item.accidentAccurState}
                        variant="outlined"
                        size="small"
                        className="col-12"
                        isReq={reqBits.accidentAccurState}
                        error={
                          errors &&
                          errors[props.idPrefix] &&
                          errors[props.idPrefix][index] &&
                          errors[props.idPrefix][index].accidentAccurState
                        }
                        isPartOfDynamicComponent={true}
                        parentId={props.idPrefix}
                        childSubId="accidentAccurState"
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
                      error={  
                        errors &&
                        errors[props.idPrefix] &&
                        errors[props.idPrefix][index] &&
                        errors[props.idPrefix][index].injuredPeople
                         }
                        inputRef={register({
                        required: {
                        value: reqBits.injuredPeople,
                        message: RequireError,
                        },
                        })}
                       inputProps={{
                       max: resolveOverFlowYearIssue(),
                        }}
                          name={`${props.idPrefix}[${index}].injuredPeople`}
                          defaultValue={item.injuredPeople}
                        id="outlined-number"
                        type="number"
                        className="col-12"
                        rows={1}
                        variant="outlined"
                        style={{paddingTop: 15, paddingLeft: 170}}
                        size="small"                
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
                       error={  
                        errors &&
                        errors[props.idPrefix] &&
                        errors[props.idPrefix][index] &&
                        errors[props.idPrefix][index].fatalittiesInAccident
                         }
                        inputRef={register({
                        required: {
                        value: reqBits.fatalittiesInAccident,
                        message: RequireError,
                        },
                        })}
                       inputProps={{
                       max: resolveOverFlowYearIssue(),
                        }}
                          name={`${props.idPrefix}[${index}].fatalittiesInAccident`}
                          defaultValue={item.fatalittiesInAccident}
                        id="outlined-number"
                        type="number"
                        className="col-12"
                        rows={1}
                        variant="outlined"
                        style={{paddingLeft: 165, paddingTop: 10}}
                        size="small"
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item  
                  >
                      <RadioQuestions
                       id={`${props.idPrefix}[${index}].hazardousMaterial`}
                       optionList={["Yes", "No"]}
                       optionValue={["Yes", "No"]}
                       useForm={props.useForm}
                       question= "Did the accident involve a hazardous material?"
                       defaultSelected={props.employmentAccidentHistoryList[index]?.hazardousMaterial}
                       isReq={reqBits.hazardousMaterial}
                       isPartOfDynamicComponent={true}
                       parentId={props.idPrefix}
                       justifyContent="space-between"
                       childSubId={" hazardousMaterial"}
                       parentIndex={index}
                      ></RadioQuestions>
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
                        nameVal={`${props.idPrefix}[${index}].employeeIndependent`}
                        label=""
                        control={control}
                        forms={props.useForm}
                        defaultValue={item.employeeIndependent}
                        variant="outlined"
                        size="small"
                        className="col-12"
                         isReq={true}
                        error={
                          errors &&
                          errors[props.idPrefix] &&
                          errors[props.idPrefix][index] &&
                          errors[props.idPrefix][index].employeeIndependent
                        }
                        isPartOfDynamicComponent={true}
                        parentId={props.idPrefix}
                        childSubId="employeeIndependent"
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
                      error={  
                        errors &&
                        errors[props.idPrefix] &&
                        errors[props.idPrefix][index] &&
                        errors[props.idPrefix][index].accidentDescribe
                        }
                        inputRef={register({
                        required: {
                        value: reqBits.accidentDescribe,
                        message: RequireError,
                        },
                        })}
                      inputProps={{
                      max: resolveOverFlowYearIssue(),
                        }}
                        name={`${props.idPrefix}[${index}].accidentDescribe`}
                        defaultValue={item.accidentDescribe}
                        label="Describe the accident*"
                        size="small"
                        multiline
                        rows={4}
                        variant="outlined"
                        className="col-12"
                        style={{paddingLeft: 3, paddingRight: 10}}
                      />  
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={12}  xs={12} sm={12} xl={12} >
                      <TextField
                      name={`${props.idPrefix}[${index}].anyComments`}
                      defaultValue={item.anyComments}
                       error={  
                        errors &&
                        errors[props.idPrefix] &&
                        errors[props.idPrefix][index] &&
                        errors[props.idPrefix][index].anyComments
                         }
                        inputRef={register({
                        required: {
                        value: reqBits.anyComments,
                        message: RequireError,
                        },
                        })}
                       inputProps={{
                       max: resolveOverFlowYearIssue(),
                        }}
                        label="Any other comments?"
                        size="small"
                        multiline
                        rows={4}
                        variant="outlined"
                        className="col-12"
                        style={{paddingLeft: 4, paddingRight:10}}
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
                        remove(index);
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
