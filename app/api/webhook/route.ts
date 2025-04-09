import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'



export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }
  const userData = payload.data 
  // creating user
 
  if (evt.type === 'user.created') {
      await prisma.user.create({
        data: {
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email_addresses[0].email_address,
          clerkId: userData.id,
        },
      })

      return new Response('User created', { status: 200 })
  }

  if (evt.type === 'user.updated') {
    await prisma.user.update({
      where: {
        clerkId: userData.id,
      },
      data: {
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email_addresses[0].email_address,
      },
    })

    return new Response('User updated', { status: 200 })
  }

  if (evt.type === 'user.deleted') {
    await prisma.user.delete({
      where: {
        clerkId: userData.id,
      },
    })

    return new Response('User deleted', { status: 200 })
  }

  return new Response('Webhook received', { status: 200 })
}