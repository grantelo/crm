import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import {
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from "react-number-format";
import FormHelperText from "@material-ui/core/FormHelperText";

const costs = [
    <MenuItem value={"Транспорт"}>Транспорт</MenuItem>,
    <MenuItem value={"Налоги и штрафы"}>Налоги и штрафы</MenuItem>,
    <MenuItem value={"Красота, здоровье и обучение"}>Лекарства</MenuItem>,
    <MenuItem value={"Отпуск"}>Отпуск</MenuItem>,
    <MenuItem value={"Дом и связь"}>Дом и связь</MenuItem>,
    <MenuItem value={"Хоз. нужды"}>Хоз. нужды</MenuItem>,
    <MenuItem value={"Досуг и подарки"}>Досуг</MenuItem>,
    <MenuItem value={"Одежда и обувь"}>Одежда</MenuItem>,
    <MenuItem value={"Выплаты по кредитам"}>Выплаты по кредитам</MenuItem>,
    <MenuItem value={"Досуг"}>Досуг</MenuItem>,
    <MenuItem value={"Техника"}>Техника</MenuItem>,
    <MenuItem value={"Бизнес"}>Бизнес</MenuItem>,
    <MenuItem value={"Аренда"}>Аренда</MenuItem>,
]

const incomes = [
    <MenuItem value={"Бизнес"}>Бизнес</MenuItem>,
    <MenuItem value={"Зарплата"}>Зарплата</MenuItem>,
    <MenuItem value={"Рента"}>Рента</MenuItem>,
    <MenuItem value={"Проценты"}>Проценты</MenuItem>,
    <MenuItem value={"Дивиденты"}>Дивиденты</MenuItem>,
]

const useStyle = makeStyles(theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
    },
    box: {
        margin: `${theme.spacing(2)}px 0`,
        display: "flex",
    },
    select: {
        marginBottom: theme.spacing(2)
    },
    formControl: {
        minWidth: "120px"
    },
    button: {
        marginTop: theme.spacing(3)
    }
}))

function NumberFormatCustom(props) {
    const {onChange, ...other} = props

    return (
        <NumberFormat
            {...other}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
        />
    );
}


const AddEventForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props

    console.log(values)

    const classes = useStyle()

    return (
        <Box>
            <form className={classes.form}>
                <FormControl error={touched.category && errors.category}>
                    <InputLabel
                        id="category"
                        error={touched.category && !!errors.category}
                    >
                        Категория
                    </InputLabel>
                    <Select
                        className={classes.select}
                        name={"category"}
                        labelId="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        {
                            values.type === "income" ?
                                incomes.map(item => item)
                                :
                                costs.map(item => item)
                        }
                    </Select>
                    <FormHelperText>{touched.category && errors.category}</FormHelperText>
                </FormControl>
                <FormControl
                    component="fieldset"
                    error={touched.type && !!errors.type}
                >
                    <FormLabel component="legend">Тип</FormLabel>
                    <RadioGroup
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <FormControlLabel
                            value="income"
                            control={<Radio/>}
                            label="Доход"
                        />
                        <FormControlLabel
                            value="consumption"
                            control={<Radio/>}
                            label="Расход"
                        />
                    </RadioGroup>
                    <FormHelperText>{errors.type}</FormHelperText>
                </FormControl>
                <Box className={classes.box}>
                    <TextField
                        name={"sum"}
                        label={"Сумма"}
                        variant="outlined"
                        style={{marginRight: "8px"}}
                        onChange={handleChange}
                        InputProps={{inputComponent: NumberFormatCustom}}
                        onBlur={handleBlur}
                        error={touched.sum && !!errors.sum}
                        value={values.sum}
                        helperText={touched.sum && errors.sum}
                    />
                    <FormControl
                        variant={"outlined"}
                        error={touched.currency && !!errors.currency}
                        className={classes.formControl}
                    >
                        <InputLabel id={"currency"}>Валюта</InputLabel>
                        <Select
                            name={"currency"}
                            label={"currency"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.currency}
                        >
                            <MenuItem value={"EUR"}>Евро</MenuItem>
                            <MenuItem value={"USD"}>Доллар</MenuItem>
                            <MenuItem value={"RUB"}>Рубль</MenuItem>
                        </Select>
                        <FormHelperText>{touched.currency && errors.currency}</FormHelperText>
                    </FormControl>
                </Box>
                <TextField
                    name={"description"}
                    label={"Описание"}
                    multiline
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                />
                <Button
                    size={"large"}
                    onClick={handleSubmit}
                    endIcon={<AddIcon fontSize={"large"}/>}
                    className={classes.button}
                    type={"submit"}
                    color={"primary"}
                    variant="contained"
                    disabled={isSubmitting}
                >
                    Создать
                </Button>
            </form>
        </Box>
    );
};

export default AddEventForm;