import React, { useContext, useEffect } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { InputControl } from "../inputs/InputControl"
import { useForm } from "react-hook-form";
import { Product } from "../../../dominio/entities/Product";
import { ButtonPrimary } from "../ui/ButtonPrimary";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProductRepositoryImpl } from "../../../data/repositories/ProductRepositoryImpl";
import { CalendarInputControl } from "../inputs/CalendarInputControl";
import moment from "moment";

interface ProductFormProps {
    onSubmit: (data: Product) => void;
    defaultValues?: Product;
    isEditing?: boolean;
}



const ProductForm = ({ defaultValues, onSubmit, isEditing = false }: ProductFormProps) => {

    const productSchema = yup.object().shape({
        id: yup.string()
        .required("El nombre es obligatorio")
        .when([], {
            is: () => !isEditing, 
            then: (schema) => schema.min(3, "El ID debe tener al menos 3 caracteres")
                .max(10, "El ID debe tener como máximo 10 caracteres")
                .test("id-exists", "El ID ya existe", async (value) => {
                    if (!value) return false;
                    const repository = new ProductRepositoryImpl();
                    return !(await repository.validId(value));
                }),
        }),
        name: yup.string()
            .required("El nombre es obligatorio")
            .min(5, "El nombre debe tener al menos 5 caracteres")
            .max(100, "El nombre debe tener como máximo 100 caracteres"),
        description: yup.string()
            .required("La descripción es obligatoria")
            .min(10, "La descripción debe tener al menos 10 caracteres")
            .max(200, "La descripción debe tener como máximo 200 caracteres"),
        logo: yup.string()
            .required("El logo es obligatorio"),
        date_release: yup.date()
            .required("La fecha de liberación es obligatoria")
            .min(moment().startOf("day").toDate(), "La fecha de liberación debe ser hoy o una fecha futura"),
        date_revision: yup.date()
            .required("La fecha de revisión es obligatoria")
            
    });

    const {theme} = useContext(ThemeContext);

    

    const { control, handleSubmit, reset, setValue, watch } = useForm<Product>({
        resolver: yupResolver(productSchema),
        mode: "onChange",
        defaultValues: defaultValues || {
            name: "",
            description: "",
            logo: "",
            date_release: undefined,
            date_revision: undefined,
        },
    });

    const dateRelease = watch("date_release");


    useEffect(() => {
        if (dateRelease) {
            const newDateRevision = moment(dateRelease).add(1, "year").toDate();
            setValue("date_revision", newDateRevision, { shouldValidate: true });
        }
    }, [dateRelease, setValue]);

    useEffect(() => {
        if(defaultValues) {
            console.log("VALUES ", defaultValues)
          reset(defaultValues)
        }
    },[defaultValues])
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <InputControl testID="input-id" name="id" control={control} label="ID"  disabled={isEditing} editable={!isEditing}/>
                        <InputControl testID="input-name" name="name" control={control} label="Nombre" />
                        <InputControl testID="input-description" name="description" control={control} label="Descripción" />
                        <InputControl testID="input-logo"  name="logo" control={control} label="Logo" />
                        <CalendarInputControl
                            testID="input-date_release"
                            control={control}
                            name="date_release"
                            label="Fecha Liberación"
                            icon="calendar"
                            mode="date"
                        />
                        <InputControl
                            testID="input-date_revision"
                            control={control}
                            name="date_revision"
                            label="Fecha Revisión"
                            editable={false} 
                            value={dateRelease ? moment(dateRelease).add(1, "year").format("DD/MM/YYYY") : ""}
                            disabled={true}
                        />

                        <ButtonPrimary title="Enviar" onPress={handleSubmit(onSubmit)} stylesBtn={styles.btnSend} />
                        <ButtonPrimary title="Reiniciar" onPress={() => reset()} stylesBtn={{ backgroundColor: theme.colors.gris }} />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 10,
    },
    container: {
        marginHorizontal: 30
    },
    btnSend: {
        marginTop: 20,
        marginBottom: 15
    } 
})

export default ProductForm