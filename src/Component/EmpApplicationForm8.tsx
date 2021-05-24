import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Snackbar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { Container, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { styleClasses } from "../Common/styleClasses";
import AlertComponent from "./SubComponents/AlertComponent";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from "@material-ui/icons/Delete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  states,
  Addresses,
  reqBits,
  print,
  snackbarDuratuion,
  getMaxDate,
  getMaxAgeLimit,
  autoSubmit,
  resolveOverFlowYearIssue,
} from "../Common/CommonVariables";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { fileUploadApi } from "../services/fileUploadApi";

import { update } from "../services/updateApi";
import RadioQuestions from "./SubComponents/RadioQuestions";
import AddressesComponent from "./SubComponents/AddressesComponent";
import FileUploadComponent from "./SubComponents/FileUploadComponent";
import classNames from "classnames";
import ReactAutoComplete from "./SubComponents/ReactAutoComplete";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import ReactHookFormSelect from "./SubComponents/ReactHookFormSelect";
import { DynamicAddressComponent } from "./DynamicAddition/DynamicAddressComponent";
import { baseUrl } from "../shared/baseUrl";
import { deleteFile } from "../services/removeFileApi";
import PhoneNumberComponent from "./SubComponents/PhoneNumberComponent";
import CheckBoxComponent from "./SubComponents/CheckBoxComponent";



function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = { data?: any; handler?: any; setData: any };

