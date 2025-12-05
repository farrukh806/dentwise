'use server';

import prisma from '../prisma';

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { _count: { select: { appointments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return doctors;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
