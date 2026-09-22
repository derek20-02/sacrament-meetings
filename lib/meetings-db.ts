import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getAllMeetings( query: string = '',
  currentPage: number = 1,): Promise<SacramentMeeting[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
  SELECT
    id,
    date::text,
    meeting_type   AS "meetingType",
    presiding,
    conducting,
    announcements,
    opening_hymn   AS "openingHymn",
    opening_prayer AS "openingPrayer",
    ward_business  AS "wardBusiness",
    stake_business AS "stakeBusiness",
    sacrament_hymn AS "sacramentHymn",
    speakers,
    closing_hymn   AS "closingHymn",
    closing_prayer AS "closingPrayer"
  FROM meetings
  ORDER BY date DESC
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
`;
  return rows as unknown as SacramentMeeting[];
}


export async function getMeetings(
  query: string = '',
  currentPage: number = 1,
  
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  throw new Error('addMeeting: database implementation coming in Week 04');
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error('deleteMeeting: database implementation coming in Week 04');
}

export async function getCurrentMeetingId(): Promise<number | null> {
  const rows = await sql`
    SELECT id
    FROM meetings
    WHERE date >= CURRENT_DATE
    ORDER BY date ASC
    LIMIT 1
  `;

  if (rows.length > 0) {
    return rows[0].id as number;
  }


  const fallback = await sql`
    SELECT id
    FROM meetings
    ORDER BY date DESC
    LIMIT 1
  `;

  return fallback.length > 0 ? (fallback[0].id as number) : null;
}
/*
export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}

export function filterMeetingsByType(
  meetingType: "testimony" | "regular" | "stake" | "general",
): SacramentMeeting[] {
  return meetings.filter((meeting) => meeting.meetingType === meetingType);
}
*/


