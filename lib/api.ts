const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://test.tizhilian.com'

function getToken(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('token') ?? ''
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {}),
      ...((init.headers ?? {}) as Record<string, string>),
    },
  })
  const json = await res.json()
  return json.data as T
}

export interface Dept {
  id?: number
  deptName?: string
  phone?: string
  address?: string
  longitude?: number
  latitude?: number
  imageUrl?: string
  logo?: string
  openTime?: string
  closeTime?: string
  status?: number
}

export interface CoachVO {
  id?: number
  userId?: number
  realName?: string
  phone?: string
  coachType?: number
  coachStatus?: number
  specialty?: string
  experience?: number
  rating?: number
  status?: number
}

export function addBaseUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${BASE_URL}/api/files/avatar/${url}`
}

export async function getGymDetail(id: number | string): Promise<Dept> {
  return request<Dept>(`/api/c/stadium/${id}`)
}

export async function getCoachProfile(): Promise<CoachVO> {
  return request<CoachVO>('/api/c/coach/profile')
}
