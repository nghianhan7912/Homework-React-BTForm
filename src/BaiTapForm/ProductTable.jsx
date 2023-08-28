import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BTFormActions } from "../store/BTForm/slice";

const ProductTable = () => {
    const dispatch = useDispatch();
    const [valueSearch,setValueSearch] = useState()
    const { listSV } = useSelector((state) => state.BTForm);
    const sortList = [...listSV]
    sortList.sort((a,b) => Number(a.maSV) - Number(b.maSV))
    const svSearch = listSV.filter((v) =>
        v.name.toLowerCase().includes(valueSearch?.toLowerCase())
    )
    const [render,setRender] = useState()
    return (
        <div>
            <input
                value={valueSearch || ""}
                type="text"
                className="form-control mt-3"
                placeholder="Tìm kiếm theo tên"
                onChange={(ev) => {
                    setValueSearch(ev.target.value);
                }}
                onKeyDown={(v) => {
                    v.key == "Enter" && setRender(svSearch)
                }}
            />
            <button
                className="btn btn-outline-warning mt-3"
                onClick={(ev)=>{
                    setRender(svSearch)
                }}
            >
                Tìm kiếm
            </button>
            <table className="table mt-4">
                <thead className="table-info">
                    <tr>
                        <th>Mã SV</th>
                        <th>Tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {(render ? render : sortList).map((v) => (
                        <tr className="pt-3" key={v.maSV}>
                            <td>{v.maSV}</td>
                            <td>{v.name}</td>
                            <td>{v.phoneNumber}</td>
                            <td>{v.email}</td>
                            <td>
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn btn-success me-2"
                                        style={{ width: 80 }}
                                        onClick={() => {
                                            dispatch(BTFormActions.editSV(v));
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ width: 80 }}
                                        onClick={() => {
                                            dispatch(
                                                BTFormActions.deleteSV(v.maSV)
                                            );
                                        }}
                                    >
                                        Delelte
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
