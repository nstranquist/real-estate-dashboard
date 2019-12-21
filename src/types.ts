

export interface ISignUpForm { // everything here is required
  firstName: string
  lastName: string
  email: string
  companyName: string
  phone: string  // i.e. 123-456-7890
  role: 'Broker' | 'Principal' // | 'other'
  password: string  // min. 8 characters
  confPassword?: string
}

export interface SignInForm {
  email: string
  password: string
  rememberMe: boolean
}

// NOTE: changed to InvestorForm, won't be matching Brokers
export interface CreateProfileForm {
  address?: string
  address2?: string
  city?: string
  state?: string //'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | https?://www.50states.com/abbreviations.htm
  zipCode?: number
  priceMin?: number // 'priceRange?:', '0 - 2.5mil', '2.5-5', '5-10', '10-20', '20+'
  priceMax?: number
  propertyType?: 'Hospitality' | 'Industrial' | 'Land' | 'Medical' | 'Multi-Family' | 'Office' | 'Other' | 'Retail'
  tenancy?: 'Multi' | 'Single' | 'N/A'
  regions?: string[] //'Midwest', 'Northeast', 'Southeast', 'Southwest', 'West'
  leaseType?: 'Ground' | 'Net' | 'Absolute Net'
  locationType?: 'Primary MSA' | 'Tertiary MSA' | 'Urban / Dense / In-fill'
  propertyStatus?: 'Stabilized' | 'Value-Add'
  is1031?: boolean
}

// NOTE: 'ProfileForm' should combine SignUpForm and CreateProfileForm
export type ProfileForm = ISignUpForm & CreateProfileForm

export interface ProfileData {
  firstName: string
  lastName: string
  email: string
  companyName: string
  phone: string
  role: 'Broker' | 'Principal'
}

// Property Types
export interface Property {
  id: string
  address: string
  price: number
  capRate: number
  noi: number
  propertyType: 'Hospitality' | 'Industrial' | 'Land' | 'Medical' | 'Multi-Family' | 'Office' | 'Other' | 'Retail'
  yearBuilt: number
  // isFavorite?: boolean
}


// Investor Types
export interface Investor {
  id: string
  firstName: string
  lastName: string
  email: string
  companyName: string
  officePhone: string
  cellPhone: string
  address: string
  city: string
  state: string // 'AZ' | 'AK' | etc...
  zipcode: number
  role: 'Broker' | 'Principal'
  priceMin: number
  priceMax: number
  propertyType: 'Hospitality' | 'Industrial' | 'Land' | 'Medical' | 'Multi-Family' | 'Office' | 'Other' | 'Retail'  // or string[] array??
  regions: string[] // an array or...?
  leaseType: 'Ground' | 'Net' | 'Absolute Net' // types needed
  propertyStatus: 'Stabilized' | 'Value-Add'
  is1031: boolean
}

// Broker Types
export interface Broker {
  id: string
  firstName: string
  lastName: string
  email: string
  officePhone: string
  cellPhone: string
  companyName: string
  propertyType: 'Hospitality' | 'Industrial' | 'Land' | 'Medical' | 'Multi-Family' | 'Office' | 'Other' | 'Retail'
  city: string
  state: string // 'MO' ex.
  type: 'Sales' | 'Leasing' | 'Both'
}