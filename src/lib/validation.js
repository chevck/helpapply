const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/

const ACCEPTED_MIME_TYPES = ['application/pdf']
const ACCEPTED_EXTENSIONS = ['.pdf']
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export function validateName(value) {
  const trimmed = value.trim()
  if (trimmed.length === 0) return 'Enter your full name.'
  if (trimmed.length < 2) return 'Name looks too short.'
  return ''
}

export function validatePhone(value) {
  const trimmed = value.trim()
  if (trimmed.length === 0) return 'Enter your phone number.'
  if (!PHONE_PATTERN.test(trimmed)) return 'Enter a valid phone number.'
  return ''
}

export function validateFile(file) {
  if (!file) return 'Choose a file to continue.'

  const name = file.name.toLowerCase()
  const hasAcceptedExtension = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
  const hasAcceptedType = ACCEPTED_MIME_TYPES.includes(file.type)
  if (!hasAcceptedExtension && !hasAcceptedType) {
    return 'Please upload a PDF file.'
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'File is too large. Max size is 10MB.'
  }

  return ''
}
