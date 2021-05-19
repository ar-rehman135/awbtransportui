import React,{useEffect} from "react";
import {
  Address,
  tDrivingExperiences,
  tDrivingExperience,
} from "../../Common/CommonVariables";
import {
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
import FromToDateComponent from "../SubComponents/FromToDate";

type Props = {
  idPrefix: string;
  drivingExperienceList: tDrivingExperiences;
  useForm: any;
  setDrivingExperienceList: any;
};

const RequireError: string = "Required *";
const WrongPatternError: string = "Wrong Pattern";

let dummyData: tDrivingExperience = {
  experienceclassofEquipment: "",
  experienceFromDate: "",
  experienceToDate: "",
  experiencenumberOfMiles: 0,
};

export function DynamicDrivingExperienceComponent(props: Props) {
  const classes = styleClasses.useStyles();
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    errors,
    setError,
  } = props.useForm;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: props.idPrefix,
    }
  );

  const submit = (e: any) => {
    e.preventDefault();
    //console.log(e.target.data);
  };

  useEffect(()=>{
    if(fields.length === 0){
      append(props.drivingExperienceList);
    }
  },[]);


  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {fields.map((item, index) => (
          <Accordion defaultExpanded key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Experience {index + 1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={6}>
                  <TextField
                    // {`${props.idPrefix}[${index}].lastYearAddressTo`}
                    name={`${props.idPrefix}[${index}].experienceclassofEquipment`}
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].experienceclassofEquipment
                    }
                    inputRef={register({
                      required: reqBits.experienceclassofEquipment,
                    })}
                    helperText={
                      reqBits.experienceclassofEquipment && RequireError
                    }
                    variant="outlined"
                    size="small"
                    defaultValue={item.experienceclassofEquipment}
                    type="text"
                    label="Class of Equipment"
                    className="col-12"
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name={`${props.idPrefix}[${index}].experiencenumberOfMiles`}
                    error={
                      errors &&
                      errors[props.idPrefix] &&
                      errors[props.idPrefix][index] &&
                      errors[props.idPrefix][index].experiencenumberOfMiles
                    }
                    inputRef={register({
                      required: reqBits.experiencenumberOfMiles,
                    })}
                    helperText={reqBits.experiencenumberOfMiles && RequireError}
                    variant="outlined"
                    size="small"
                    defaultValue={item.experiencenumberOfMiles}
                    type="number"
                    label="Approximate Number of Miles"
                    className="col-12"
                  ></TextField>
                </Grid>
                <FromToDateComponent
                  useForm={props.useForm}
                  mainId={props.idPrefix}
                  index={index}
                  item={item}
                  fromId="experienceFromDate"
                  toId="experienceToDate"
                  defaultFromDate={item.experienceFromDate}
                  defaultToDate={item.experienceToDate}
                  ></FromToDateComponent>

              
              </Grid>
            </AccordionDetails>
            <AccordionActions
              style={{
                justifyContent: "center",
                padding: "20px 20px",
              }}
            >
              <Grid item xs={6} style={{ padding: "20px 10px" }}>
                <Button
                  size="small"
                  className="col-6"
                  variant="contained"
                  color="default"
                  onClick={() => {
                   // if (index > 0) {
                      remove(index);
                    //}
                  }}
                >
                  Delete Entry
                </Button>
              </Grid>
            </AccordionActions>
          </Accordion>
        ))}
        <Grid item xs={12} style={{ padding: "20px 10px" }}>
          <Button
            size="small"
            className="col-3"
            variant="contained"
            color="primary"
            onClick={() =>
              append({
                dummyData,
              })
            }
          >
            Add More
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
