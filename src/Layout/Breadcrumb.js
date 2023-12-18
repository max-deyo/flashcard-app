import React from "react";
import { Link } from "react-router-dom";

export const BreadCrumb = ({ data }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {
                    data.map((item) => {
                        return (
                            <li class="breadcrumb-item active" aria-current="page">
                                {item}
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    )
}