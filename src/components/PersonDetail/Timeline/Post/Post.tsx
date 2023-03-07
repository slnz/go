import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator
} from '@mui/lab'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { formatDistance, parseISO } from 'date-fns'
import dayjs from 'dayjs'
import { isArray, isString, map } from 'lodash'
import { ReactElement } from 'react'

import { GetContactTimelinePost } from '../../../../lib/queries/getContactTimeline/getContactTimeline'

interface Props {
  timeline: GetContactTimelinePost
}

function getTitle(
  key: string,
  fields: { key: string; title: string }[]
): string {
  const title = fields.find((field) => field.key === key)?.title
  return title ?? key
}

export function PersonDetailTimelinePost({ timeline }: Props): ReactElement {
  const date = parseISO(timeline.date)

  return (
    <>
      <TimelineSeparator>
        {timeline.author != null ? (
          <TimelineDot sx={{ p: 0, border: 0 }}>
            <Avatar
              alt={timeline.author.name}
              sx={{ width: 36, height: 36 }}
              src={`https://api.fluro.io/get/avatar/user/${timeline.author._id}?w=36&h=36`}
            >
              {timeline.author.name.charAt(0)}
            </Avatar>
          </TimelineDot>
        ) : (
          <TimelineDot color="primary">
            <SignpostOutlinedIcon />
          </TimelineDot>
        )}
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h6">
          {timeline.author != null && `${timeline.author.name} posted a `}
          {timeline.fullDefinition.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {formatDistance(date, new Date(), { addSuffix: true })}
        </Typography>
        <Stack spacing={1}>
          {map(timeline.data, (value, key) => (
            <Box key={key}>
              <Typography variant="overline" display="block" fontWeight="bold">
                {getTitle(key, timeline.fullDefinition.fields)}
              </Typography>
              {isString(value) && (
                <Typography>
                  {dayjs(value, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]', true).isValid()
                    ? dayjs(value).format('dddd MMMM D, YYYY')
                    : value}
                </Typography>
              )}
              {isArray(value) &&
                value.map(
                  (item) =>
                    isString(item) && <Typography key={item}>{item}</Typography>
                )}
            </Box>
          ))}
        </Stack>
      </TimelineContent>
    </>
  )
}
