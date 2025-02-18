import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

// Define our form data structure
interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other";
  interests: {
    sports: boolean;
    music: boolean;
    reading: boolean;
  };
  country: string;
  otherCountry?: string;
  address: {
    city: string;
    state: string;
    zip: string;
  };
  skills: { name: string }[];
}

/**
 * Async function to simulate email availability check.
 * If the email is "taken@example.com", we return an error message.
 */
const checkEmailAvailability = async (email: string): Promise<true | string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === "taken@example.com") {
        resolve("Email is already taken");
      } else {
        resolve(true);
      }
    }, 1000);
  });
};

const AdvancedRegistrationForm: React.FC = () => {
  // Initialize the form with default values.
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "male",
      interests: { sports: false, music: false, reading: false },
      country: "",
      otherCountry: "",
      address: { city: "", state: "", zip: "" },
      skills: [{ name: "" }],
    },
    // Using onBlur mode to reduce re-renders
    mode: "onBlur",
  });

  // Manage dynamic skills fields.
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // Watch some fields for conditional rendering and cross‑field validation.
  const selectedCountry = watch("country");
  const passwordValue = watch("password");

  // Handle form submission.
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Submitted Data:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600, mx: "auto", p: 2 }}
    >
      <h1>Advanced Registration Form</h1>
      <Grid container spacing={2}>
        {/* First Name with Custom Validation */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
              // Custom rule: Only letters allowed
              validate: (value) =>
                /^[A-Za-z]+$/.test(value) ||
                "First name should only contain letters",
              maxLength: { value: 20, message: "Max length is 20" },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        {/* Email with Async Validation */}
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
              // Asynchronous validation
              validate: async (value) => await checkEmailAvailability(value),
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Email"
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length is 6" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        {/* Confirm Password with Cross‑Field Validation */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid>

        {/* Gender (Radio Buttons) */}
        <Grid item xs={12}>
          <FormControl component="fieldset" error={!!errors.gender}>
            <FormLabel component="legend">Gender</FormLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.gender?.message}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Interests (Checkboxes) */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Interests</FormLabel>
            <FormControlLabel
              control={<Checkbox {...register("interests.sports")} />}
              label="Sports"
            />
            <FormControlLabel
              control={<Checkbox {...register("interests.music")} />}
              label="Music"
            />
            <FormControlLabel
              control={<Checkbox {...register("interests.reading")} />}
              label="Reading"
            />
          </FormControl>
        </Grid>

        {/* Country (Select Dropdown) */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.country}>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              label="Country"
              defaultValue=""
              {...register("country", { required: "Country is required" })}
            >
              <MenuItem value="">
                <em>Select country</em>
              </MenuItem>
              <MenuItem value="usa">USA</MenuItem>
              <MenuItem value="canada">Canada</MenuItem>
              <MenuItem value="uk">UK</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Conditional Field: Specify Other Country */}
        {selectedCountry === "other" && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Please specify your country"
              {...register("otherCountry", {
                required: "Please specify your country",
              })}
              error={!!errors.otherCountry}
              helperText={errors.otherCountry?.message}
            />
          </Grid>
        )}

        {/* Address Fields */}
        <Grid item xs={12}>
          <h3>Address</h3>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="City"
            {...register("address.city", { required: "City is required" })}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="State"
            {...register("address.state", { required: "State is required" })}
            error={!!errors.address?.state}
            helperText={errors.address?.state?.message}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Zip"
            {...register("address.zip", {
              required: "Zip is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Zip must be 6 digits",
              },
            })}
            error={!!errors.address?.zip}
            helperText={errors.address?.zip?.message}
          />
        </Grid>

        {/* Dynamic Skills Field Array */}
        <Grid item xs={12}>
          <h3>Skills</h3>
        </Grid>
        {fields.map((field, index) => (
          <Grid
            container
            spacing={1}
            key={field.id}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Grid item xs={10}>
              <TextField
                fullWidth
                label={`Skill ${index + 1}`}
                {...register(`skills.${index}.name` as const, {
                  required: "Skill is required",
                })}
                error={!!errors.skills?.[index]?.name}
                helperText={errors.skills?.[index]?.name?.message}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => append({ name: "" })}>
            Add Skill
          </Button>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedRegistrationForm;
