import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import ChipInput from 'material-ui-chip-input'
import {
  dummyAddrData,
  debug,
  startTimeVal,
  states,
  WrongPatternError,
  RequireError,
  EmploymentHistories,
  employmentHistoryDummyElement,
  drivingExperienceDummyElement,
  tDrivingExperiences,
  employmentAccidentHistoryDummyElement,
  EmploymentAccidentHistories,
  trafficConvictionDummyElement,
  tTrafficConvictions,
  tTrafficConvictionInfo,
  tDriverLicenses,
  driverLicenseDummyElement,
  tDriverLicenseInfo,
  reqBits,
  snackbarDuratuion,
  canvasMinWidth,
  autoSubmit,
  formatZipCode,
  resolveOverFlowYearIssue,
} from "../Common/CommonVariables";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Addresses, tReferences, getMaxDate, getMaxAgeLimit } from "../Common/CommonVariables";
import RadioQuestions from "./SubComponents/RadioQuestions";
import ChipsArray from "./SubComponents/ChipListComponent";
import AddressesComponent from "./SubComponents/AddressesComponent";
import EmploymentHistory from "./SubComponents/EmploymentHistory";
import ErrorBoundary from "./ErrorBoundary";
import EmploymentAccidentHistory from "./SubComponents/EmploymentAccidentHistory";
import TrafficConvictions from "./SubComponents/TrafficConvictions";
import DriverLicense from "./SubComponents/DriverLicense";
import ReactHookFormSelect from "./SubComponents/ReactHookFormSelect";
import ReactUseFormTextField from "./SubComponents/ReactUseFormTextField";
import { DynamicAddressComponent } from "./DynamicAddition/DynamicAddressComponent";
import { DynamicEmploymentHistoryComponent } from "./DynamicAddition/DynamicEmploymentHistoryComponent";
import { DynamicDrivingExperienceComponent } from "./DynamicAddition/DynamicDrivingExperienceComponent";
import { DynamicEmploymentAccidentHistoryComponent } from "./DynamicAddition/DynamicEmploymentAccidentHistoryComponent";
import { DynamicTrafficConvictions } from "./DynamicAddition/DynamicTrafficConvictions";
import { DynamicDriverLicense } from "./DynamicAddition/DynamicDriverLicense";
import { update } from "../services/updateApi";
import { PinDropRounded } from "@material-ui/icons";
import { DynamicReferences } from "./DynamicAddition/DynamicReferences";
import { useRef, useState } from "react";
import ReactAutoComplete from "./SubComponents/ReactAutoComplete";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import AlertComponent from "./SubComponents/AlertComponent";
import PhoneNumberComponent from "./SubComponents/PhoneNumberComponent";
import useWindowDimensionHook from "./MyHook/WindowDimension";
import { isConstructorDeclaration } from "typescript";
import FixedTags from "./SubComponents/ChipListComponent";


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    default: {},
    paper: {
      color: "#000000",
      padding: "5px 10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(19),
      fontWeight: theme.typography.fontWeightRegular,
      color: "#000000",
    },
    smallHeading: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightRegular,
      color: "#000000",
      textJustify: "inter-word",
    },
    text: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightRegular,
      color: "#000000",
      textJustify: "inter-word",
    },
    caption: {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightRegular,
      color: "#000000",
      textAlign: "left",
    },
    paperProminantStyle: {
      margin: "5px 0px",
      elevation: 3,
      padding: "20px 0px",
    },
    input: {
      display: "none",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    questionTextStyle: {
      textAlign: "left",
    },
  })
);

let UpdateAddressesList: Addresses;
let UdpatedEmploymentHistoryList: EmploymentHistories;
let UpdateDrivingExperienceList: tDrivingExperiences;
let EmploymentAccidentHistoryList: EmploymentAccidentHistories;
let TrafficConvictionsList: tTrafficConvictions;
let DriverLicenseList: tDriverLicenses;
let ReferencesList: tReferences;

type Props = { data?: any; handler?: any; setData: any };
let base64SignatureImage = "";

