import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, FormGroup, Label, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from 'react-hook-form';
import '../../../assets/font-awesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserService from '../services/UserService'
import CategoryService from '../../../modules/categories/services/CategoryService'
import Swal from 'sweetalert2';

export function FormUser(props) {
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();
    const { toggle, user, refreshList } = props;
    const [title, setTitle] = useState(null);
    const [categories, setCategories] = useState(null);

    // Función para saber si viene a crear o editar el cliente
    useEffect(() => {
        const getTitle = () => {
            if (user) {
                setTitle('Editar Usuario');
                try {
                    setValue("name", user.name)
                    setValue("email", user.email)
                    setValue("phone", user.phone)
                    setValue("status", user.status)
                } catch (error) {
                    console.log(error);
                }
            } else {
                setTitle('Crear Usuario');
            }
        };

        getTitle();
    }, []);

    // Función para enviar a guardar
    const onSubmit = async (data) => {
        try {
            // Crear o editar
            if (user) {
                updateUser(data);
            } else {
                addUser(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Crear cliente
    const addUser = async (data) => {
        const result = await UserService.addUser(data);
        try {
            if (result.data?.userId) {
                setError("dni", "match", "La cédula del usuario ya existe.");
                return false;
            } else {
                if (result.status === 200) {
                    Swal.fire({
                        title: "Usuario creado con éxito",
                        text: result.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                } else {
                    Swal.fire({
                        title: "Transacción errónea",
                        text: result.data,
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                }
                toggle();
            }
        } catch (error) {
            console.log(error);
        } finally {
            refreshList();
        }
    }

    // Actualizar cliente
    const updateUser = async (data) => {
        try {
            const result = await UserService.editUser(user.id, data);
            if (result.status === 200) {
                Swal.fire({
                    title: "Usuario editado con éxito",
                    text: result.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
            } else {
                Swal.fire({
                    title: "Transacción errónea",
                    text: result.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Transacción errónea",
                text: "Ocurrió un error, por favor intente de nuevo",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } finally {
            refreshList();
            toggle();
        }
    }

    return (
        <Fragment>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <form name="form-list" id="form-list">
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Nombre <span className="input-obligatorio">*</span></Label>
                                <input className="form-control"
                                    type="text"
                                    autoFocus
                                    maxLength="100"
                                    name="name"
                                    {...register("name", { 
                                        required: true,
                                        minLength: 5,
                                        maxLength: 100,
                                        pattern: /^[a-zA-ZñÑ\s]*$/i 

                                    })}
                                />
                                <div className="text-error">
                                    {errors.name?.type === "required" && "El nombre es requerido"}
                                    {errors.name?.type === "minLength" && "Este campo debe contener mínimo 5 caracteres"}
                                    {errors.name?.type === "maxLength" && "Este campo debe contener máximo 100 caracteres"}
                                    {errors.name?.type === "pattern" && "Este campo no debe contener números ni caracteres especiales" }

                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Email</Label>
                                <input className="form-control"
                                    type="email"
                                    maxLength="150"
                                    name="email"
                                    { ...register("email", { 
                                        required: true,
                                        pattern: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i
                                    })}
                                />
                                <div className="text-error">
                                    {errors.email?.type === "required" && "El email es requerido"}
                                    {errors.email?.type === "maxLength" && "Este campo debe contener máximo 150 caracteres"}
                                    {errors.email?.type === "pattern" && "Este campo debe ser un correo valido" }
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Teléfono <span className="input-obligatorio">*</span></Label>
                                <input className="form-control"
                                    type="number"
                                    maxLength="10"
                                    name="phone"
                                    { ...register("phone", { 
                                        required: true,
                                        maxLength: 10,
                                        pattern: /^[0-9]+$/
                                    })}
                                />
                                <div className="text-error">
                                    {errors.phone?.type === "required" && "El teléfono es requerido"}
                                    {errors.phone?.type === "maxLength" && "Este campo debe contener máximo 10 caracteres"}
                                    {errors.phone?.type === "pattern" && "Este campo debe ser un teléfono valido" }
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>estado <span className="input-obligatorio">*</span></Label>
                                <select className="form-control"
                                    name="status"
                                    {...register("status", {
                                        required: true,
                                    })}
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                                <div className="text-error">
                                    {errors.category_id?.type === "required" && "La categoría es requerida"}
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>

                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    <FontAwesomeIcon icon="save" /> Guardar
                </Button>
                <Button color="secondary" onClick={toggle}>
                    <FontAwesomeIcon icon="eraser" /> Cancel
                </Button>
            </ModalFooter>
        </Fragment>
    )
}