// Demo mode: flip with ?demo=1 in the URL (persists via localStorage).
// Use ?demo=0 to exit. Lets the admin dashboard look like a populated
// customer account during sales demos without writing seed rows to the DB.

import { useEffect, useState } from 'react'

const KEY = 'conply-demo'

export function useDemoMode(): boolean {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.pathname.startsWith('/demo')) { setOn(true); return }
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('demo')
    if (fromUrl === '1') localStorage.setItem(KEY, '1')
    else if (fromUrl === '0') localStorage.removeItem(KEY)
    setOn(localStorage.getItem(KEY) === '1')
  }, [])

  return on
}

export function useDemoRoute(): boolean {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    setOn(window.location.pathname.startsWith('/demo'))
  }, [])
  return on
}

// Fake delivery_log rows for the Delivery tab. team_member_id is null
// (the API joins by id, so name shows up via member_name override below).
export interface DemoDeliveryLog {
  id:             string
  team_member_id: string | null
  channel:        'slack' | 'teams'
  module_id:      string
  status:         'pending' | 'sent' | 'failed'
  error_message:  string | null
  delivered_at:   string
  member_name:    string | null
  member_email:   string | null
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600 * 1000).toISOString()
}

export function demoDeliveryLogs(): DemoDeliveryLog[] {
  return [
    { id: 'demo-1',  team_member_id: null, channel: 'slack', module_id: 'aml-financial-crime',             status: 'sent',   error_message: null, delivered_at: hoursAgo(2),    member_name: 'Jasmine Lee',      member_email: 'jasmine.lee@example.com' },
    { id: 'demo-2',  team_member_id: null, channel: 'slack', module_id: 'kyc-cdd',                         status: 'sent',   error_message: null, delivered_at: hoursAgo(4),    member_name: 'Ben Hartley',      member_email: 'ben.hartley@example.com' },
    { id: 'demo-3',  team_member_id: null, channel: 'teams', module_id: 'responsible-gambling',            status: 'sent',   error_message: null, delivered_at: hoursAgo(5),    member_name: 'George Lawson',    member_email: 'george.lawson@example.com' },
    { id: 'demo-4',  team_member_id: null, channel: 'slack', module_id: 'sanctions-poca',                  status: 'failed', error_message: 'channel_not_found', delivered_at: hoursAgo(6), member_name: 'Marcus Webb',      member_email: 'marcus.webb@example.com' },
    { id: 'demo-5',  team_member_id: null, channel: 'slack', module_id: 'dlt-regulatory-principles',       status: 'sent',   error_message: null, delivered_at: hoursAgo(9),    member_name: 'Mei Zhang',        member_email: 'mei.zhang@example.com' },
    { id: 'demo-6',  team_member_id: null, channel: 'teams', module_id: 'data-protection-gdpr',            status: 'sent',   error_message: null, delivered_at: hoursAgo(11),   member_name: 'Roberto Silva',    member_email: 'roberto.silva@example.com' },
    { id: 'demo-7',  team_member_id: null, channel: 'slack', module_id: 'senior-manager-responsibilities', status: 'sent',   error_message: null, delivered_at: hoursAgo(24),   member_name: 'Sarah Chen',       member_email: 'sarah.chen@example.com' },
    { id: 'demo-8',  team_member_id: null, channel: 'slack', module_id: 'market-integrity',                status: 'sent',   error_message: null, delivered_at: hoursAgo(26),   member_name: 'Priya Singh',      member_email: 'priya.singh@example.com' },
    { id: 'demo-9',  team_member_id: null, channel: 'teams', module_id: 'aml-financial-crime',             status: 'failed', error_message: 'webhook timeout',   delivered_at: hoursAgo(30), member_name: 'Oliver Grant',     member_email: 'oliver.grant@example.com' },
    { id: 'demo-10', team_member_id: null, channel: 'slack', module_id: 'kyc-cdd',                         status: 'sent',   error_message: null, delivered_at: hoursAgo(48),   member_name: 'Lucia Fernandez',  member_email: 'lucia.fernandez@example.com' },
    { id: 'demo-11', team_member_id: null, channel: 'slack', module_id: 'responsible-gambling',            status: 'sent',   error_message: null, delivered_at: hoursAgo(50),   member_name: 'Aisha Kamara',     member_email: 'aisha.kamara@example.com' },
    { id: 'demo-12', team_member_id: null, channel: 'teams', module_id: 'sanctions-poca',                  status: 'sent',   error_message: null, delivered_at: hoursAgo(72),   member_name: 'Charlotte Mills',  member_email: 'charlotte.mills@example.com' },
    { id: 'demo-13', team_member_id: null, channel: 'slack', module_id: 'aml-financial-crime',             status: 'sent',   error_message: null, delivered_at: hoursAgo(96),   member_name: 'James Meredith',   member_email: 'james.meredith@example.com' },
    { id: 'demo-14', team_member_id: null, channel: 'slack', module_id: 'data-protection-gdpr',            status: 'sent',   error_message: null, delivered_at: hoursAgo(120),  member_name: 'Emma Thompson',    member_email: 'emma.thompson@example.com' },
    { id: 'demo-15', team_member_id: null, channel: 'teams', module_id: 'market-integrity',                status: 'sent',   error_message: null, delivered_at: hoursAgo(144),  member_name: 'Hannah Pierce',    member_email: 'hannah.pierce@example.com' },
  ]
}

export function isDemoLogId(id: string): boolean {
  return id.startsWith('demo-')
}
