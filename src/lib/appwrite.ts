// src/lib/appwrite.ts
import { Client, Databases } from 'appwrite'

const endpoint = (import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1').replace(/\/+$/, '')
const projectId   = (import.meta.env.VITE_APPWRITE_PROJECT_ID || '').trim()
const databaseId  = (import.meta.env.VITE_APPWRITE_DATABASE_ID || '').trim()
const collectionId = (import.meta.env.VITE_APPWRITE_COLLECTION_ID || '').trim()

const client = new Client().setEndpoint(endpoint).setProject(projectId)
export const databases = new Databases(client)
export const env = { dbId: databaseId, collectionId }

const missing: string[] = []
if (!projectId)   missing.push('VITE_APPWRITE_PROJECT_ID')
if (!databaseId)  missing.push('VITE_APPWRITE_DATABASE_ID')
if (!collectionId) missing.push('VITE_APPWRITE_COLLECTION_ID')
if (missing.length) console.warn('⚠️ Missing env vars:', missing.join(', '))

if (import.meta.env.DEV) {
  ;(window as any).__ENV__ = { endpoint, project: projectId, db: databaseId, col: collectionId }
  console.log('[env]', (window as any).__ENV__)
}