export default function EmpApplicationForm8(props: Props) {
  let data = props.data;

  const RequireError: string = "Required *";
  const WrongPatternError: string = "Invalid Input";

  const [manualStates, setManualStates] = useState(data);
  const Forms = useForm({
    defaultValues: data,
    shouldFocusError: true,
  });
//console.log("data");
//console.log(data);
  const {
    register,
    handleSubmit,
    errors,
    control,
    setError,
    clearErrors,
    getValues
  } = Forms;


  const [succesOrErrorBit, setSuccesOrErrorBit] = useState("success");
  const [fileUploadSuccesOrErrorBit, setFileUploadSuccesOrErrorBit] = useState(
    "success"
  );
  const [successSnackOpen, setSuccessSnackOpen] = React.useState(false);
  const [hideAddressesComponent, setHideAddressesComponent] = useState(
    !(manualStates.lastThreeYearResidenceCheck === "Yes")
  );

  const classes = styleClasses.useStyles();

  const united_state_citizenErrorMessage =
    "You must be eligible to work in United States";
  const willingForDrugTestErrorMessage =
    "You must be willing to undertake a drug test as part of this hiring process";

    const [alienNumber,setAlienNumber] = useState(manualStates.alien_registration_number);
    const [saveOnlySuccessSnackOpen, setSaveOnlySuccessSnackOpen] = React.useState(false);
    const saveOnlyHandleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
  
      setSaveOnlySuccessSnackOpen(false);
      if (succesOrErrorBit === "success") {
        // props.handler();
      }
    };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackOpen(false);
  //console.log("CLOSE AUTO");
    if (succesOrErrorBit === "success") {
      props.handler[0]();
    //   props.handler();
    }
  };

  const handleFileUploadClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

  //console.log("CLOSE AUTO");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(manualStates.united_state_citizen);
  }, []);


  const saveData = async (data:any,saveOnly:boolean) => {
    data.user_name = manualStates.user_name;
    data.united_state_citizen = manualStates.united_state_citizen;
    data.non_united_state_citizen = manualStates.non_united_state_citizen;
    data.lawful_permanent_resident = manualStates.lawful_permanent_resident;
    data.alien_authorized = manualStates.alien_authorized;
    // console.log(data);
    // console.log(manualStates);
    let resdata;
    resdata = await update(data);
    if (resdata.data){
      try {
        // console.log(resdata);
        props.setData(resdata.data.data);
        setSuccesOrErrorBit("success");
        if(saveOnly){
          setSaveOnlySuccessSnackOpen(true);
        }else{
          setSuccessSnackOpen(true);
        }

      } catch (ex) {
        // console.log("Error Exaption Seerver Error");
        // console.log(resdata);
        // console.log(ex);
        setSuccesOrErrorBit("error");
        if(saveOnly){
          setSaveOnlySuccessSnackOpen(true);
        }else{
          setSuccessSnackOpen(true);
        }
      }
    }
  }

  const updateManualStates = (states:any)=>{
    setManualStates(states);
  }

  const saveUnFilledData = () => {
    const watchAll = getValues();
    saveData(watchAll,true);
  }

  const onSubmit = async (data: any) => {
  
  console.log("data form8 submit");
  console.log(data);
  saveData(data,false);

    // data.user_name = manualStates.user_name;
    // print("Sending :", data);
    // const resdata = await update(data);
    // if (resdata.data){
    //     try {
    //     print("Receiving :", data);
    //     props.setData(resdata.data.data);
    //     setSuccesOrErrorBit("success");
    //     setSuccessSnackOpen(true);
    //   } catch (ex) {
    //     console.log("Error Exaption Seerver Error");
    //     console.log(resdata);
    //     console.log(ex);
    //   setSuccesOrErrorBit("error");
    //     setSuccessSnackOpen(true);
    //   }
    // }
  };




  return (
    <React.Fragment>
      <Container style={{ backgroundColor: "#fafafa" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
            spacing={3}
          >
            <Grid item xs={12} sm={12} md={10} >
              <Paper elevation={3} className={classes.paper} >
                <h4 style={{textAlign:"center"}}>AWB Transport Inc., Employment Application</h4>
              </Paper>
            </Grid>

            {/* Questions Start */}
            {/* Questions and Awnsers Starting */}
            <Grid item xs={12} sm={12} md={10}>
              <Grid container alignItems="center" justify="space-evenly">
                  <Accordion elevation={3} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={10}>
                            <Typography className={classes.heading}>
                              Questions and Anwsers
                            </Typography>
                          </Grid>
                          <Grid item xs={1}></Grid>
                    </AccordionSummary>
                        <AccordionDetails>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={10}>
                                <Grid
                                  container
                                  direction="row"
                                  justify="space-around"
                                  alignItems="center"
                                  spacing={3}
                                >
                                
                                  <Grid item xs={12} sm={12} md={11}>
                                      <div style={{ paddingLeft: "13px", textAlign:"left"}}>
                                        <CheckBoxComponent
                                          controlProp={control}
                                          manualStatesProp={manualStates}
                                          idProp="united_state_citizen"
                                          reqBitProp={reqBits.united_state_citizen}
                                          setManualStateFunction={updateManualStates}
                                          question="Do you have citizenship of United States?"
                                        />
                                      </div>
                                      
                                  </Grid>


                                  <Grid item xs={12} sm={12} md={11}>
                                      <div style={{ paddingLeft: "13px", textAlign:"left" }}>
                                        <CheckBoxComponent
                                          controlProp={control}
                                          manualStatesProp={manualStates}
                                          idProp="non_united_state_citizen"
                                          reqBitProp={reqBits.non_united_state_citizen}
                                          setManualStateFunction={updateManualStates}
                                          question="Are you non United States citizen?"
                                        />
                                      </div>
                                  </Grid>


                                  <Grid item xs={12} sm={12} md={11}>
                                      <div style={{ paddingLeft: "13px" , textAlign:"left"}}>
                                        <CheckBoxComponent
                                          controlProp={control}
                                          manualStatesProp={manualStates}
                                          idProp="lawful_permanent_resident"
                                          reqBitProp={reqBits.lawful_permanent_resident}
                                          setManualStateFunction={updateManualStates}
                                          question="Are you Lawful Permanent Resident?"
                                        />
                                      </div>
                                  </Grid>


                                  <Grid item xs={12} sm={12} md={11}>
                                      <div style={{ paddingLeft: "13px", textAlign:"left" }}>
                                        <CheckBoxComponent
                                          controlProp={control}
                                          manualStatesProp={manualStates}
                                          idProp="alien_authorized"
                                          reqBitProp={reqBits.alien_authorized}
                                          setManualStateFunction={updateManualStates}
                                          question="Are you Alien authorized?"
                                        />
                                      </div>
                                  </Grid>


                                  <Grid item xs={12}  sm={12} md={5}>
                                      <InputMask
                                        mask="A-999-999-999"
                                        value={alienNumber}
                                        onChange={(e:any)=>{setAlienNumber(e.target.value)}}
                                        >
                                        {() => 
                                            <TextField
                                            name="alien_registration_number"
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                            label="Alien Registration Number"
                                            className="col-12"
                                            error={
                                              errors && errors.alien_registration_number === undefined ? false : true
                                            }
                                            helperText={errors && errors.alien_registration_number ? errors.alien_registration_number.message : RequireError}
                                            inputRef={register({
                                              required: {
                                                value: reqBits.alien_registration_number,
                                                message: RequireError,
                                              },
                                              minLength :{value:9,message:"Min 9 Digits"}
                                            })}
                                          ></TextField>
                                      }
                                      </InputMask>
                                  </Grid>


                                  <Grid item xs={12} sm={12} md={5}>
                                          <TextField
                                              name="expiration_date"
                                              variant="outlined"
                                              size="small"
                                              type="date"
                                              className="col-12"
                                              error={
                                                errors.expiration_date == undefined
                                                  ? false
                                                  : true
                                              }
                                              helperText={"Expiration Date " + RequireError}
                                              inputRef={register({
                                                required: reqBits.expiration_date,
                                              })}
                                              inputProps={{
                                                max: resolveOverFlowYearIssue(),
                                              }}
                                            ></TextField>
                                      </Grid>

                                      
                                  <Grid item xs={12}  sm={12} md={5}>
                                      <TextField
                                        name="formi94_reg_number"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        label="Form I-9 Registration Number"
                                        className="col-12"
                                        error={
                                          errors && errors.formi94_reg_number === undefined ? false : true
                                        }
                                        helperText={errors && errors.formi94_reg_number ? errors.formi94_reg_number.message : RequireError}
                                        inputRef={register({
                                          required: {
                                            value: reqBits.formi94_reg_number,
                                            message: RequireError,
                                          },
                                          // pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                        })}
                                      ></TextField>
                                  </Grid>


                                  <Grid item xs={12}  sm={12} md={5}>
                                      <TextField
                                        name="foreign_passport_number"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        label="Foreign Passport Number"
                                        className="col-12"
                                        error={
                                          errors && errors.foreign_passport_number === undefined ? false : true
                                        }
                                        helperText={errors && errors.foreign_passport_number ? errors.foreign_passport_number.message : RequireError}
                                        inputRef={register({
                                          required: {
                                            value: reqBits.foreign_passport_number,
                                            message: RequireError,
                                          },
                                          // pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                        })}
                                      ></TextField>
                                  </Grid>

                                  <Grid item xs={12}  sm={12} md={11}>
                                      <TextField
                                        name="issuance_country"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        label="Issuance Country"
                                        className="col-12"
                                        error={
                                          errors && errors.issuance_country === undefined ? false : true
                                        }
                                        helperText={errors && errors.issuance_country ? errors.issuance_country.message : RequireError}
                                        inputRef={register({
                                          required: {
                                            value: reqBits.issuance_country,
                                            message: RequireError,
                                          },
                                          // pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                        })}
                                      ></TextField>
                                  </Grid>




                                </Grid>
                          </Grid>
                          <Grid item xs={1}></Grid>
                       </AccordionDetails>
                  </Accordion>
              </Grid>
            </Grid>
            {/* Questions and Awnsers Ending */}
            {/* Questions End */}

            {/* BUTTON Start */}
            <Grid item xs={12} sm={12} md={11}>
              <Grid container justify="space-evenly" alignContent="center">
                  {/* BUTTON Start */}
                  <Grid item xs={8} sm={7} md={4}>
                    <Button
                      type="button"
                      className="col-8 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        saveUnFilledData();
                        props.handler[1]();
                      }}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={8} sm={7} md={4}>
                    <Button
                      onClick={()=>{saveUnFilledData();}}
                      className="col-8 mt-3"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={8} sm={7} md={4}>
                    <Button
                      type="submit"
                      className="col-8 mt-3"
                      variant="contained"
                      color="primary"
                    >
                      Submit All
                    </Button>
                  </Grid>
                  {/* BUTTON End */}
              </Grid>
            </Grid>
            {/* BUTTON End */}

          </Grid>
        </form>
        <AlertComponent
          duration={snackbarDuratuion}
          open={saveOnlySuccessSnackOpen}
          message={
            succesOrErrorBit === "success"
            ? "Data Saved Successfully"
            : "Server Error"
          }
          onClose={saveOnlyHandleClose}
          severity={succesOrErrorBit}
          ></AlertComponent>
        <Snackbar
          open={successSnackOpen}
          autoHideDuration={snackbarDuratuion}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={succesOrErrorBit as "success"}>
            {succesOrErrorBit === "success" && "All Data Saved Successfully"}
            {succesOrErrorBit === "error" && "Server Error"}
          </Alert>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
}
