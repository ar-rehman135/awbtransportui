import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import styleClasses from "../Common/styleClasses";
import { formatSSN, reqBits, RequireError, resolveOverFlowYearIssue } from "../Common/CommonVariables";
import { useForm } from "react-hook-form";
import drug_and_alcohol_policy_snapshot_1 from "../assets/images/drug and alcohol policy snapshot 1.jpg";
import SignatureCanvas from "react-signature-canvas";
import { update } from "../services/updateApi";
import { useRef, useState } from "react";
import { snackbarDuratuion ,autoSubmit} from "../Common/CommonVariables";
import Box from "@material-ui/core/Box";
import { useEffect } from "react";


import AlertComponent from "./SubComponents/AlertComponent";
import useWindowDimensionHook from "./MyHook/WindowDimension";

type Props = { data?: any; handler?: any; setData: any };

let base64SignatureImage: string;

export default function EmpApplicationForm6(props: Props) {
  const classes = styleClasses.useStyles();
  const { register, handleSubmit, errors,getValues } = useForm({
    defaultValues: props.data,
  });
  const watchAll = getValues();

  const [ssnNumber,setSsnNumber] = useState(props.data.socialSecurity);

  const callbackOnWindowResize = () => {
  //console.log(width);
    setSigWidth(width);
  };

  const { width } = useWindowDimensionHook(callbackOnWindowResize);

  const [sigWidth, setSigWidth] = useState(width);

  const sigPad = useRef<any>();

  const clearSigPad = () => {
    if (sigPad && sigPad.current) {
      sigPad.current?.clear();
      base64SignatureImage = "";
    }
  };

  useEffect(() => {
    base64SignatureImage = props.data.alcoholTestEmployeeSignature;
    // console.log(props.data.alcoholTestEmployeeSignature);
    window.scrollTo(0, 0);
    if (base64SignatureImage !== undefined && base64SignatureImage !== "") {
      sigPad.current?.clear();
      sigPad.current.fromDataURL(base64SignatureImage);
    }
    // console.log(props.data.alcoholTestEmployeeSignature);
            if(autoSubmit){
    let watchAll = getValues();
      onSubmit(watchAll );
    }
  }, []);

  useEffect(() => {
    if (base64SignatureImage !== undefined && base64SignatureImage !== "") {
      sigPad.current?.clear();
      sigPad.current.fromDataURL(base64SignatureImage);
    }
  }, [sigWidth]);

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

  //-------------SNACKBAR-------------

  const [signatureError, setSignatureError] = useState("");
  const [signatureHelperTextError, setSignatureHelperTextError] = useState(
    false
  );

  const saveImage = () => {
  //console.log("base64SignatureImage onEnd");
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


  
  const saveData = async (data:any,saveOnly:boolean) => {
    {
      setSignatureError("");
      setSignatureHelperTextError(false);
      base64SignatureImage = sigPad.current
        .getCanvas()
        .toDataURL("image/png");
    }
    if (sigPad.current && sigPad.current.isEmpty()) {
      data.alcoholTestEmployeeSignature = "";
    }
    else data.alcoholTestEmployeeSignature = base64SignatureImage;
    data.user_name = props.data.user_name;
    // console.log(data.alcoholTestEmployeeSignature);
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


  const onSubmit = async (data: any) => {
    if (sigPad.current && sigPad.current.isEmpty()) {
      setSignatureError("text-danger");
      setSignatureHelperTextError(true);
      return;
    }
    saveData(data,false);
    
    // data.user_name = props.data.user_name;
    // const resdata = await update(data);
    // if (resdata.data){
    //     try {
    //     props.setData(resdata.data.data);
    //     //-------------SNACKBAR-------------
    //     setSuccesOrErrorBit("success");
    //     setSnackOpen(true);
    //     //-------------SNACKBAR-------------
    //     // props.handler[0]();
    //   } catch (ex) {
    //     console.log("Error Exaption Seerver Error");
    //     console.log(resdata);
    //     console.log(ex);
    //   //-------------SNACKBAR-------------
    //     setSuccesOrErrorBit("error");
    //     setSnackOpen(true);
    //     //-------------SNACKBAR-------------
    //   }
    // }
  };

  return (
    <div>
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

            {/* PAGE 2 */}
            <Grid item xs={12} sm={12} md={10} style={{ marginBottom: "10px" }}>
              <Paper
                elevation={3}
                style={{ paddingLeft: "40px", paddingRight: "60px" }}
                className={(classes.heading, classes.paperProminantStyle)}
              >
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="baseline"
                  spacing={3}
                >
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="baseline"
                    spacing={3}
                  >
                    <Grid item xs={12} sm={12} md={12} className={classes.heading}>
                      EMPLOYEE APPLICATION
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <TextField
                        name="alcoholTestEmployeeFirstName"
                        variant="outlined"
                        size="small"
                        type="text"
                        label="Employee First Name"
                        helperText={
                          reqBits.alcoholTestEmployeeFirstName && RequireError
                        }
                        className="col-12"
                        error={errors && errors.alcoholTestEmployeeFirstName}
                        inputRef={register({
                          required: {
                            value: reqBits.alcoholTestEmployeeFirstName,
                            message: RequireError,
                          },
                        })}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <TextField
                        name="alcoholTestEmployeeLastName"
                        variant="outlined"
                        size="small"
                        type="text"
                        label="Employee Last Name"
                        className="col-12"
                        helperText={
                          reqBits.alcoholTestEmployeeLastName && RequireError
                        }
                        error={errors && errors.alcoholTestEmployeeLastName}
                        inputRef={register({
                          required: {
                            value: reqBits.alcoholTestEmployeeLastName,
                            message: RequireError,
                          },
                        })}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <TextField
                        name="alcoholTestSecurityNumber"
                        variant="outlined"
                        size="small"
                        type="text"
                        label="Social Security Number"
                        className="col-12"
                        helperText={
                          reqBits.alcoholTestSecurityNumber
                            ? errors["alcoholTestSecurityNumber"] !== undefined
                              ? errors["alcoholTestSecurityNumber"].message
                              : RequireError
                            : ""
                        }
                        error={errors && errors.alcoholTestSecurityNumber}
                        inputRef={register({
                          required: {
                            value: reqBits.alcoholTestSecurityNumber,
                            message: RequireError,
                          },
                        })}
                        value={ssnNumber}
                        onChange={
                          (e:any)=>{
                            setSsnNumber(formatSSN(e.target.value));
                          }
                        }
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                      <TextField
                        name="alcoholTestExecutionDate"
                        variant="outlined"
                        size="small"
                        type="date"
                        helperText={`Executed on the date ${
                          reqBits.alcoholTestExecutionDate && RequireError
                        }`}
                        className="col-12"
                        error={errors && errors.alcoholTestExecutionDate}
                        inputRef={register({
                          required: {
                            value: reqBits.alcoholTestExecutionDate,
                            message: RequireError,
                          },
                        })}
                        inputProps={{
                          max: resolveOverFlowYearIssue(),
                        }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
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
                            width: "auto",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        >
                          <SignatureCanvas
                            penColor="black"
                            ref={sigPad}
                            canvasProps={{
                              width:sigWidth,
                              height: 150,
                              className: "sigCanvas",
                            }}
                            onEnd={(e: any) => {
                              saveImage();
                            }}
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
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
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
                      onClick={()=>{
                        saveUnFilledData();
                      }}
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
        <AlertComponent
          duration={snackbarDuratuion}
          open={snackOpen}
          onClose={handleClose}
          severity={succesOrErrorBit}
          message="Data Saved Successfully"
          // message={succesOrErrorBit === "success" ? "Success" : "Error"}
        ></AlertComponent>
      </Container>
    </div>
  );
}
