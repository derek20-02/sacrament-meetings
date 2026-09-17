import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'stake',
    presiding: 'President Anderson',
    conducting: 'Bishop Smith',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Taylor',
    wardBusiness: [
      { description: 'Release of Brother Miller as Elders Quorum President' },
      { description: 'Sustaining of Brother Clark as new Elders Quorum President' }
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'There Is a Green Hill Far Away' },
    speakers: [
      { name: 'Elder Roberts (Stake High Council)', topic: 'Ministering', type: 'speaker' },
      { name: 'Sister Harris', topic: 'The Atonement of Jesus Christ', type: 'speaker' }
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Sister Martin',
    announcements: ['Stake conference: May 17', 'Youth activity: May 15 at 6 PM']
  },
  {
    id: 3,
    date: '2026-05-24',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 30, title: 'Come, Ye Thankful People, Come' },
    openingPrayer: 'Brother Nelson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "'Tis Sweet to Sing the Matchless Love" },
    speakers: [
      { name: 'Member testimonies', topic: 'Highlights from April General Conference', type: 'speaker' }
    ],
    closingHymn: { number: 89, title: 'Let Us All Press On' },
    closingPrayer: 'Sister Garcia',
    announcements: ['Fast offerings due this week', 'Family history workshop: June 1']
  },
  {
    id: 4,
    date: '2026-06-07',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Sister Lopez (Primary President)',
    openingHymn: { number: 129, title: 'I Feel My Savior\u2019s Love' },
    openingPrayer: 'Primary child: Emma',
    wardBusiness: [{ description: 'Welcome of new ward members: the Johnson family' }],
    stakeBusiness: false,
    sacramentHymn: { number: 187, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Primary Children', topic: 'The Living Prophet Guides Us to Christ', type: 'speaker' },
      { name: 'Primary Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 226, title: 'Called to Serve' },
    closingPrayer: 'Primary child: Noah',
    announcements: ['Primary Program refreshments in the cultural hall', 'VBS sign-up open']
  },
  {
    id: 5,
    date: '2026-06-14',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 66, title: 'Rejoice, the Lord Is King!' },
    openingPrayer: 'Brother Cooper',
    wardBusiness: [{ description: 'Setting apart of new missionary: Elder Walker' }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'How Great the Wisdom and the Love' },
    speakers: [
      { name: 'Elder Walker (departing missionary)', topic: 'Missionary farewell', type: 'speaker' },
      { name: 'Brother Turner', topic: 'The Gathering of Israel', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 249, title: 'Called to Serve' },
    closingPrayer: 'Sister Bell',
    announcements: ['Missionary farewell open house at 1 PM', 'Ward campout: June 20-21']
  },
  {
    id: 6,
    date: '2026-06-28',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Sister Phillips',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 190, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'General Conference recap discussion', topic: 'Highlights from April General Conference', type: 'speaker' }
    ],
    closingHymn: { number: 227, title: 'Called to Serve' },
    closingPrayer: 'Brother Evans',
    announcements: ['General Conference viewing schedule posted in foyer']
  }
];



export function getAllMeetings(): SacramentMeeting[] {
  return meetings;
}


export function getMeetingByDate(date: string): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}



export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}


export function filterMeetingsByType(
  meetingType: "testimony" | "regular" | "stake" | "general",
): SacramentMeeting[] {
  return meetings.filter((meeting) => meeting.meetingType === meetingType);
}