function EmpApplicationForm3(props: Props) {
  // //console.log("props.data ", props.data);
  const [signatureError, setSignatureError] = useState("");
  const [signatureHelperTextError, setSignatureHelperTextError] = useState(
    false
    );
    const Forms = useForm({ defaultValues: props.data, shouldFocusError:true, criteriaMode:"all" });
    const { register, handleSubmit, errors, control,
      getValues } = Forms;
      
  const [licenseQuestionBits, setLicenseQuestionBits] = useState({
    deniedLicences: props.data.deniedLicences === "Yes",
    permitLicences: props.data.permitLicences === "Yes",
    reasonforUnableToPerformActions:
    props.data.reasonforUnableToPerformActions === "Yes",
    convictedofafelony: props.data.convictedofafelony === "Yes",
  });
  
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

  let sigPad = useRef<any>();

  const callbackOnWindowResize = () => {
  //console.log(width);   
    setSigWidth(width);   
  }

  const {width} = useWindowDimensionHook(callbackOnWindowResize);

  const [sigWidth,setSigWidth] = useState(width);
  const [listOfStates,setListOfStates] = useState<string>(props.data.lastFiveYearStatesOperate);

  useEffect(() => {
    base64SignatureImage = props.data.signature;
    window.scrollTo(0, 0);
    if (base64SignatureImage !== undefined && base64SignatureImage !== "") {
      sigPad.current?.clear();
      sigPad.current.fromDataURL(base64SignatureImage);
    }
    window.scrollTo(0, 0);
    // setListOfStates(props.data.lastFiveYearStatesOperate.split(','));
  }, []);

  useEffect(() => {
    if (base64SignatureImage !== undefined && base64SignatureImage !== "") {
      sigPad.current?.clear();
      sigPad.current.fromDataURL(base64SignatureImage);
    }
  }, [sigWidth]);

  const clearSigPad = () => {
    if (sigPad && sigPad.current) {
      sigPad.current?.clear();
      base64SignatureImage = "";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if(props.data.signature !== undefined){
      sigPad.current.fromDataURL(props.data.signature);
    }
            if(autoSubmit){
    let watchAll = getValues();
      onSubmit(watchAll );
    }
  }, []);

  const saveImage = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      setSignatureError("");
      setSignatureHelperTextError(false);

      base64SignatureImage = sigPad.current
        ?.getCanvas()
        .toDataURL("image/png");
    } else {
      setSignatureError("text-danger");
      setSignatureHelperTextError(true);
    }
  };




  if (debug === true) {
    // props.data = props.data;
  }

  const classes = useStyles();

  //-------------SNACKBAR-------------
  const [succesOrErrorBit, setSuccesOrErrorBit] = useState("success");
  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  //console.log("CLOSE AUTO");
    if (succesOrErrorBit === "success") {
      props.handler[0]();
    }
  };
  //-------------SNACKBAR-------------



  const saveData = async (data:any,saveOnly:boolean) => {

    data.lastFiveYearStatesOperate = listOfStates;
    // data.applicantAddresses = UpdateAddressesList;

    if(!(data.applicantAddresses)) data.applicantAddresses = [];
    if(!(data.employmentHistory)) data.employmentHistory = [];
    if(!(data.employmentAccidentsHistory)) data.employmentAccidentsHistory = [];
    if(!(data.employmentExperienceHistory)) data.employmentExperienceHistory = [];
    if(!(data.violations)) data.violations = [];
    if(!(data.licences)) data.licences = [];
    if(!(data.references)) data.references = [];


    setSignatureError("");
    setSignatureHelperTextError(false);
    base64SignatureImage = sigPad.current
      .getCanvas()
      .toDataURL("image/png");

    if (sigPad.current && sigPad.current.isEmpty()) {
      data.signature = "";
    }
    else data.signature = base64SignatureImage;
    data.user_name = props.data.user_name;
    // console.log("FOrm3");
    // console.log(data);
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
          setSnackOpen(true);
        }

      } catch (ex) {
        // console.log("Error Exaption Seerver Error");
        // console.log(resdata);
        // console.log(ex);
        setSuccesOrErrorBit("error");
        if(saveOnly){
          setSaveOnlySuccessSnackOpen(true);
        }else{
          setSnackOpen(true);
        }
      }
    }
  }

  const saveUnFilledData = () => {
      const watchAll = getValues();
      saveData(watchAll,true);
  }


  function handleAddChip(chip:any){
  }

  function insertWestStates(e:any)
  {

  }

  function insertMidWestStates(e:any)
  {
    
  }

  function insertNorthEastStates(e:any)
  {
    
  }

  function insertSouthStates(e:any)
  {
    
  }

  function handleDeleteChip(chip:any, index:number){
  }

  const onSubmit = async (data: any) => {
    if (sigPad.current && sigPad.current.isEmpty()) {
      setSignatureError("text-danger");
      setSignatureHelperTextError(true);
      return;
    }
   
  //console.log("datadata");
  //console.log(data);
    
    
    if(!(data.applicantAddresses)) data.applicantAddresses = [];
    if(!(data.employmentHistory)) data.employmentHistory = [];
    if(!(data.employmentAccidentsHistory)) data.employmentAccidentsHistory = [];
    if(!(data.employmentExperienceHistory)) data.employmentExperienceHistory = [];
    if(!(data.violations)) data.violations = [];
    if(!(data.licences)) data.licences = [];
    if(!(data.references)) data.references = [];


    data.applicantfirstName = props.data.first_name;
    data.applicantLastName = props.data.last_name

    saveData(data,false);


  };

  const calculateAge = (val:string)=>{
    let date = new Date(val);
    let currYear = new Date(Date.now()).getFullYear();
    return  currYear - date.getFullYear();
}

  const [age,setAge] = useState(calculateAge(props.data.applicantdateofbirth));

  const getAge = (e:any) => {
    let val = e.target.value;
    setAge(calculateAge(val));
  }




