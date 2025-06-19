"use client"

import { useQuery } from "@tanstack/react-query";
import { getServiceListQuery } from "@/entities/service/service";

export function Services() {
  const serviceListQuery = useQuery({
    ...getServiceListQuery()
  })

  if (!serviceListQuery.data) {
    return null;
  }

  return (
    <div>
      {serviceListQuery.data.serviceList.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  )
}