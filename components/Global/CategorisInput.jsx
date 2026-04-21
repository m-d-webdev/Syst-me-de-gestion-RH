"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/api/axios";

const CategorySelect = ({ onChange, value }) => {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(value ?? "");
    useEffect(() => { setSelected(value) }, [value])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get("/getAllCategories");
                setCategories(res.data || []);
            } catch (err) {
                console.error("Error loading categories", err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="w-full bg-background max-w-sm">
            <Select value={selected} onValueChange={v => { setSelected(v); onChange(v) }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CategorySelect;