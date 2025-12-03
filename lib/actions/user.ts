'use server';

import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return;

    const existingUser = await prisma.patient.findUnique({
      where: { clerkId: user.id },
    });
    if (existingUser) return existingUser;
    else {
      return await prisma.patient.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
        },
      });
    }
  } catch (error) {
    console.error('Error syncing user:', error);
  }
}
