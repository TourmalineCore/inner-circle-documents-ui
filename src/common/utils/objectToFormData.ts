import { serialize } from 'object-to-formdata'

export function objectToFormData(object: object): FormData {
  return serialize(
    object,
    {
      dotsForObjectNotation: true,
      indices: true,
    },
  )
} 