//console.log("props.data.applicantAddresses");
//console.log(props.data.applicantAddresses);

  const updateReferencesList = (updateReferences: any) => {
    //console.log("------------Update Driver License List------------");
    ReferencesList = updateReferences;
    //console.log(ReferencesList);
  };

  const updateDriverLicenseList = (updateDriverLicense: any) => {
    //console.log("------------Update Driver License List------------");
    DriverLicenseList = updateDriverLicense;
    //console.log(DriverLicenseList);
  };

  const updateTrafficConvictionsList = (updateTrafficConvictions: any) => {
    //console.log("------------Update Traffic Convictions List------------");
    TrafficConvictionsList = updateTrafficConvictions;
    //console.log(TrafficConvictionsList);
  };

  const updateEmploymentAccidentHistoryList = (
    updateEmploymentAccidentHistories: any
  ) => {
    //console.log(
    // "------------Update Employment Accident History List------------"
    // );
    EmploymentAccidentHistoryList = updateEmploymentAccidentHistories;
    //console.log(EmploymentAccidentHistoryList);
  };

  const updateDrivingExperienceList = (updateDrivingExperiences: any) => {
    //console.log("------------Update Driving Experience List------------");
    UpdateDrivingExperienceList = updateDrivingExperiences;
    //console.log(UpdateDrivingExperienceList);
  };

  const updateEmploymentHistoryList = (udpatedEmploymentHistory: any) => {
    //console.log("------------Updated Employment History List------------");
    UdpatedEmploymentHistoryList = udpatedEmploymentHistory;
    //console.log(UdpatedEmploymentHistoryList);
  };

  const updateAddressList = (updatedAddresses: any) => {
    //console.log("------------Updated Addresses------------");
    //  //console.log(updatedAddresses);
    UpdateAddressesList = updatedAddresses;
  };

  const [zipCodeNumber,setZipCodeNumber] = useState(props.data.companyPostCode);

  return (
    <React.Fragment>
      <Container style={{ backgroundColor: "#fafafa" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} sm={12} md={10}>
              <Paper elevation={3} className={classes.paper}>
                <h4>AWB Transport Inc., Employment Application</h4>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={10} style={{ marginBottom: "10px" }}>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="baseline"
                spacing={3}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Paper
                    style={{ margin: "10px 0px" }}
                    elevation={3}
                    className={(classes.heading, classes.paperProminantStyle)}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="baseline"
                      spacing={3}
                    >
                      <Grid item xs={12} sm={12} md={12} className={classes.heading}>
                        COMMERCIAL DRIVER APPLICATION
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          name="companyName"
                          variant="outlined"
                          size="small"
                          type="text"
                          className="col-10"
                          label="Company Name"
                          error={
                            errors.companyName === undefined ? false : true
                          }
                          helperText={RequireError}
                          inputRef={register({
                            required: {
                              value: reqBits.companyName,
                              message: RequireError,
                            },
                          })}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          className="col-10"
                          name="companyAddress"
                          variant="outlined"
                          size="small"
                          type="text"
                          label="Address"
                          error={
                            errors.companyAddress == undefined ? false : true
                          }
                          helperText={RequireError}
                          inputRef={register({
                            required: {
                              value: reqBits.companyAddress,
                              message: RequireError,
                            },
                          })}
                        ></TextField>
                      </Grid>
                      <Grid item xs={10}>
                        <Grid 
                          container
                          direction="row"
                          justify="space-evenly"
                          alignItems="baseline"
                          spacing={3}>
                              <Grid item xs={4}>
                                <TextField
                                  name="companyCity"
                                  variant="outlined"
                                  size="small"
                                  type="text"
                                  label="City"
                                  className="col-12"
                                  error={
                                    errors && errors.companyCity === undefined ? false : true
                                  }
                                  helperText={errors && errors.companyCity ? errors.companyCity.message : RequireError}
                                  inputRef={register({
                                    required: {
                                      value: reqBits.companyCity,
                                      message: RequireError,
                                    },
                                    pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                  })}
                                ></TextField>
                              </Grid>
                              <Grid item xs={4}>
                         

                                <ReactHookFormSelect
                                  nameVal="companyState"
                                  label="State"
                                  variant="outlined"
                                  
                                  size="small"
                                  forms={Forms}
                                  control={control}
                                  isReq={reqBits["companyState"]}
                                  error={errors && errors["companyState"]}
                                  className="col-12"
                                  defaultValue={props.data.companyState}
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
                              <Grid item xs={4}>
                                <TextField
                                  name="companyPostCode"
                                  variant="outlined"
                                  size="small"
                                  type="text"
                                  label="Zip Code"
                                  className="col-12"
                                  error={
                                    errors.companyPostCode == undefined ? false : true
                                  }
                                  helperText={
                                    errors.companyPostCode &&
                                    errors.companyPostCode?.message
                                  }
                                  value={zipCodeNumber}
                                  onChange={
                                    (e:any)=>{
                                      setZipCodeNumber(formatZipCode(e.target.value));
                                    }
                                  }
                                  inputRef={register({
                                    required: {
                                      value: reqBits.companyPostCode,
                                      message: RequireError,
                                    },
                                    minLength: {
                                      value: 5,
                                      message: "Min 5 Digits",
                                    },
                                    maxLength: {
                                      value: 5,
                                      message: "Max 5 Digits",
                                    },
                                    pattern: /[0-9]{5}/,
                                  })}
                                ></TextField>
                              </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={10} style={{ marginBottom: "10px" }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
                spacing={3}
              >
                <Grid item  xs={12} sm={12} md={12}>
                  <Paper
                    style={{ margin: "10px 0px" }}
                    elevation={3}
                    className={(classes.heading, classes.paperProminantStyle)}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item  xs={12} className={classes.heading}>
                        APPLICANT INFORMATION
                      </Grid>

                      <Grid item  xs={10}>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                            spacing={2}
                          >
                           
                            <Grid item  xs={12}>
                              <TextField
                                name="applicationApplyDate"
                                variant="outlined"
                                size="small"
                                type="date"
                                className="col-12"
                                label=""
                                error={
                                  errors.applicationApplyDate == undefined
                                    ? false
                                    : true
                                }
                                inputRef={register({
                                  required: reqBits.applicationApplyDate,
                                })}
                                inputProps={{
                                  max: resolveOverFlowYearIssue(),
                                }}
                                defaultValue={props.data.applicationApplyDate}
                                helperText={"Application Date: " + RequireError}
                              ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <RadioQuestions
                                id="applicationApplyAsPosition"
                                optionValue={[
                                  "contractor",
                                  "driver",
                                  "contractor_driver",
                                  "other",
                                ]}
                                question="Position applying for:"
                                optionList={[
                                  "Contractor",
                                  "Driver",
                                  "Contractor's Driver",
                                  "Other",
                                ]}
                                defaultSelected={
                                  props.data.applicationApplyAsPosition
                                }
                                useForm={Forms}
                                isReq={reqBits.applicationApplyAsPosition}
                                xsSize={12}
                                actionOnSelection={(e: any) => {
                                //console.log("Radio Radios");
                                //console.log(e);
                                }}
                              ></RadioQuestions>
                            </Grid>
                          </Grid>
                      </Grid>

                      <Grid item  xs={10}>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="baseline"
                            spacing={1}
                          >
                            <Grid item xs={6} style={{ marginBottom: "10px" }}>
                              <TextField
                                name="applicantfirstName"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="col-12"
                                error={
                                  errors.applicantfirstName === undefined
                                    ? false
                                    : true
                                }
                                label="First Name"
                                helperText={errors && errors.applicantfirstName ? errors.applicantfirstName.message : RequireError}
                                inputRef={register({
                                  required: {
                                    value: reqBits.applicantfirstName,
                                    message: RequireError,
                                  },
                                  pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                })}
                                value={props.data.first_name}
                              ></TextField>
                            </Grid>
                            <Grid item xs={6} style={{ marginBottom: "10px" }}>
                              <TextField
                                name="applicantLastName"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="col-12"
                                value={props.data.last_name}
                                error={
                                  errors.applicantLastName === undefined
                                    ? false
                                    : true
                                }
                                label="Last Name"
                                inputRef={register({
                                  required: reqBits.applicantLastName,
                                  pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                })}
                                helperText={errors && errors.applicantLastName ? errors.applicantLastName.message : RequireError}
                              ></TextField>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "10px" }}>
                            <PhoneNumberComponent
                                  className="col-12"
                                  mainId="applicantPhoneNumber"
                                  label="Phone Number"
                                  defaultValue={props.data.phone_number}
                                  useForms={Forms}
                            ></PhoneNumberComponent>
                           
                            </Grid>
                            <Grid item xs={6} style={{ marginBottom: "10px" }}>
                              <TextField
                                name="emergencyContactfirstName"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="col-12"
                                error={
                                  errors.emergencyContactfirstName == undefined
                                    ? false
                                    : true
                                }
                                label="Emergency Contact: First Name"
                                helperText={errors && errors.emergencyContactfirstName ? errors.emergencyContactfirstName.message : RequireError}
                                inputRef={register({
                                  required: reqBits.emergencyContactfirstName,
                                  pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                })}
                              ></TextField>
                            </Grid>
                            <Grid item xs={6} style={{ marginBottom: "10px" }}>
                              <TextField
                                name="emergencyContactlastName"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="col-12"
                                error={
                                  errors.emergencyContactlastName == undefined
                                    ? false
                                    : true
                                }
                                label="Emergency Contact: Last Name"
                                inputRef={register({
                                  required: reqBits.emergencyContactlastName,
                                  pattern:{value:/^[a-zA-Z ]{1,30}$/, message:"Only Chracters Allowed"}
                                })}
                                helperText={errors && errors.emergencyContactlastName ? errors.emergencyContactlastName.message : RequireError}
                              ></TextField>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "10px" }}>
                            <PhoneNumberComponent
                                  label="Emergency Contact: Mobile Number"
                                  mainId="emergencyContactNumber"
                                  defaultValue={props.data.emergencyContactNumber}
                                  className="col-12"
                                  useForms={Forms}
                            ></PhoneNumberComponent>
                            
                            </Grid>
                            <Grid item xs={6} style={{ marginBottom: "10px" }}>
                            <TextField
                                name="applicantdateofbirth"
                                variant="outlined"
                                size="small"
                                type="date"
                                className="col-12"
                                error={
                                  errors.applicantdateofbirth == undefined
                                    ? false
                                    : true
                                }
                                helperText={"Date of Birth " + RequireError}
                                onChange={getAge}
                                inputRef={register({
                                  required: reqBits.applicantdateofbirth,
                                })}
                                inputProps={{
                                  max: getMaxDate(),
                                  min: getMaxAgeLimit(),
                                }}
                              ></TextField>
                            </Grid>
                            <Grid item xs={6} style={{ marginBottom: "10px" }}>
                            <TextField
                                name="age"
                                variant="outlined"
                                size="small"
                                type="number"
                                className="col-12"
                                error={errors.age == undefined ? false : true}
                                label="Age"
                                helperText={RequireError}
                                value={age}
                                inputRef={register({
                                  required: reqBits.age,
                                })}
                              ></TextField>
                            
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: "10px" }}>
                              <TextField
                                name="physicalExamExpirationDate"
                                variant="outlined"
                                size="small"
                                type="date"
                                className="col-12"
                                error={
                                  errors.physicalExamExpirationDate == undefined
                                    ? false
                                    : true
                                }
                                inputProps={{
                                  max: resolveOverFlowYearIssue(),
                                }}
                                helperText="DOT Date Required *"
                                inputRef={register({
                                  required: reqBits.physicalExamExpirationDate,
                                })}
                              ></TextField>
                            </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    style={{ margin: "10px 0px" }}
                    elevation={3}
                    className={(classes.paper, classes.paperProminantStyle)}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                    >
                      <Grid
                        item
                        xs={12}
                        className={classes.heading}
                        style={{ textAlign: "center", margin: "10px 0px" }}
                      >
                        ADDRESS
                      </Grid>

                      <Grid item xs={10}>
                        <DynamicAddressComponent
                          idPrefix="applicantAddresses"
                          setAddresses={updateAddressList}
                          addressesList={props.data.addresses}
                          addressId="applicantAddresses"
                          cityId=""
                          minElementLimit={0}
                          stateId=""
                          zipCodeId=""
                          fromDateId=""
                          toDateId=""
                          forms={Forms}
                        ></DynamicAddressComponent>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={10} style={{ marginBottom: "10px" }}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={12} className={classes.heading}>
                    COMPANY HISTORY
                  </Grid>

                  <Grid item xs={11}>
                    <Paper
                      style={{ margin: "10px 0px" }}
                      elevation={3}
                      className={(classes.heading, classes.paperProminantStyle)}
                    >
                      <RadioQuestions
                        id="everWorkedForCompany"
                        question="Have you worked for this company before?"
                        optionValue={["Yes", "No"]}
                        optionList={["Yes", "No"]}
                        defaultSelected={props.data.everWorkedForCompany}
                        useForm={Forms}
                        isReq={reqBits.everWorkedForCompany}
                        actionOnSelection={(e: any) => {
                        //console.log("Radio Radios");
                        //console.log(e);
                        }}
                      ></RadioQuestions>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} className={classes.heading}>
                    EDUCATION HISTORY
                  </Grid>

                  <Grid item xs={11}>
                    <Paper
                      style={{ margin: "10px 0px" }}
                      elevation={3}
                      className={(classes.heading, classes.paperProminantStyle)}
                    >
                      <RadioQuestions
                        id="applicantSchoolGrade"
                        question="Please circle the highest School grade completed"
                        optionValue={[
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12",
                        ]}
                        optionList={[
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12",
                        ]}
                        defaultSelected={props.data.applicantSchoolGrade}
                        isReq={reqBits.applicantSchoolGrade}
                        useForm={Forms}
                        actionOnSelection={(e: any) => {
                        //console.log("Radio Radios");
                        //console.log(e);
                        }}
                      ></RadioQuestions>

                      <RadioQuestions
                        id="applicantCollegeGrade"
                        question="Please circle the highest Collage grade completed"
                        optionValue={["None","1", "2", "3", "4"]}
                        optionList={["None","1", "2", "3", "4"]}
                        defaultSelected={props.data.applicantCollegeGrade}
                        isReq={reqBits.applicantCollegeGrade}
                        useForm={Forms}
                        actionOnSelection={(e: any) => {
                        //console.log("Radio Radios");
                        //console.log(e);
                        }}
                      ></RadioQuestions>

                      <RadioQuestions
                        id="applicantPostGraduateGrade"
                        question="Please circle the highest Post Graduate grade completed"
                        optionValue={["None","1", "2", "3", "4"]}
                        optionList={["None","1", "2", "3", "4"]}
                        defaultSelected={props.data.applicantPostGraduateGrade}
                        isReq={reqBits.applicantPostGraduateGrade}
                        useForm={Forms}
                        actionOnSelection={(e: any) => {
                        //console.log("Radio Radios");
                        //console.log(e);
                        }}
                      ></RadioQuestions>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <hr style={{ marginBottom: "10px" }} />
                  </Grid>
                  <Grid item xs={12} className={classes.heading}>
                    EMPLOYMENT HISTORY
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10} className={classes.paper}>
                    <Typography
                      className={
                        (classes.text, classes.questionTextStyle, "col-12")
                      }
                      style={{ textAlign: "left" }}
                    >
                      Give a COMPLETE RECORD of all employment for the past
                      three (3) years, including any unemployment or self
                      employment periods, and all commercial driving experience
                      for the past ten (10) years.
                      <i>(List most current first)</i>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={10}>
                    <DynamicEmploymentHistoryComponent
                      idPrefix="employmentHistory"
                      useForm={Forms}
                      employmentHistoryList={props.data.employmentHistory}
                      setEmploymentHistoryList={updateEmploymentHistoryList}
                    ></DynamicEmploymentHistoryComponent>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "5px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={12} className={classes.heading}>
                    DRIVING EXPERIENCE
                  </Grid>

                  <Grid item xs={10}>
                    <DynamicDrivingExperienceComponent
                      idPrefix="employmentExperienceHistory"
                      drivingExperienceList={
                        props.data.employmentExperienceHistory
                      }
                      useForm={Forms}
                      setDrivingExperienceList={updateDrivingExperienceList}
                    ></DynamicDrivingExperienceComponent>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item  xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                    <Grid item xs={12} sm={12} md={12}>
                        <FixedTags
                            name="lastFiveYearStatesOperate"
                            defaultValues={listOfStates}
                            setListFunction={setListOfStates}
                            form={Forms}
                            reqBit={false}
                            label="List states operated in, for the last five (5) years: "
                            className="col-10"
                          />
                    </Grid>
                </Grid>
                { /* <ChipsArray 
                  name="lastFiveYearStatesOperate"
                  error={errors && errors.lastFiveYearStatesOperate}
                  label="List states operated in, for the last five (5) years: "
                  defaultValue={listOfStates}
                  form={Forms}
                  ></ChipsArray> */}

                {/* <TextField
                  id="outlined-multiline-static"
                  label={`List states operated in, for the last five (5) years: `}
                  name="lastFiveYearStatesOperate"
                  error={errors && errors.lastFiveYearStatesOperate}
                  inputRef={register({
                    required: reqBits.lastFiveYearStatesOperate,
                  })}
                  helperText={reqBits.lastFiveYearStatesOperate && RequireError + " NA if Not Available"}
                  multiline
                  rows={4}
                  defaultValue={props.data.lastFiveYearStatesOperate}
                  variant="outlined"
                  className="col-10"
                ></TextField> */}
                <br />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label={`List special courses/training completed (PTD/DDC, HAZMAT, ETC) `}
                  multiline
                  error={errors && errors.Listspecialcourses}
                  inputRef={register({
                    required: reqBits.Listspecialcourses,
                  })}
                  name="Listspecialcourses"
                  rows={4}
                  defaultValue={props.data.Listspecialcourses}
                  variant="outlined"
                  className="col-10"
                  helperText={reqBits.Listspecialcourses && "Required *" + " NA if Not Available"}
                />
                <br />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label={`List any Safe Driving Awards you hold and from whom:`}
                  multiline
                  rows={4}
                  error={errors && errors.ListanySafeDrivingAwards}
                  inputRef={register({
                    required: {
                      value: reqBits.ListanySafeDrivingAwards,
                      message: RequireError,
                    },
                  })}
                  name="ListanySafeDrivingAwards"
                  defaultValue={props.data.ListanySafeDrivingAwards}
                  variant="outlined"
                  className="col-10"
                  helperText={reqBits.ListanySafeDrivingAwards && RequireError + " NA if Not Available"}
                ></TextField>
              </Paper>
            </Grid>

            <Grid item  xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Typography className={classes.heading}>
                  List of accident history
                </Typography>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <DynamicEmploymentAccidentHistoryComponent
                      idPrefix="employmentAccidentsHistory"
                      employmentAccidentHistoryList={
                        props.data.employmentAccidentsHistory
                      }
                      useForm={Forms}
                      setEmploymentAccidentHistoryList={
                        updateEmploymentAccidentHistoryList
                      }
                    ></DynamicEmploymentAccidentHistoryComponent>
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Typography className={classes.heading}>
                  List of traffic conviction
                  <br/>
                  <sub>List most recent first</sub>
                </Typography>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <DynamicTrafficConvictions
                      idPrefix="violations"
                      trafficConvictionsList={props.data.violations}
                      useForm={Forms}
                      settrafficConvictionsList={updateTrafficConvictionsList}
                    ></DynamicTrafficConvictions>
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item  xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Typography className={classes.heading}>
                  Driver’s License <br/><sub>(list each driver’s license held in the past
                  three(3) years):</sub>
                </Typography>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <DynamicDriverLicense
                      idPrefix="licences"
                      dirverLicenseList={props.data.licences}
                      setdirverLicenseList={updateDriverLicenseList}
                      useForm={Forms}
                    ></DynamicDriverLicense>
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <RadioQuestions
                      id="deniedLicences"
                      question="Have you ever been denied a license, permit or privilege to operate a motor vehicle? *"
                      optionList={["Yes", "No"]}
                      optionValue={["Yes", "No"]}
                      useForm={Forms}
                      xsSize={11}
                      defaultSelected={props.data.deniedLicences}
                      isReq={reqBits.deniedLicences}
                      actionOnSelection={(e: any) => {
                        // console.log("Radio Radios");
                        // console.log(e);
                        if (e.target.value === "Yes") {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            deniedLicences: true,
                          });
                        } else {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            deniedLicences: false,
                          });
                        }
                      }}
                    ></RadioQuestions>
                  </div>
                  <div className="col-1"></div>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <RadioQuestions
                      id="permitLicences"
                      question="Has any license, permit or privilege ever been suspended or revoked? *"
                      optionList={["Yes", "No"]}
                      optionValue={["Yes", "No"]}
                      useForm={Forms}
                      xsSize={11}
                      defaultSelected={props.data.permitLicences}
                      isReq={reqBits.permitLicences}
                      actionOnSelection={(e: any) => {
                      //console.log("Radio Radios");
                      //console.log(e);
                        if (e.target.value === "Yes") {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            permitLicences: true,
                          });
                        } else {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            permitLicences: false,
                          });
                        }
                      }}
                    ></RadioQuestions>
                  </div>
                  <div className="col-1"></div>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <RadioQuestions
                      id="reasonforUnableToPerformActions"
                      question="Is there any reason you might be unable to perform the functions of the job for which
                      you have applied (as described in the job description)?"
                      optionList={["Yes", "No"]}
                      optionValue={["Yes", "No"]}
                      useForm={Forms}
                      xsSize={11}
                      defaultSelected={
                        props.data.reasonforUnableToPerformActions
                      }
                      isReq={reqBits.reasonforUnableToPerformActions}
                      actionOnSelection={(e: any) => {
                      //console.log("Radio Radios");
                      //console.log(e);
                        if (e.target.value === "Yes") {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            reasonforUnableToPerformActions: true,
                          });
                        } else {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            reasonforUnableToPerformActions: false,
                          });
                        }
                      }}
                    ></RadioQuestions>
                  </div>
                  <div className="col-1"></div>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <RadioQuestions
                      id="convictedofafelony"
                      question="Have you ever been convicted of a felony? *"
                      optionList={["Yes", "No"]}
                      optionValue={["Yes", "No"]}
                      useForm={Forms}
                      xsSize={11}
                      defaultSelected={props.data.convictedofafelony}
                      isReq={reqBits.convictedofafelony}
                      actionOnSelection={(e: any) => {
                        if (e.target.value === "Yes") {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            convictedofafelony: true,
                          });
                        } else {
                          setLicenseQuestionBits({
                            ...licenseQuestionBits,
                            convictedofafelony: false,
                          });
                        }
                      }}
                    ></RadioQuestions>
                  </div>
                  <div className="col-1"></div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    {(licenseQuestionBits.deniedLicences ||
                      licenseQuestionBits.permitLicences ||
                      licenseQuestionBits.convictedofafelony ||
                      licenseQuestionBits.reasonforUnableToPerformActions) && (
                      <TextField
                        id="outlined-multiline-static"
                        label="If the answers to any questions listed above are “yes”,
                      give details"
                        multiline
                        rows={4}
                        error={errors && errors.answerToAnyQuestion}
                        inputRef={register({
                          required: {
                            value: reqBits.answerToAnyQuestion,
                            message: RequireError,
                          },
                        })}
                        helperText={reqBits.answerToAnyQuestion && RequireError}
                        name="answerToAnyQuestion"
                        defaultValue={props.data.answerToAnyQuestion}
                        variant="outlined"
                        className="col-11"
                      />
                    )}
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Typography className={classes.heading}>
                  List three (3) persons for references, other than family
                  <br />
                  members, who have knowledge of your safety habits:
                </Typography>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <DynamicReferences
                      idPrefix="references"
                      referenceList={props.data.references}
                      setReferenceList={updateReferencesList}
                      useForm={Forms}
                    ></DynamicReferences>
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Typography className={classes.heading}>
                  To Be Read and Signed by Applicant:
                </Typography>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2 text-left">
                    <Typography>
                      <ul>
                        <li>
                          It is agreed and understood that any misrepresentation
                          given on this application shall be considered an act
                          of dishonesty.
                        </li>
                        <li>
                          It is agreed and understood that the motor carrier or
                          his agents may investigate the applicant’s background
                          to obtain any and all information of concern to
                          applicant’s record, whether same is of record or not,
                          and applicant releases employers and person named
                          herein from all liability for any damages on account
                          of his furnishing such information.
                        </li>
                        <li>
                          It is also agreed and understood that under the Fair
                          Credit Reporting Act, Public Law 91-508, I have been
                          told that this investigation may include an
                          investigating Consumer Report, including information
                          regarding my character, general reputation, personal
                          characteristics, and mode of living.
                        </li>
                        <li>
                          I agree to furnish such additional information and
                          complete such examinations as may be required to
                          complete my application file.
                        </li>
                        <li>
                          It is agreed and understood that this Application in
                          no way obligates the motor carrier to employ or hire
                          the applicant.
                        </li>
                        <li>
                          It is agreed and understood that if qualified and
                          hired, I may be on a probationary period during which
                          time I may be disqualified without recourse.
                        </li>
                        <li>
                          This certifies that this application was completed by
                          me, and that all entries on it and information in it
                          are true and complete to the best of my knowledge.
                        </li>
                      </ul>
                    </Typography>
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
              <Paper
                elevation={3}
                className={
                  (classes.heading, classes.paperProminantStyle)
                }
              >
                <Typography
                  className={signatureError}
                  align="center"
                  variant="h6"
                >
                  Employee Signature
                </Typography>
                {signatureHelperTextError === true && (
                  <Typography
                    align="center"
                    variant="subtitle2"
                    className="text-danger"
                  >
                    Please ! Sign here
                  </Typography>
                )}
               <div
                  style={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    display: "inline-block",
                    width:"auto",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <SignatureCanvas
                    penColor="black"
                    ref={sigPad}
                    canvasProps={{
                      width:sigWidth,
                      // style:{minWidth:canvasMinWidth},
                      height: 150,
                      className: "sigCanvas",
                    }}
                    onEnd={(e:any)=>{saveImage();}}
                    />
                </div>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="baseline"
                  spacing={3}
                >
                  <Grid item xs={4} sm={4} md={3}>
                    {/* <span>Width: {sigWidth}px  <br/>35% Width: {(sigWidth/100)*35}px</span> */}
                    <Button
                      type="button"
                      className="col-12"
                      variant="contained"
                      color="primary"
                      onClick={clearSigPad}
                    >
                      Clear
                    </Button>
                  </Grid>
                  
                </Grid>
              </Paper>
            </Grid>

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
                      Save This & Next
                    </Button>
                  </Grid>
                  {/* BUTTON End */}
              </Grid>
            </Grid>
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
        <AlertComponent
          duration={snackbarDuratuion}
          open={snackOpen}
          message={
            succesOrErrorBit === "success"
            ? "Data Saved Successfully"
              : "Server Error"
            }
          onClose={handleClose}
          severity={succesOrErrorBit}
        ></AlertComponent>
      </Container>
    </React.Fragment>
  );
}

export default EmpApplicationForm3;
