import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BTFormActions } from "../store/BTForm/slice";
import validator from "validator";
const ProductFrom = () => {
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState();
    const { svEdit, listSV } = useSelector((state) => state.BTForm);
    const [formError, setFormError] = useState();
    const validation = (v) => {
        const { validity, title, name, value } = v;
        const { valueMissing, patternMismatch } = validity;
        let mess = "";
        if (valueMissing) {
            mess = `Vui lòng nhập ${title}`;
        } else if (patternMismatch && name === "maSV") {
            mess = "Mã sinh viên chỉ được bao gồm số";
        } else if (name === "email") {
            if (!validator.isEmail(value)) {
                mess = "Email không đúng định dạng";
            }
        } else if (name === "name") {
            const regexName = /^[a-zA-ZÀ-ỹ\s]+$/;
            if (!regexName.test(value)) {
                mess = "Tên chỉ được chứa các ký tự tiếng Việt và khoảng trắng";
            }
        } else if (patternMismatch && name === "phoneNumber") {
            mess = "Số điện thoại không có thực";
        } else if (svEdit === undefined) {
            const index = listSV.findIndex((v) => v.maSV === value);
            if (index !== -1 && name === "maSV") {
                mess = "Mã sinh viên đã tồn tại";
            }
        }
        return mess;
    };
    const handleFormValue = () => (v) => {
        const { name, value } = v.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };
    const handleFormError = () => (v) => {
        const { name } = v.target;
        let mess = validation(v.target);
        setFormError({
            ...formError,
            [name]: mess,
        });
    };
    useEffect(() => {
        if (!svEdit) return;
        setFormValue(svEdit);
    }, [svEdit]);
    return (
        <div>
            <form
                noValidate
                onSubmit={(ev) => {
                    ev.preventDefault();
                    const valueInputs = document.querySelectorAll("input");
                    let errors = {};
                    valueInputs.forEach((v) => {
                        const { name } = v;
                        errors[name] = validation(v);
                    });
                    setFormError(errors);
                    let isFlag = false;
                    for (let key in errors) {
                        if (errors[key]) {
                            isFlag = true;
                            break;
                        }
                    }
                    if (isFlag) return;
                    if (!svEdit) {
                        dispatch(BTFormActions.addSV(formValue));
                        setFormValue({});
                    } else {
                        dispatch(BTFormActions.updateSV(formValue));
                        setFormValue({});
                    }
                }}
            >
                <h2 className="bg-dark text-white p-2 fs-2">
                    Thông Tin Sinh Viên
                </h2>
                <div className="row">
                    <div className="col-6 mt-3">
                        <p className="mb-1">Mã SV</p>
                        <input
                            name="maSV"
                            title="mã SV"
                            type="text"
                            placeholder="Nhập mã SV"
                            required
                            disabled={svEdit}
                            pattern="^[0-9]+$"
                            className="form-control"
                            value={formValue?.maSV || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.maSV && (
                            <p className="text-danger mt-2">
                                {formError?.maSV}
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <p className="mb-1">Họ Tên</p>
                        <input
                            name="name"
                            title="tên"
                            type="text"
                            required
                            placeholder="Nhập Họ Tên"
                            className="form-control"
                            value={formValue?.name || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.name && (
                            <p className="text-danger mt-2">
                                {formError?.name}
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <p className="mb-1">Số điện thoại</p>
                        <input
                            name="phoneNumber"
                            type="text"
                            required
                            title="số điện thoại"
                            placeholder="Nhập số điện thoại"
                            pattern="(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b"
                            className="form-control"
                            value={formValue?.phoneNumber || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.phoneNumber && (
                            <p className="text-danger mt-2">
                                {formError?.phoneNumber}
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <p className="mb-1">Email</p>
                        <input
                            name="email"
                            type="text"
                            required
                            title="email"
                            placeholder="Nhập Email"
                            className="form-control"
                            value={formValue?.email || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.email && (
                            <p className="text-danger mt-2">
                                {formError?.email}
                            </p>
                        )}
                    </div>
                    <div className="col-6">
                        {!svEdit ? (
                            <button className="btn btn-primary mt-3 btnCheck">
                                Thêm sinh viên
                            </button>
                        ) : (
                            <button className="btn btn-primary mt-3 btnCheck">
                                Cập nhật sinh viên
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductFrom;