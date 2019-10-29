import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M16 8.5c-4.1 0-7.5 3.4-7.5 7.5s3.3 7.4 7.4 7.5h.1c4.1 0 7.5-3.4 7.5-7.5S20.1 8.5 16 8.5zm0 14c-.3 0-.8-.5-1.3-1.7-.2-.5-.3-1.1-.5-1.8h3.5c-.3 2.2-1.1 3.5-1.7 3.5zM14.1 18c-.1-.6-.1-1.3-.1-2s0-1.4.1-2h3.8c.1.6.1 1.3.1 2s0 1.4-.1 2h-3.8zM16 9.5c.6 0 1.4 1.3 1.7 3.5h-3.5c.4-2.2 1.2-3.5 1.8-3.5zm2.9 4.5h3.3c.2.6.3 1.3.3 2s-.1 1.4-.3 2h-3.3c.1-.7.1-1.3.1-2s0-1.3-.1-2zm2.9-1h-3c-.2-1.3-.6-2.4-1.1-3.3 1.8.5 3.2 1.7 4.1 3.3zm-7.5-3.3c-.5.8-.8 2-1.1 3.3h-3c.9-1.6 2.3-2.8 4.1-3.3zM9.8 14H13.1c-.1.7-.1 1.3-.1 2s0 1.4.1 2H9.8c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2zm.4 5h3c.1.8.3 1.5.5 2.1.2.5.3.8.5 1.1-1.7-.4-3.1-1.6-4-3.2zm7.5 3.3c.5-.8.8-2 1.1-3.3h3c-.9 1.6-2.3 2.8-4.1 3.3z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
