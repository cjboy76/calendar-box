export type CalendarItem = {
    created: string
    creator: { email: string, self: boolean }
    end: {
        dateTime: string,
        timeZone: string
    }
    etag: string,
    eventType: string,
    htmlLink: string
    iCalUID: string
    id: string
    kind: string
    sequence: number
    organizer: { email: string, self: boolean }
    reminders: { useDefault: true }
    start: {
        dateTime: string,
        timeZone: string
    }
    status: string
    summary: string
    updated: string
}

export type Calendar = {
    accessRole: string,
    defaultReminders: { method: string, minutes: number }[]
    description: string
    etag: string,
    kind: string,
    items: CalendarItem[]
    nextSyncToken: string
    summary: string
    timeZone: string
    updated: string
}