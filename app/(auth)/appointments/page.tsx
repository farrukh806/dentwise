'use client';
import ConfirmationStep from '@/components/appointments/confirmation-step';
import DateSelectionStep from '@/components/appointments/date-selection';
import DoctorSelectionStep from '@/components/appointments/doctor-selection';
import Step from '@/components/appointments/step';
import React, { useState } from 'react';

const STEPS = ['Select Dentist', 'Choose Time', 'Confirm'];

const AppointmentsPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);
  const [bookingData, setBookingData] = useState<
    { type: any; date: Date; time: string } | undefined
  >(undefined);

  const handleStepChange = (step: number, doctorId?: string) => {
    if (doctorId) setSelectedDoctorId(doctorId);
    setActiveStep(step);
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Book an Appointment</h1>
      <p className="mt-2 text-muted-foreground">
        Find and book with verified dentists in your area
      </p>
      {/* Steps */}
      <div className="mt-5">
        <div className="flex items-center flex-wrap gap-4">
          {STEPS.map((step, index) => (
            <React.Fragment key={step}>
              <Step stepName={step} stepNumber={index + 1} isActive={activeStep === index + 1} />
              {index + 1 !== STEPS.length && <span> &gt; </span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Dentists */}
      {activeStep === 1 && <DoctorSelectionStep onContinue={handleStepChange} />}
      {/* Date Selection */}
      {activeStep === 2 && (
        <DateSelectionStep
          doctorId={selectedDoctorId!}
          initialData={bookingData}
          onBack={() => setActiveStep(1)}
          onContinue={(step, data) => {
            setBookingData(data);
            setActiveStep(step);
          }}
        />
      )}
      {/* Confirmation */}
      {activeStep === 3 && bookingData && (
        <ConfirmationStep
          doctorId={selectedDoctorId!}
          date={bookingData.date}
          time={bookingData.time}
          type={bookingData.type}
          onBack={() => setActiveStep(2)}
        />
      )}
    </section>
  );
};

export default AppointmentsPage;
