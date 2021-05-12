export const ADD_SUCCESS = {
    type: "success",
    message: "Успешное добавление"
}

export const ADD_ERROR = {
    type: "error",
    message: "Ошибка при добавлении"
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