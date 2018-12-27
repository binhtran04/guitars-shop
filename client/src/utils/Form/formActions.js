
export const validate = (element, formdata = {}) => {
    let error = [true, ''];

    if (element.validation.email) {
        const valid = /^\S+@\S+$/.test(element.value);
        const message = !valid ? 'Must be a valid email' : '';
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = !valid ? 'Passwords do not match' : '';
        error = !valid ? [valid, message] : error;
    }
    
    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = !valid ? 'This field is required' : '';
        error = !valid ? [valid, message] : error;
    }

    return error;
}


export const update = (element, formdata, formName) => {
    const newFormdata = {...formdata};
    const newElement = {...newFormdata[element.id]}

    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;

    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formName) => {
    let dataToSubmit = {};

    Object.keys(formdata).forEach(key => {
        if (key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    });

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let isValid = true;

    Object.keys(formdata).forEach(key => {
        isValid = formdata[key].valid && isValid;
    })

    return isValid;
}
