import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';

interface NotificationMethod {
  id: string;
  title: string;
}
type ChildProps = {
  onNotificationChange: (value: string) => void;
  methods: NotificationMethod[];
}

export default function BuscaTipoRegistro({onNotificationChange, methods}: ChildProps) {
   
  const { control, watch } = useForm()

  function handleNotificationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onNotificationChange(value);
  }

  return (

    <div className="mt-10 text-left">
      <label className="text-base font-semibold text-gray-900">Tipo de Serviço</label>
      <fieldset className="mt-5">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-1">
          {methods.map((notificationMethod) => (
            <div key={notificationMethod.id} className="flex items-center">
              <Controller
                control={control}
                name="notification-method"
                render={({ field }) => (
                  <input
                    {...field}
                    id={notificationMethod.id}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value={notificationMethod.id}
                    onChange={(e) => {
                      field.onChange(e);
                      handleNotificationChange(e);
                    }}
                  />
                )}
              />
              <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {notificationMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
