import * as Yup from 'yup';

const form = document.getElementById('ageForm')
const resultado = document.getElementById('result')

const validationSchema = Yup.object().shape(
    {
        day: Yup.number()
            .min(1, 'El dia es invalido')
            .max(31, 'El dia es invalido')
            .required('El dia es requerido')
            .transform((value, originalValue) => {
                if(originalValue === '') return null;
                return value
            }),
        month: Yup.number()
            .min(1, 'Mes invalido')
            .max(12, 'Mes invalido')
            .required('El mes es requerido')
            .transform((value, originalValue) => {
                if(originalValue === '') return null;
                return value
            }),
        year: Yup.number()
            .transform((value) => (isNaN(value)) ? undefined : parseInt(value))
            .nullable()
            .min(1900, 'El año es invalido')
            .max(new Date().getFullYear(), `El año debe ser menor o igual a ${new Date().getFullYear()}`).required('El año es requerido')
            .required('El año es requerido')
            .transform((value, originalValue) => {
                if(originalValue === '') return null;
                return value
            }),
    }
)

const furmularioValidacion = async (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    formData.set('year', parseInt(formData.get('year')))

    try {
        const values = await validationSchema.validate(Object.fromEntries(formData))
        resultado.innerHTML = 'Hola';
        console.log(values)
    } catch (error) {
        console.error(error)
    }
    
}

form.addEventListener('submit', furmularioValidacion)