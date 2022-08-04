import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { ReactElement } from 'react'

import { useDefinitions } from '../../lib/queries/getDefinitions'

export interface PostFormProps {
  personId: string
  definitionType: string
  onSubmit?: () => void
}

export function PostForm({
  personId,
  definitionType,
  onSubmit
}: PostFormProps): ReactElement {
  const { data: definitions } = useDefinitions('post')

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        display="flex"
        justifyContent="center"
        variant="overline"
        align="center"
      >
        {personId}
      </Typography>
      {definitions && (
        <Typography
          display="flex"
          justifyContent="center"
          variant="h4"
          align="center"
          gutterBottom
        >
          {definitions[definitionType].title}
        </Typography>
      )}
      <LoadingButton
        onClick={(): void => {
          if (onSubmit) onSubmit()
        }}
        fullWidth
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  )
}
