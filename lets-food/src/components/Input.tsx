import { forwardRef } from 'react'
import { TextField } from '@mui/material'

interface InputType {
  name: string;
  placeholder: string
}

const Input = forwardRef((props: InputType, ref: any) => {
  return (
    <div>
      <TextField
          id="outlined-required"
          inputRef={ref}
          type='text'
          fullWidth
          {...props}
        />
    </div>
  )
})

export default Input
