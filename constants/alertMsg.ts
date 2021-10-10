export const DeleteItemConfirm = {
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#EB7458',
  cancelButtonColor: '#5A5F5F',
  confirmButtonText: 'Yes, delete it!'
}

export const CreateItemConfirm = {
  title: 'Create Confirmation',
  text: 'Would you like to create new consent message?',
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#5A5F5F',
  confirmButtonText: 'Confirm!'
}

export const UpdateItemConfirm = {
  title: 'Update Confirmation',
  text: 'Would you like to update this consent message?',
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#5A5F5F',
  confirmButtonText: 'Confirm!'
}

export const WarningItemConfirm = (
  text: string = '',
  confirmColor: string = '#EB7458',
  confirmBtnTxt: string = 'Yes, save it'
) => ({
  title: 'Are you sure?',
  text: text || "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: confirmColor,
  cancelButtonColor: '#5A5F5F',
  confirmButtonText: confirmBtnTxt
})

export const DeleteItemSuccess = {
  title: 'Deleted!',
  text: 'Your item has been deleted.',
  icon: 'success'
}

export const SaveItemSuccess = {
  title: 'Success',
  text: 'Your item has been saved.',
  icon: 'success'
}

export const CreateItemSuccess = {
  title: 'Success',
  text: 'Your item has been created.',
  icon: 'success'
}

export const UnexpectedError = (msg: string = 'Internal server error.') => {
  return {
    title: 'Unexpected error',
    text: msg,
    icon: 'error'
  }
}

export const FormIncompleted = (fieldName: string = 'Some') => {
  return {
    title: 'Submission Error',
    text: `${fieldName} field is incompleted!`,
    icon: 'error'
  }
}

export const NotFoundError = (
  msg: string = 'Your item was not found.',
  btnText: string = 'Confirm!'
) => {
  return {
    title: 'Not Found Error',
    text: msg,
    icon: 'error',
    confirmButtonText: btnText
  }
}
