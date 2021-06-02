export const ADD_SUCCESS = {
    type: "success",
    message: "Успешное добавление"
}

export const ADD_ERROR = {
    type: "error",
    message: "Ошибка при добавлении"
}

export const EDIT_SUCCESS = {
    type: "success",
    message: "Успешное изменение"
}

export const EDIT_ERROR = {
    type: "error",
    message: "Ошибка при изменении"
}

export const REMOVE_SUCCESS = {
    type: "success",
    message: "Успешное удаление"
}

export const REMOVE_ERROR = {
    type: "error",
    message: "Ошибка при удалении"
}

export const DIALOG_CLEAR_DEALS = dealTitle => ({
    title: `Вы действительно хотите удалить все ${dealTitle} сделки`,
    message: "Подтверждая удаление, вы не сможете отменить это действие!"
})

export const DIALOG_CLEAR_CONTACTS = () => ({
    title: `Вы действительно хотите удалить все контакты?`,
    message: "Подтверждая удаление, вы не сможете отменить это действие!"
})
