import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Client Name is required').max(100),
  logo: yup.string().url('Enter a valid URL').nullable(),
  description: yup.string().max(500),
});

export default validationSchema;
