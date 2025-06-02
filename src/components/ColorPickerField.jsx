import { Grid, FormControl, FormHelperText } from '@mui/material';

const ColorPickerField = ({ name, label, register, errors, disabled }) => {
  return (
    <Grid item xs={6}>
      <FormControl fullWidth error={!!errors[name]} disabled={disabled}>
        <label style={{ marginBottom: '8px', fontSize: '0.875rem' }}>{label}</label>
        <input
          type="color"
          {...register(name, { required: `${label} is required` })}
          style={{ width: '100%', height: '40px', border: '1px solid #ccc', borderRadius: '4px' }}
          disabled={disabled}
        />
        {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default ColorPickerField;