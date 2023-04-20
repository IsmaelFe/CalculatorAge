import * as Yup from 'yup';

const form = document.getElementById('ageForm')
const classInput = 'errorInput'
const classLabel = 'errorLabel'

const validationSchema = Yup.object().shape(
    {
        day: Yup.number()
            .min(1, 'Mus be a valid date')
            .max(31, 'Mus be a valid date')
            .required('This field is required')
            .transform((value, originalValue) => {
                if(originalValue === '') return null;
                return value
            }),
        month: Yup.number()
            .min(1, 'Mus be a valid month')
            .max(12, 'Mus be a valid month')
            .required('This field is required')
            .transform((value, originalValue) => {
                if(originalValue === '') return null;
                return value
            }),
        year: Yup.number()
            .transform((value) => (isNaN(value)) ? undefined : parseInt(value))
            .nullable()
            .min(1900, 'Must be in the past')
            .max(new Date().getFullYear(), `The year must be less than or equal to ${new Date().getFullYear()}`).required('El año es requerido')
            .required('This field is required')
            .transform((value, originalValue) => {
                if(originalValue === '') return null;
                return value
            }),
    }
)

document.getElementById('day-error').textContent = ''
document.getElementById('month-error').textContent = ''
document.getElementById('year-error').textContent = ''

const functionYear = (year, month, day) => {

    let newYear = new Date()
    let currentYear = new Date(year, month, day)

    const diference = newYear - currentYear
    const ageYears = Math.floor(diference / (1000 * 60 * 60 * 24 * 365))
    const ageMonths  = Math.round((diference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)) + 1
    const ageDays = Math.round((diference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)) + 1
    
    document.getElementById('yearSpan').textContent = ageYears
    document.getElementById('monthSpan').textContent = ageMonths
    document.getElementById('daySpan').textContent = ageDays
}

const furmularioValidacion = async (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    formData.set('year', parseInt(formData.get('year')))

    try {
        const values = await validationSchema.validate(Object.fromEntries(formData))
        functionYear(values.year, values.month, values.day)
        
        document.getElementById('day-error').textContent = ''
        document.getElementById('month-error').textContent = ''
        document.getElementById('year-error').textContent = ''

        document.getElementById('input-year').className = ''
        document.getElementById('input-day').className = ''
        document.getElementById('input-month').className = ''
        
        document.getElementById('label-day').className = ''
        document.getElementById('label-month').className = ''
        document.getElementById('label-year').className = ''
        console.log(values)
    } catch (error) {
        document.getElementById('input-year').className = classInput
        document.getElementById('input-day').className = classInput
        document.getElementById('input-month').className = classInput

        document.getElementById('label-day').className = classLabel
        document.getElementById('label-month').className = classLabel
        document.getElementById('label-year').className = classLabel

        document.getElementById(error.path + '-error').textContent = error.message
    }
    
}

form.addEventListener('submit', furmularioValidacion)