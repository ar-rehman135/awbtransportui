import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DrivingExperience from "./SubComponents/DrivingExperience";
import {
  addr,
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
} from "../Common/CommonVariables";
import { Addresses, form3DefaultValue } from "../Common/CommonVariables";
import RadioQuestions from "./SubComponents/RadioQuestions";
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
import { update } from "../services/updateApi";
import { PinDropRounded } from "@material-ui/icons";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    default: {},
    paper: {
      color: theme.palette.text.secondary,
      padding: "5px 10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(19),
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
    },
    smallHeading: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
      textJustify: "inter-word",
    },
    text: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
      textJustify: "inter-word",
    },
    caption: {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
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

type Props = { data?: any; handler?: any };

function EmpApplicationForm3(props: Props) {
  const Forms = useForm({ defaultValues: form3DefaultValue });
  const { register, handleSubmit, errors, control } = Forms;

  if (debug === true) {
    // props.data = form3DefaultValue;
  }

  const classes = useStyles();

  const onSubmit = (data: any) => {
    // data.employmentAccidentsHistory = EmploymentAccidentHistoryList;
    // data.violations = TrafficConvictionsList;
    // data.employmentExperienceHistory = UpdateDrivingExperienceList;
    // data.employmentHistories = UdpatedEmploymentHistoryList;
    // data.employmentHistory.map();
    // data.employmentHistorysubjecttotheFMCSRs = data.employmentHistorysubjecttotheFMCSRs == ""
    console.log(data);
    data.user_name = props.data.user_name;
    update(data);
    props.handler[0]();
  };

  const updateDriverLicenseList = (updateDriverLicense: any) => {
    console.log("------------Update Driver License List------------");
    DriverLicenseList = updateDriverLicense;
    console.log(DriverLicenseList);
  };

  const updateTrafficConvictionsList = (updateTrafficConvictions: any) => {
    console.log("------------Update Traffic Convictions List------------");
    TrafficConvictionsList = updateTrafficConvictions;
    console.log(TrafficConvictionsList);
  };

  const updateEmploymentAccidentHistoryList = (
    updateEmploymentAccidentHistories: any
  ) => {
    console.log(
      "------------Update Employment Accident History List------------"
    );
    EmploymentAccidentHistoryList = updateEmploymentAccidentHistories;
    console.log(EmploymentAccidentHistoryList);
  };

  const updateDrivingExperienceList = (updateDrivingExperiences: any) => {
    console.log("------------Update Driving Experience List------------");
    UpdateDrivingExperienceList = updateDrivingExperiences;
    console.log(UpdateDrivingExperienceList);
  };

  const updateEmploymentHistoryList = (udpatedEmploymentHistory: any) => {
    console.log("------------Updated Employment History List------------");
    UdpatedEmploymentHistoryList = udpatedEmploymentHistory;
    console.log(UdpatedEmploymentHistoryList);
  };

  const updateAddressList = (updatedAddresses: any) => {
    console.log("------------Updated Addresses------------");
    //  console.log(updatedAddresses);
    UpdateAddressesList = updatedAddresses;
  };

  return (
    <React.Fragment>
      <Container style={{ backgroundColor: "#fafafa" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.paper, classes.paperProminantStyle)}
              >
                <h4>AWB Transport Inc., Employment Application</h4>
              </Paper>
            </Grid>
            <Grid item xs={10} style={{ marginBottom: "10px" }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
                spacing={3}
              >
                <Grid item xs={12}>
                  <Paper
                    style={{ margin: "10px 0px" }}
                    elevation={3}
                    className={(classes.heading, classes.paperProminantStyle)}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="baseline"
                      spacing={3}
                    >
                      <Grid item xs={12} className={classes.heading}>
                        COMMERCIAL DRIVER APPLICATION
                      </Grid>
                      <Grid item xs={12}>
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
                          helperText={
                            errors.companyName && errors.companyName?.message
                          }
                          inputRef={register({
                            required: {
                              value: reqBits.companyName,
                              message: RequireError,
                            },
                          })}
                        ></TextField>
                      </Grid>
                      <Grid item xs={12}>
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
                          helperText={
                            errors.companyAddress &&
                            errors.companyAddress?.message
                          }
                          inputRef={register({
                            required: {
                              value: reqBits.companyAddress,
                              message: RequireError,
                            },
                          })}
                        ></TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          name="companyCity"
                          variant="outlined"
                          size="small"
                          type="text"
                          label="City"
                          className="col-6"
                          error={
                            errors.companyCity === undefined ? false : true
                          }
                          helperText={
                            errors.companyCity && errors.companyCity?.message
                          }
                          inputRef={register({
                            required: {
                              value: reqBits.companyCity,
                              message: RequireError,
                            },
                          })}
                        ></TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <ReactHookFormSelect
                          nameVal="companyState"
                          label="State"
                          variant="outlined"
                          size="small"
                          control={control}
                          className="col-10"
                          defaultValue="Alaska"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {states.map(function (object: any, i: number) {
                            return (
                              <MenuItem value={object.value} key={i}>
                                {object.value}
                              </MenuItem>
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
                          className="col-6"
                          error={
                            errors.companyPostCode == undefined ? false : true
                          }
                          helperText={
                            errors.companyPostCode &&
                            errors.companyPostCode?.message
                          }
                          inputRef={register({
                            required: {
                              value: reqBits.companyPostCode,
                              message: RequireError,
                            },
                          })}
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} style={{ marginBottom: "10px" }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
                spacing={3}
              >
                <Grid item xs={12}>
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
                      <Grid item xs={12} className={classes.heading}>
                        APPLICANT INFORMATION
                      </Grid>

                      <Grid item xs={10}>
                        <Paper
                          className={
                            (classes.heading, classes.paperProminantStyle)
                          }
                        >
                          <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="flex-start"
                            spacing={2}
                          >
                            <Grid item xs={4}>
                              <Typography className={classes.text}>
                                Application Date:
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <TextField
                                name="applicationApplyDate"
                                variant="outlined"
                                size="small"
                                type="date"
                                className="col-10"
                                label=""
                                error={
                                  errors.applicationApplyDate == undefined
                                    ? false
                                    : true
                                }
                                inputRef={register({
                                  required: reqBits.applicationApplyDate,
                                })}
                                defaultValue={
                                  form3DefaultValue.applicationApplyDate
                                }
                                helperText={
                                  errors.applicationApplyDate &&
                                  errors.applicationApplyDate?.type.toUpperCase() +
                                    " Error"
                                }
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
                                  form3DefaultValue.applicationApplyAsPosition
                                }
                                useForm={Forms}
                                isReq={false}
                                xsSize={11}
                              ></RadioQuestions>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item xs={10}>
                        <Paper
                          style={{ margin: "10px 0px" }}
                          elevation={3}
                          className={
                            (classes.paper, classes.paperProminantStyle)
                          }
                        >
                          <Grid
                            container
                            direction="row"
                            justify="space-around"
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid item xs={5}>
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
                                helperText={
                                  errors.applicantfirstName &&
                                  errors.applicantfirstName?.message
                                }
                                inputRef={register({
                                  required: {
                                    value: reqBits.applicantfirstName,
                                    message: RequireError,
                                  },
                                })}
                              ></TextField>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField
                                name="applicantLastName"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="col-12"
                                error={
                                  errors.applicantLastName === undefined
                                    ? false
                                    : true
                                }
                                label="Last Name"
                                inputRef={register({
                                  required: reqBits.applicantLastName,
                                })}
                                helperText={
                                  errors.applicantLastName &&
                                  errors.applicantLastName?.type.toUpperCase() +
                                    " Error"
                                }
                              ></TextField>
                            </Grid>
                            <Grid item xs={11}>
                              <TextField
                                name="applicantPhoneNumber"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="col-12"
                                error={
                                  errors.applicantPhoneNumber == undefined
                                    ? false
                                    : true
                                }
                                label="Phone Number"
                                helperText={
                                  errors.applicantPhoneNumber &&
                                  errors.applicantPhoneNumber?.message
                                }
                                inputRef={register({
                                  required: {
                                    value: reqBits.applicantPhoneNumber,
                                    message: RequireError,
                                  },
                                  pattern: {
                                    value: /^([0-9]{3}[-.][0-9]{3}[-.][0-9]{4}[-. ][x][0-9]{4})$/,
                                    message:
                                      WrongPatternError +
                                      " : ###-###-#### x####",
                                  },
                                })}
                              ></TextField>
                            </Grid>
                            <Grid item xs={5}>
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
                                label="Emergency: First Name"
                                helperText={
                                  errors.emergencyContactfirstName &&
                                  errors.emergencyContactfirstName?.message
                                }
                                inputRef={register({
                                  required: {
                                    value: reqBits.emergencyContactfirstName,
                                    message: RequireError,
                                  },
                                })}
                              ></TextField>
                            </Grid>
                            <Grid item xs={5}>
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
                                label="Emergency: Last Name"
                                inputRef={register({
                                  required: reqBits.emergencyContactlastName,
                                })}
                                helperText={
                                  errors.emergencyContactlastName &&
                                  errors.emergencyContactlastName?.type.toUpperCase() +
                                    " Error"
                                }
                              ></TextField>
                            </Grid>
                            <Grid item xs={11}>
                              <TextField
                                name="emergencyContactNumber"
                                variant="outlined"
                                size="small"
                                type="tel"
                                className="col-12"
                                error={
                                  errors.emergencyContactNumber == undefined
                                    ? false
                                    : true
                                }
                                label="Emergency: Mobile Num"
                                helperText={
                                  errors.emergencyContactNumber &&
                                  errors.emergencyContactNumber?.message
                                }
                                inputRef={register({
                                  required: {
                                    value: reqBits.emergencyContactNumber,
                                    message: RequireError,
                                  },
                                  pattern: {
                                    value: /^([0-9]{3}[-.][0-9]{3}[-.][0-9]{4}[-. ][x][0-9]{4})$/,
                                    message:
                                      WrongPatternError +
                                      " : ###-###-#### x####",
                                  },
                                })}
                              ></TextField>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField
                                name="age"
                                variant="outlined"
                                size="small"
                                type="number"
                                className="col-12"
                                error={errors.age == undefined ? false : true}
                                label="Age"
                                helperText={errors.age && errors.age?.message}
                                inputRef={register({
                                  required: {
                                    value: reqBits.age,
                                    message: RequireError,
                                  },
                                })}
                              ></TextField>
                            </Grid>
                            <Grid item xs={5}>
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
                                label="Date of Birth"
                                inputRef={register({
                                  required: reqBits.applicantdateofbirth,
                                })}
                                helperText={
                                  errors.applicantdateofbirth &&
                                  errors.applicantdateofbirth?.type.toUpperCase() +
                                    " Error"
                                }
                              ></TextField>
                            </Grid>
                            <Grid item xs={11}>
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
                                label="Phyical Exam Exp Date"
                                inputRef={register({
                                  required: reqBits.physicalExamExpirationDate,
                                })}
                                helperText={
                                  errors.physicalExamExpirationDate == undefined
                                    ? ""
                                    : "Exp Date " +
                                      errors.physicalExamExpirationDate?.type.toUpperCase() +
                                      " Error"
                                }
                              ></TextField>
                            </Grid>
                          </Grid>
                        </Paper>
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
                          addressesList={form3DefaultValue.applicantAddresses}
                          addressId="applicantAddresses"
                          cityId=""
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

            <Grid item xs={10} style={{ marginBottom: "10px" }}>
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
                        defaultSelected={form3DefaultValue.everWorkedForCompany}
                        useForm={Forms}
                        isReq={reqBits.everWorkedForCompany}
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
                        defaultSelected={form3DefaultValue.applicantSchoolGrade}
                        isReq={reqBits.applicantSchoolGrade}
                        useForm={Forms}
                      ></RadioQuestions>

                      <RadioQuestions
                        id="applicantCollegeGrade"
                        question="Please circle the highest Collage grade completed"
                        optionValue={["1", "2", "3", "4"]}
                        optionList={["1", "2", "3", "4"]}
                        defaultSelected={
                          form3DefaultValue.applicantCollegeGrade
                        }
                        isReq={reqBits.applicantCollegeGrade}
                        useForm={Forms}
                      ></RadioQuestions>

                      <RadioQuestions
                        id="applicantPostGraduateGrade"
                        question="Please circle the highest Post Graduate grade completed"
                        optionValue={["1", "2", "3", "4"]}
                        optionList={["1", "2", "3", "4"]}
                        defaultSelected={
                          form3DefaultValue.applicantPostGraduateGrade
                        }
                        isReq={reqBits.applicantPostGraduateGrade}
                        useForm={Forms}
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
                      employmentHistoryList={
                        form3DefaultValue.employmentHistory
                      }
                      setEmploymentHistoryList={updateEmploymentHistoryList}
                    ></DynamicEmploymentHistoryComponent>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={10}>
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
                        form3DefaultValue.employmentExperienceHistory
                      }
                      useForm={Forms}
                      setDrivingExperienceList={updateDrivingExperienceList}
                    ></DynamicDrivingExperienceComponent>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <TextField
                  id="outlined-multiline-static"
                  label="List states operated in, for the last five (5) years:"
                  name="lastFiveYearStatesOperate"
                  inputRef={register({
                    required: reqBits.lastFiveYearStatesOperate,
                  })}
                  multiline
                  rows={4}
                  defaultValue={form3DefaultValue.lastFiveYearStatesOperate}
                  variant="outlined"
                  className="col-10"
                />
                <br />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label="List special courses/training completed (PTD/DDC, HAZMAT, ETC)"
                  multiline
                  inputRef={register({
                    required: reqBits.Listspecialcourses,
                  })}
                  name="Listspecialcourses"
                  rows={4}
                  defaultValue={form3DefaultValue.Listspecialcourses}
                  variant="outlined"
                  className="col-10"
                />
                <br />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label="List any Safe Driving Awards you hold and from whom:"
                  multiline
                  rows={4}
                  inputRef={register({
                    required: reqBits.ListanySafeDrivingAwards,
                  })}
                  name="ListanySafeDrivingAwards"
                  defaultValue={form3DefaultValue.ListanySafeDrivingAwards}
                  variant="outlined"
                  className="col-10"
                />
              </Paper>
            </Grid>

            <Grid item xs={10}>
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
                        form3DefaultValue.employmentAccidentsHistory
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

            <Grid item xs={10}>
              <Paper
                style={{ margin: "10px 0px" }}
                elevation={3}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Typography className={classes.heading}>
                  List of traffic conviction
                </Typography>
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10 mt-2">
                    <DynamicTrafficConvictions
                      idPrefix="violations"
                      trafficConvictionsList={[trafficConvictionDummyElement]}
                      useForm={Forms}
                      settrafficConvictionsList={updateTrafficConvictionsList}
                    ></DynamicTrafficConvictions>
                  </div>
                  <div className="col-1"></div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Button
                type="button"
                className="col-12"
                variant="contained"
                color="primary"
                onClick={() => {
                  props.handler[1]();
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                className="col-12"
                variant="contained"
                color="primary"
              >
                Save This & Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default EmpApplicationForm3;
