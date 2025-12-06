'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AddDoctor, addDoctorSchema } from '@/app/validations/add-doctor';
import { createDoctor, updateDoctor } from '@/lib/actions/doctors';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { toast } from 'sonner';
import { Loader2Icon, Pencil } from 'lucide-react';

export function AddUpdateDoctor({ defaultValues }: { defaultValues?: AddDoctor & { id: string } }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<AddDoctor>({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  // Reset form when dialog opens or defaultValues change
  useEffect(() => {
    if (open && defaultValues) {
      form.reset({
        name: defaultValues.name,
        email: defaultValues.email,
        phone: defaultValues.phone,
        speciality: defaultValues.speciality,
        gender: defaultValues.gender,
        status: defaultValues.status,
      });
    } else if (open && !defaultValues) {
      form.reset({
        name: '',
        email: '',
        phone: '',
        speciality: '',
        gender: undefined,
        status: undefined,
      });
    }
  }, [open, defaultValues, form]);

  const { mutateAsync: createDoctorMutation, isPending: isCreateDoctorPending } = useMutation({
    mutationFn: createDoctor,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Doctor added successfully'),
  });
  const { mutateAsync: updateDoctorMutation, isPending: isUpdateDoctorPending } = useMutation({
    mutationFn: updateDoctor,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Doctor updated successfully'),
  });

  const onSubmit = async (data: AddDoctor) => {
    try {
      if (defaultValues) {
        await updateDoctorMutation({ ...data, id: defaultValues.id });
      } else {
        await createDoctorMutation(data);
      }
      form.reset();
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: doctorQueryOptions.queryKey });
    } catch (error) {
      console.error('Error creating doctor:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create doctor');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {defaultValues ? (
          <Button size={'sm'} variant={'outline'} className="flex items-center gap-2">
            <Pencil className="w-2 h-2" />
            <span>Edit</span>
          </Button>
        ) : (
          <Button>+ Add Doctor</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? 'Update Doctor' : 'Add Doctor'}</DialogTitle>
          <DialogDescription>
            {defaultValues ? 'Update an existing doctor' : 'Add a new doctor to the system.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter doctor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter speciality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-start">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting} className="relative">
                <Loader2Icon
                  className={
                    form.formState.isSubmitting || isUpdateDoctorPending || isCreateDoctorPending
                      ? 'size-4 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                      : 'invisible size-4 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  }
                />
                <span className={form.formState.isSubmitting ? 'invisible' : ''}>Save changes</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
